"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import { ATLAS_URL, FRAGMENT_SHADER, VERTEX_SHADER } from "./config";

type GoldenAmbientWavesProps = {
  /** 1 = the reference playback speed. */
  speed?: number;
  intensity?: number;
  className?: string;
};

export default function GoldenAmbientWaves({
  speed = 1,
  intensity = 1,
  className = "",
}: GoldenAmbientWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settings = useRef({ speed, intensity });

  useEffect(() => {
    settings.current = {
      speed: Number.isFinite(speed) ? Math.max(0, speed) : 1,
      intensity: Number.isFinite(intensity) ? Math.max(0, intensity) : 1,
    };
  }, [speed, intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      console.warn("GoldenAmbientWaves: WebGL2 is unavailable.");
      return;
    }

    const shaders: WebGLShader[] = [];
    const atlasImage = new Image();
    let texture: WebGLTexture | null = null;
    let program: WebGLProgram | null = null;
    let vao: WebGLVertexArrayObject | null = null;
    let observer: ResizeObserver | undefined;
    let updateMotion = () => {};
    let frame = 0;
    let time = 0;
    let lastTime: number | undefined;

    const context: WebGL2RenderingContext = gl;
    const target: HTMLCanvasElement = canvas;

    function compile(type: number, source: string) {
      const shader = context.createShader(type);
      if (!shader) throw new Error("Cannot create WebGL shader.");
      shaders.push(shader);
      context.shaderSource(shader, source);
      context.compileShader(shader);
      if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        throw new Error(
          context.getShaderInfoLog(shader) || "Shader compilation failed.",
        );
      }
      return shader;
    }

    function cleanup() {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      reducedMotion.removeEventListener("change", updateMotion);
      atlasImage.onload = null;
      atlasImage.onerror = null;
      if (texture) context.deleteTexture(texture);
      if (vao) context.deleteVertexArray(vao);
      if (program) context.deleteProgram(program);
      shaders.forEach((shader) => context.deleteShader(shader));
    }

    function initialize() {
      try {
        program = context.createProgram();
        if (!program) throw new Error("Cannot create WebGL program.");
        context.attachShader(
          program,
          compile(context.VERTEX_SHADER, VERTEX_SHADER),
        );
        context.attachShader(
          program,
          compile(context.FRAGMENT_SHADER, FRAGMENT_SHADER),
        );
        context.linkProgram(program);
        if (!context.getProgramParameter(program, context.LINK_STATUS)) {
          throw new Error(
            context.getProgramInfoLog(program) || "Shader linking failed.",
          );
        }
        vao = context.createVertexArray();
        context.bindVertexArray(vao);
        context.useProgram(program);
        texture = context.createTexture();
        if (!texture) throw new Error("Cannot create frame atlas texture.");
        context.bindTexture(context.TEXTURE_2D, texture);
        context.texParameteri(
          context.TEXTURE_2D,
          context.TEXTURE_MIN_FILTER,
          context.LINEAR,
        );
        context.texParameteri(
          context.TEXTURE_2D,
          context.TEXTURE_MAG_FILTER,
          context.LINEAR,
        );
        context.texImage2D(
          context.TEXTURE_2D,
          0,
          context.RGBA,
          context.RGBA,
          context.UNSIGNED_BYTE,
          atlasImage,
        );
        context.uniform1i(context.getUniformLocation(program, "u_atlas"), 0);
        const uTime = context.getUniformLocation(program, "u_time");
        const uResolution = context.getUniformLocation(program, "u_resolution");
        const uIntensity = context.getUniformLocation(program, "u_intensity");

        function resize() {
          const bounds = target.getBoundingClientRect();
          const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
          const width = Math.max(1, Math.round(bounds.width * dpr));
          const height = Math.max(1, Math.round(bounds.height * dpr));
          if (target.width !== width || target.height !== height) {
            target.width = width;
            target.height = height;
          }
          context.viewport(0, 0, width, height);
          if (reducedMotion.matches) draw();
        }
        observer = new ResizeObserver(resize);
        observer.observe(target);
        resize();

        function draw() {
          context.uniform1f(uTime, time);
          context.uniform1f(uIntensity, settings.current.intensity);
          context.uniform2f(uResolution, target.width, target.height);
          context.drawArrays(context.TRIANGLES, 0, 3);
        }

        function render(now: number) {
          // Avoid a large jump after returning from an inactive browser tab.
          const delta =
            lastTime === undefined ? 0 : Math.min((now - lastTime) / 1000, 0.1);
          lastTime = now;
          time += delta * settings.current.speed;
          draw();
          frame = requestAnimationFrame(render);
        }
        updateMotion = () => {
          cancelAnimationFrame(frame);
          lastTime = undefined;
          if (reducedMotion.matches) draw();
          else frame = requestAnimationFrame(render);
        };
        reducedMotion.addEventListener("change", updateMotion);
        updateMotion();
      } catch (error) {
        console.error("GoldenAmbientWaves:", error);
        cleanup();
        return;
      }
    }
    atlasImage.onload = initialize;
    atlasImage.onerror = () =>
      console.error("GoldenAmbientWaves: Frame atlas could not load.");
    atlasImage.src = ATLAS_URL;
    return cleanup;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={clsx(
        "pointer-events-none absolute inset-0 block h-full w-full bg-black",
        className,
      )}
    />
  );
}
