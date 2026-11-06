import { expect, test, type Page } from "@playwright/test";

function shaderSection(page: Page) {
  return page.getByRole("region").filter({ has: page.locator("canvas") });
}

test("keeps the shader section usable when WebGL2 is unavailable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof getContext>
    ) {
      if (String(args[0]) === "webgl2") return null;
      return getContext.apply(this, args);
    } as typeof getContext;
  });

  const warning = page.waitForEvent("console", {
    predicate: (message) =>
      message.type() === "warning" &&
      message.text().includes("GoldenAmbientWaves: WebGL2 is unavailable."),
  });
  await page.goto("/");
  await warning;

  const section = shaderSection(page);
  await expect(section.locator("canvas")).toHaveCSS(
    "background-color",
    "rgb(0, 0, 0)",
  );
  await expect(section.getByRole("heading")).toBeVisible();
  await expect(section.getByRole("link")).toBeVisible();
});

test("draws a static frame with reduced motion and animates when it is disabled", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    const gl = WebGL2RenderingContext.prototype;
    const getUniformLocation = gl.getUniformLocation;
    const uniform1f = gl.uniform1f;
    const timeLocations = new WeakSet<WebGLUniformLocation>();

    gl.getUniformLocation = function (program, name) {
      const location = getUniformLocation.call(this, program, name);
      if (location && name === "u_time") timeLocations.add(location);
      return location;
    };

    gl.uniform1f = function (location, value) {
      uniform1f.call(this, location, value);
      if (
        location &&
        timeLocations.has(location) &&
        this.canvas instanceof HTMLCanvasElement
      ) {
        this.canvas.dataset.shaderTime = String(value);
      }
    };
  });
  await page.goto("/");

  const canvas = shaderSection(page).locator("canvas");
  await expect(canvas).toHaveAttribute("data-shader-time", "0");
  const readTime = async () =>
    Number(await canvas.getAttribute("data-shader-time"));

  await canvas.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
  expect(await readTime()).toBe(0);

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect.poll(readTime).toBeGreaterThan(0);
});
