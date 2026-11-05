"use client";

import { useEffect, useRef } from "react";

/** Animates the visual only; the button keeps a stable pointer hit area. */
export function useLampMotion(enabled: boolean, referenceWidth: number) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const visualRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const visual = visualRef.current;
    if (!enabled || !button || !visual) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, previous = 0, started = 0;
    let hovering = false, targetX = 0, targetY = 0, x = 0, y = 0, z = 0;

    function animate(now: number) {
      if (!visual || !button) return;
      const dt = Math.min((now - (previous || now)) / 1000, 0.05);
      previous = now;
      const blend = 1 - Math.exp(-7 * Math.max(dt, 0.016));
      x += ((hovering ? targetX : 0) - x) * blend;
      y += ((hovering ? targetY : 0) - y) * blend;
      z += ((hovering ? Math.sin((now - started) / 1000 * 2.1) * 1.35 : 0) - z) * blend;
      // Keep the same perspective strength when the lamp is resized.
      const perspective = 950 * button.clientWidth / referenceWidth;
      visual.style.transform = `perspective(${perspective}px) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
      if (hovering || Math.abs(x) + Math.abs(y) + Math.abs(z) > 0.015) {
        frame = requestAnimationFrame(animate);
      } else {
        visual.style.transform = "";
        frame = previous = 0;
      }
    }
    function start() {
      if (!frame && !reduced.matches) frame = requestAnimationFrame(animate);
    }
    function enter(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      hovering = true;
      started = performance.now();
      start();
    }
    function move(event: PointerEvent) {
      if (event.pointerType === "touch" || !button) return;
      const bounds = button.getBoundingClientRect();
      targetX = -Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1)) * 3;
      targetY = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1)) * 5;
      start();
    }
    function leave() { hovering = false; targetX = targetY = 0; start(); }
    function preferenceChanged() {
      cancelAnimationFrame(frame);
      frame = previous = x = y = z = 0;
      if (visual) visual.style.transform = "";
      if (!reduced.matches && hovering) start();
    }
    button.addEventListener("pointerenter", enter);
    button.addEventListener("pointermove", move);
    button.addEventListener("pointerleave", leave);
    button.addEventListener("pointercancel", leave);
    window.addEventListener("blur", leave);
    reduced.addEventListener("change", preferenceChanged);
    return () => {
      cancelAnimationFrame(frame);
      visual.style.transform = "";
      button.removeEventListener("pointerenter", enter);
      button.removeEventListener("pointermove", move);
      button.removeEventListener("pointerleave", leave);
      button.removeEventListener("pointercancel", leave);
      window.removeEventListener("blur", leave);
      reduced.removeEventListener("change", preferenceChanged);
    };
  }, [enabled, referenceWidth]);

  return { buttonRef, visualRef };
}
