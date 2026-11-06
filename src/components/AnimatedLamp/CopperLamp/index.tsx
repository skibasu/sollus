"use client";

import clsx from "clsx";
import { content } from "@/lib/content";
import Image from "next/image";
import { useId, useState } from "react";
import { useLampMotion } from "@/hooks/useLampMotion";

type Props = {
  /** Rendered size in pixels. A missing dimension preserves the original aspect ratio. */
  width?: number;
  height?: number;
  className?: string;
  defaultOn?: boolean;
};

export default function CopperLamp({
  className = "",
  defaultOn = false,
  width,
  height,
}: Props) {
  const renderedWidth =
    width ?? (height === undefined ? 423 : (height * 423) / 393);
  const renderedHeight = height ?? (renderedWidth * 393) / 423;
  const [on, setOn] = useState(defaultOn);
  const id = useId();
  const { buttonRef, visualRef } = useLampMotion(true, 423);
  const gradientId = `${id}-light`;
  const glowId = `${id}-glow`;

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={
        on ? content.lampControls.copper.off : content.lampControls.copper.on
      }
      aria-pressed={on}
      onClick={() => setOn((value) => !value)}
      style={{ width: renderedWidth }}
      className={clsx(
        "relative isolate block max-w-full cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-amber-300",
        className,
      )}
    >
      <span
        ref={visualRef}
        style={{ aspectRatio: `${renderedWidth} / ${renderedHeight}` }}
        className="pointer-events-none relative block origin-[50%_18%] motion-safe:will-change-transform"
      >
        <Image
          src="/images/lamps/lampa3.png"
          alt={content.hero.lamps.copper}
          fill
          sizes={`(max-width: ${renderedWidth}px) 100vw, ${renderedWidth}px`}
          draggable={false}
          loading="eager"
          className={clsx(
            "lamp-image z-10 transition-[filter] duration-400 motion-reduce:transition-none",
            on ? "brightness-105" : "brightness-[.78]",
          )}
        />
        <svg
          viewBox="0 0 423 393"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 z-20 h-full w-full overflow-visible"
        >
          <defs>
            <radialGradient id={gradientId}>
              <stop
                offset="0"
                stopColor="#fffef1"
              />
              <stop
                offset=".7"
                stopColor="#fff1c3"
              />
              <stop
                offset="1"
                stopColor="#eec27d"
              />
            </radialGradient>
            <filter
              id={glowId}
              x="-100%"
              y="-150%"
              width="300%"
              height="400%"
            >
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>
          <g
            className={clsx(
              "lamp-light transition-opacity duration-400 motion-reduce:transition-none",
              on ? "opacity-100" : "opacity-0",
            )}
          >
            <ellipse
              cx={251}
              cy={261}
              rx={119}
              ry={51}
              transform="rotate(-31 251 261)"
              fill="#ffc56d"
              filter={`url(#${glowId})`}
              opacity=".8"
            />
            <ellipse
              cx={251}
              cy={261}
              rx={119}
              ry={51}
              transform="rotate(-31 251 261)"
              fill={`url(#${gradientId})`}
            />
          </g>
        </svg>
      </span>
    </button>
  );
}
