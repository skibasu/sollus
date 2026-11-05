"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { useLampMotion } from "@/hooks/useLampMotion";

type Props = {
  className?: string;
  defaultOn?: boolean;
};

export default function GoldLamp({ className = "", defaultOn = false }: Props) {
  const [on, setOn] = useState(defaultOn);
  const id = useId();
  const { buttonRef, visualRef } = useLampMotion(true);
  const gradientId = `${id}-light`;
  const glowId = `${id}-glow`;

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={on ? "Wyłącz: Złota lampa" : "Włącz: Złota lampa"}
      aria-pressed={on}
      onClick={() => setOn((value) => !value)}
      className={`relative isolate block w-full max-w-[372px] cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-amber-300 ${className}`}
    >
      <span ref={visualRef} className="pointer-events-none relative block origin-[50%_18%] motion-safe:will-change-transform">
        <Image
          src="/images/lamps/lampa1.png"
          alt="Złota lampa"
          width={372}
          height={419}
          sizes="(max-width: 540px) 90vw, 372px"
          draggable={false}
          className={`relative z-10 h-auto w-full transition-[filter] duration-400 motion-reduce:transition-none ${on ? "brightness-105" : "brightness-[.78]"}`}
        />
        <svg viewBox="0 0 372 419" aria-hidden="true" className="absolute inset-0 z-20 h-full w-full overflow-visible">
          <defs>
            <radialGradient id={gradientId}>
              <stop offset="0" stopColor="#fffef1" />
              <stop offset=".7" stopColor="#fff1c3" />
              <stop offset="1" stopColor="#eec27d" />
            </radialGradient>
            <filter id={glowId} x="-100%" y="-150%" width="300%" height="400%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>
          <g className={`transition-opacity duration-400 motion-reduce:transition-none ${on ? "opacity-100" : "opacity-0"}`}>
            <ellipse cx={214} cy={274} rx={117} ry={66} transform="rotate(-43 214 274)" fill="#ffc56d" filter={`url(#${glowId})`} opacity=".8" />
            <ellipse cx={214} cy={274} rx={117} ry={66} transform="rotate(-43 214 274)" fill={`url(#${gradientId})`} />
          </g>
        </svg>
      </span>
    </button>
  );
}
