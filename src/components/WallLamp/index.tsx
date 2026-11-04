"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { useLampMotion } from "@/hooks/useLampMotion";

type Props = {
  className?: string;
  defaultOn?: boolean;
};

export default function WallLamp({ className = "", defaultOn = false }: Props) {
  const [on, setOn] = useState(defaultOn);
  const id = useId();
  const { buttonRef, visualRef } = useLampMotion(false);
  const gradientId = `${id}-light`;
  const glowId = `${id}-glow`;

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={on ? "Wyłącz: Lampa ścienna" : "Włącz: Lampa ścienna"}
      aria-pressed={on}
      onClick={() => setOn((value) => !value)}
      className={`relative isolate block w-full max-w-[470px] cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-amber-300 ${className}`}
    >
      <span ref={visualRef} className="pointer-events-none relative block origin-[50%_18%] motion-safe:will-change-transform">
        <Image
          src="/images/lamps/lampa2.png"
          alt="Lampa ścienna"
          width={470}
          height={428}
          sizes="(max-width: 540px) 90vw, 470px"
          draggable={false}
          className={`relative z-10 h-auto w-full transition-[filter] duration-400 motion-reduce:transition-none ${on ? "brightness-105" : "brightness-[.78]"}`}
        />
        <svg viewBox="0 0 470 428" aria-hidden="true" className="absolute inset-0 z-20 h-full w-full overflow-visible">
          <defs>
            <radialGradient id={gradientId}>
              <stop offset="0" stopColor="#f1fcff" />
              <stop offset=".7" stopColor="#c4eeff" />
              <stop offset="1" stopColor="#72c8f5" />
            </radialGradient>
            <filter id={glowId} x="-100%" y="-150%" width="300%" height="400%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>
          <g className={`transition-opacity duration-400 motion-reduce:transition-none ${on ? "opacity-100" : "opacity-0"}`}>
            <ellipse cx={95} cy={346} rx={69} ry={36} transform="rotate(39 95 346)" fill="#7bd8ff" filter={`url(#${glowId})`} opacity=".8" />
            <ellipse cx={95} cy={346} rx={69} ry={36} transform="rotate(39 95 346)" fill={`url(#${gradientId})`} />
          </g>
        </svg>
      </span>
    </button>
  );
}
