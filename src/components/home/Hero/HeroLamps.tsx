import { useEffect, useRef } from "react";

import CopperLamp from "@/components/AnimatedLamp/CopperLamp";
import GoldLamp from "@/components/AnimatedLamp/GoldLamp";
import WallLamp from "@/components/AnimatedLamp/WallLamp";

type Props = {
  intro: "loading" | "image" | "lamps" | "ready";
  onIntroEnd: () => void;
};

export function HeroLamps({ intro, onIntroEnd }: Props) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (intro !== "ready") return;
    const lamps =
      layerRef.current?.querySelectorAll<HTMLButtonElement>(
        ".hero-lamp-control",
      );
    if (!lamps?.length) return;

    let frame = 0;
    function updateLight() {
      frame = 0;
      const viewport = document.documentElement;
      lamps?.forEach((lamp) => {
        const bounds = lamp.getBoundingClientRect();
        const width = Math.max(
          0,
          Math.min(bounds.right, viewport.clientWidth) -
            Math.max(bounds.left, 0),
        );
        const height = Math.max(
          0,
          Math.min(bounds.bottom, viewport.clientHeight) -
            Math.max(bounds.top, 0),
        );
        const area = bounds.width * bounds.height;
        const visibleRatio = area ? (width * height) / area : 0;
        const offAt = 0.3;
        const lightLevel = Math.max(0, (visibleRatio - offAt) / (1 - offAt));
        lamp.style.setProperty("--lamp-visibility", String(lightLevel));
      });
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(updateLight);
    }

    updateLight();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      lamps.forEach((lamp) => lamp.style.removeProperty("--lamp-visibility"));
    };
  }, [intro]);

  return (
    <div
      ref={layerRef}
      className="hero-lamps"
      data-intro={intro}
      inert={intro !== "ready"}
    >
      <div className="hero-lamp hero-lamp--gold">
        <GoldLamp
          className="hero-lamp-control"
          defaultOn
        />
      </div>
      <div
        className="hero-lamp hero-lamp--wall"
        onAnimationEnd={(event) => {
          if (intro === "lamps" && event.animationName === "hero-lamp-light")
            onIntroEnd();
        }}
      >
        <WallLamp
          className="hero-lamp-control"
          defaultOn
        />
      </div>
      <div className="hero-lamp hero-lamp--copper">
        <CopperLamp
          className="hero-lamp-control"
          defaultOn
        />
      </div>
    </div>
  );
}
