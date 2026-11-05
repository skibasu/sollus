"use client";

import { useEffect, useRef } from "react";

type GoldenAmbientWavesProps = {
  /** 1 = the original animation speed. */
  speed?: number;
  intensity?: number;
  className?: string;
};

const VERTEX_SHADER = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
out vec4 fragColor;

// Golden Ambient Waves — reference study, background only.
// These constants can be promoted to application uniforms.
const float SPEED = 0.44;
uniform float u_intensity;
#define INTENSITY u_intensity
const vec3 BACKGROUND = vec3(0.063);
const vec3 GOLD = vec3(0.96, 0.74, 0.095);
float hash(vec2 p) {
    p=fract(p*vec2(123.34,456.21));
    p+=dot(p,p+45.32);
    return fract(p.x*p.y);
}
float noise(vec2 p) {
    vec2 i=floor(p), f=fract(p);
    f=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
               mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);
}
float ribbon(vec2 p,float center,float width,float height,float t,float phase) {
    float bend=0.028*sin(p.y*6.0-t*1.1+phase)
              +0.035*(noise(vec2(p.y*3.0-t*0.42+phase,t*0.18))-0.5);
    float axis=center-0.40*p.y+bend;
    float d=(p.x-axis)/width;
    float body=exp(-d*d*1.8);
    float fade=exp(-pow(max(p.y,0.0)/height,1.65)*2.6);
    return body*fade;
}
void main() {
    vec2 uv=gl_FragCoord.xy/u_resolution;
    // Preserve the wide reference composition on smaller screens.
    float aspect=u_resolution.x/u_resolution.y;
    vec2 p=vec2((uv.x-0.5)*max(aspect/2.83,0.65)+0.5,uv.y);
    float t=u_time*SPEED;
    float drift=0.17*sin(t*0.47)+0.035*sin(t*1.13);
    p.x+=drift;
    p.y+=0.035*sin(p.x*4.0-t*0.9);
    float a=ribbon(p,0.66,0.145+0.02*sin(t*0.7),0.61,t,0.0);
    float b=ribbon(p,0.99,0.105,0.79+0.07*sin(t*0.5),t,2.3);
    float c=ribbon(p,0.28,0.070,0.23,t,4.2)*0.55;
    float d=ribbon(p,1.31,0.14,0.67,t,6.1)*0.8;
    float softBase=0.13*exp(-uv.y*13.0)*(0.6+0.4*sin(p.x*11.0+t));
    // Soft modulation advects upward, while the upper region stays dark.
    float riseNoise=noise(vec2(p.x*4.5,uv.y*4.0-t*0.55));
    float risingVeil=0.88+0.24*riseNoise;
    float light=(a+b+c+d)*1.12*risingVeil+softBase;
    // A diffuse rounded swell occasionally emerges from the lower right.
    // Both endpoints are invisible, so wrapping introduces no visible jump.
    float cycle=floor((u_time+2.0)/10.5);
    float phase=fract((u_time+2.0)/10.5);
    float envelope=pow(sin(3.14159265*phase),2.0);
    vec2 center=vec2(0.98-0.12*phase+0.015*sin(cycle*2.4),
                     -0.16+0.60*phase);
    vec2 radius=vec2(0.21+0.025*phase,0.17+0.075*phase);
    vec2 q=(vec2(p.x-drift,uv.y)-center)/radius;
    q.x+=0.12*q.y*q.y;
    float roundedSwell=exp(-dot(q,q)*1.6)*envelope;
    light+=0.30*roundedSwell;
    // A broad amber veil joins the bands without filling the dark channels.
    float haze=0.065*exp(-pow((p.x-0.78)/0.45,2.0))
                       *exp(-pow((uv.y-0.25)/0.3,2.0));
    light=(light+haze)*INTENSITY;
    light*=1.0-smoothstep(0.55,0.91,uv.y);
    light=clamp(light,0.0,1.0);
    vec3 color=mix(BACKGROUND,GOLD,pow(light,0.92));
    fragColor=vec4(color,1.0);
}`;

/** speed=1 matches the latest ShaderTools animation. */
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
      if (vao) context.deleteVertexArray(vao);
      if (program) context.deleteProgram(program);
      shaders.forEach((shader) => context.deleteShader(shader));
    }

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
      observer.observe(canvas);
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
    return cleanup;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 block h-full w-full bg-black ${className}`}
    />
  );
}
