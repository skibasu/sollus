import { expect, test, type Locator } from "@playwright/test";

const durationMs = 250;
const easing = "cubic-bezier(0.4, 0, 0.2, 1)";

async function expectHeaderColors(header: Locator, opaque: boolean) {
  const ink = opaque ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)";
  await expect(header).toHaveCSS(
    "background-color",
    opaque ? "rgb(255, 255, 255)" : "rgba(0, 0, 0, 0)",
  );
  await expect(
    header.getByRole("navigation").getByRole("link").first(),
  ).toHaveCSS("color", ink);
  await expect(
    header.locator(".logo [fill]:not([fill='none'])").first(),
  ).toHaveCSS("fill", ink);
  await expect(
    header.locator(".hamburger [stroke]:not([stroke='none'])").first(),
  ).toHaveCSS("stroke", ink);
}

async function expectHeaderTransition(header: Locator, opaque: boolean) {
  const transitions = await header.evaluate(async (element) => {
    const style = getComputedStyle(element);
    const animations = element
      .getAnimations()
      .filter(
        (animation): animation is CSSTransition =>
          animation instanceof CSSTransition &&
          ["background-color", "color"].includes(animation.transitionProperty),
      );
    await Promise.all(animations.map((animation) => animation.ready));
    const color = animations.find(
      (animation) => animation.transitionProperty === "color",
    );
    if (color) {
      const midpoint =
        Number(color.effect?.getComputedTiming().activeDuration) / 2;
      while (
        color.playState === "running" &&
        Number(color.currentTime) < midpoint
      ) {
        await new Promise(requestAnimationFrame);
      }
    }
    return {
      ink: style.color,
      foreground: [
        getComputedStyle(element.querySelector(".header-navigation a")!).color,
        getComputedStyle(
          element.querySelector(".logo [fill]:not([fill='none'])")!,
        ).fill,
        getComputedStyle(
          element.querySelector(".hamburger [stroke]:not([stroke='none'])")!,
        ).stroke,
      ],
      easing: style.transitionTimingFunction,
      timings: animations.map((animation) => ({
        property: animation.transitionProperty,
        duration: animation.effect?.getComputedTiming().activeDuration,
        startTime: animation.startTime,
      })),
    };
  });

  expect(transitions.easing).toBe(easing);
  expect(transitions.timings).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        property: "background-color",
        duration: durationMs,
      }),
      expect.objectContaining({ property: "color", duration: durationMs }),
    ]),
  );
  const [background, ink] = transitions.timings;
  expect(background.startTime).toEqual(expect.any(Number));
  expect(ink.startTime).toBe(background.startTime);
  expect(transitions.ink).not.toBe("rgb(0, 0, 0)");
  expect(transitions.ink).not.toBe("rgb(255, 255, 255)");
  expect(transitions.foreground).toEqual(Array(3).fill(transitions.ink));
  await expectHeaderColors(header, opaque);
}

test("hero header transitions together on pointer entry and exit", async ({
  page,
}) => {
  await page.goto("/");
  const header = page.getByRole("banner");
  await expectHeaderColors(header, false);
  await header.hover();
  await expectHeaderTransition(header, true);
  await page.mouse.move(10, 300);
  await expectHeaderTransition(header, false);
});

test("hero header uses the same transition when scrolling down and back to the top", async ({
  page,
}) => {
  await page.goto("/");
  const header = page.getByRole("banner");
  await page.mouse.move(10, 300);
  await expectHeaderColors(header, false);
  await page.evaluate(() => window.scrollTo({ top: 100, behavior: "instant" }));
  await expect(header).toHaveAttribute("data-scrolled", "");
  await expectHeaderTransition(header, true);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(header).not.toHaveAttribute("data-scrolled");
  await expectHeaderTransition(header, false);
});
