import { expect, test, type Locator, type Page } from "@playwright/test";

async function openHero(page: Page) {
  const start = new Date("2026-01-01T00:00:00Z");
  await page.clock.install({ time: start });
  await page.clock.pauseAt(new Date(start.getTime() + 1000));
  await page.goto("/");

  const slider = page.locator(".hero-slider");
  const active = slider.locator(".swiper-slide-active");
  const bars = page.locator(".hero-progress-track > span");
  const next = page.getByRole("button", {
    name: "Następny slajd",
    exact: true,
  });
  const previous = page.getByRole("button", {
    name: "Poprzedni slajd",
    exact: true,
  });

  // Let hydration and image loading callbacks run before the CSS intro.
  await expect
    .poll(async () => {
      await page.clock.runFor(16);
      return slider.getAttribute("data-intro");
    })
    .not.toBe("loading");
  await expect(slider).toHaveAttribute("data-intro", "ready");
  await expect(next).toBeVisible();
  await expect(active).toHaveAttribute("data-swiper-slide-index", "0");
  return { slider, active, bars, next, previous };
}

function fill(bar: Locator) {
  return bar.evaluate(
    (element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).a,
  );
}

function slideIndex(slide: Locator) {
  return slide.getAttribute("data-swiper-slide-index");
}

async function expectFreshDwell(
  page: Page,
  active: Locator,
  bars: Locator,
  index: number,
) {
  await expect.poll(() => fill(bars.nth(index))).toBe(0);
  await page.clock.runFor(2999);
  expect(await slideIndex(active)).toBe(String(index));
  expect(await fill(bars.nth(index))).toBeGreaterThan(0.98);
  await page.clock.runFor(1);
  expect(await slideIndex(active)).toBe(String(1 - index));
  expect(await fill(bars.nth(index))).toBe(1);
}

test("autoplay fills the yellow bar linearly and continues while hovered", async ({
  page,
}) => {
  const { slider, active, bars, next } = await openHero(page);
  const bar = bars.first();
  await expect(bar).toHaveCSS("background-color", "rgb(242, 191, 37)");
  expect(await fill(bar)).toBe(0);
  // The visible control overlays the slider and receives real pointer input.
  await next.hover();
  // The image layer sits behind the controls. Exercise its pointer listener too.
  await slider.dispatchEvent("pointerenter", {
    pointerType: "mouse",
    bubbles: false,
  });

  for (const fraction of [0.25, 0.5, 0.75]) {
    await page.clock.runFor(750);
    expect(await slideIndex(active)).toBe("0");
    // Swiper samples progress once per animation frame.
    expect(Math.abs((await fill(bar)) - fraction)).toBeLessThan(16 / 3000);
  }
  await page.clock.runFor(749);
  expect(await slideIndex(active)).toBe("0");
  await page.clock.runFor(1);
  expect(await slideIndex(active)).toBe("1");
  expect(await fill(bar)).toBe(1);
  await expect.poll(() => fill(bar)).toBe(0);
  await expectFreshDwell(page, active, bars, 1);
});

const slideTransitions = [
  { from: 0, to: 1, fadeOutMs: 600, fadeInMs: 600, zoomInMs: 800 },
  { from: 1, to: 0, fadeOutMs: 600, fadeInMs: 600, zoomInMs: 800 },
] as const;

for (const { from, to, fadeOutMs, fadeInMs, zoomInMs } of slideTransitions) {
  test(`slide ${from + 1} to ${to + 1}: both slides fade and only the incoming slide zooms`, async ({
    page,
  }) => {
    const { active, bars } = await openHero(page);
    await page.clock.runFor(3000);
    if (from === 1) {
      await expect.poll(() => fill(bars.first())).toBe(0);
      await page.clock.runFor(3000);
    }
    expect(await slideIndex(active)).toBe(String(to));

    const motion = await active.evaluate(async (slide, outgoingIndex) => {
      const outgoing = slide
        .closest(".hero-slider")!
        .querySelector(`[data-swiper-slide-index="${outgoingIndex}"]`)!;
      const outgoingImage = outgoing.querySelector(".hero-slide-image")!;
      const opacityTransition = (element: Element) =>
        element
          .getAnimations()
          .find(
            (animation) =>
              animation instanceof CSSTransition &&
              animation.transitionProperty === "opacity",
          );
      const outgoingFade = opacityTransition(outgoing);
      const image = slide.querySelector(".hero-slide-image")!;
      const slideStyle = getComputedStyle(slide);
      const imageStyle = getComputedStyle(image);
      const fade = opacityTransition(slide);
      const scale = image
        .getAnimations()
        .find(
          (animation) =>
            animation instanceof CSSAnimation &&
            animation.animationName === "hero-image-enter",
        );
      await Promise.all([fade?.ready, outgoingFade?.ready, scale?.ready]);
      const keyframes = (
        scale?.effect as KeyframeEffect | undefined
      )?.getKeyframes();
      return {
        fadeInMs: fade?.effect?.getComputedTiming().activeDuration,
        fadeOutMs: outgoingFade?.effect?.getComputedTiming().activeDuration,
        zoomInMs: scale?.effect?.getComputedTiming().activeDuration,
        outgoingZoom: outgoingImage
          .getAnimations()
          .some((animation) =>
            (animation.effect as KeyframeEffect | null)
              ?.getKeyframes()
              .some((frame) => "transform" in frame || "scale" in frame),
          ),
        outgoingFadeEasing: getComputedStyle(outgoing).transitionTimingFunction,
        fadeEasing: slideStyle.transitionTimingFunction,
        scaleEasing: imageStyle.animationTimingFunction,
        scales: keyframes?.map(({ transform }) =>
          Number(new DOMMatrixReadOnly(String(transform)).a.toFixed(4)),
        ),
        startGap:
          fade && scale
            ? Math.abs(Number(fade.startTime) - Number(scale.startTime))
            : null,
      };
    }, from);
    expect(motion).toMatchObject({
      fadeInMs,
      fadeOutMs,
      zoomInMs,
      outgoingZoom: false,
      outgoingFadeEasing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fadeEasing: "cubic-bezier(0.4, 0, 0.2, 1)",
      scaleEasing: "cubic-bezier(0, 0, 0.2, 1)",
      scales: [1.05, 1],
    });
    expect(motion.startGap).not.toBeNull();
    expect(motion.startGap!).toBeLessThan(35);
    expect(await fill(bars.nth(from))).toBe(1);
    await expect
      .poll(
        () =>
          active.evaluate((slide, outgoingIndex) => {
            const bar = document.querySelectorAll(
              ".hero-progress-track > span",
            )[outgoingIndex];
            const image = slide.querySelector(".hero-slide-image")!;
            return {
              fill: new DOMMatrixReadOnly(getComputedStyle(bar).transform).a,
              scaling: image
                .getAnimations()
                .some((animation) => animation.playState === "running"),
            };
          }, from),
        { intervals: [20] },
      )
      .toEqual({ fill: 0, scaling: true });
    await expectFreshDwell(page, active, bars, to);
  });
}

test("manual arrows navigate and wrap, then restart a full dwell", async ({
  page,
}) => {
  const { active, bars, next, previous } = await openHero(page);
  await page.clock.runFor(1200);
  for (const [button, from, to] of [
    [next, 0, 1],
    [next, 1, 0],
    [previous, 0, 1],
    [previous, 1, 0],
  ] as const) {
    await button.click();
    expect(await slideIndex(active)).toBe(String(to));
    expect(await fill(bars.nth(from))).toBe(1);
    await expect.poll(() => fill(bars.nth(from))).toBe(0);
  }
  await expectFreshDwell(page, active, bars, 0);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("disables autoplay and keeps both arrows working", async ({ page }) => {
    const { active, bars, next, previous } = await openHero(page);
    await page.clock.runFor(10_000);
    expect(await slideIndex(active)).toBe("0");
    expect(await fill(bars.first())).toBe(0);
    await next.click();
    await expect(active).toHaveAttribute("data-swiper-slide-index", "1");
    await page.clock.runFor(10_000);
    expect(await slideIndex(active)).toBe("1");
    await previous.click();
    await expect(active).toHaveAttribute("data-swiper-slide-index", "0");
  });
});
