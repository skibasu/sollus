"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HeaderSurface({ children }: { children: ReactNode }) {
  const headerRef = useRef<HTMLElement>(null);
  const topMarkerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const marker = topMarkerRef.current;
    if (!header || !marker) return;

    header.toggleAttribute("data-scrolled", window.scrollY > 0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        header.toggleAttribute("data-scrolled", entry.intersectionRatio < 1);
      },
      { threshold: 1 },
    );

    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <span
        ref={topMarkerRef}
        className="header-top-marker"
        aria-hidden="true"
      />
      <header
        ref={headerRef}
        className="site-header"
      >
        {children}
      </header>
    </>
  );
}
