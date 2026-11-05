"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { content } from "@/lib/content";

export function HeroSlider() {
  const instance = useRef<SwiperInstance | null>(null);
  const transitioning = useRef(false);
  const activeSlide = useRef(0);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const slider = instance.current;
      if (!slider) return;
      slider.params.speed = preference.matches ? 0 : 600;
      if (preference.matches) slider.autoplay.stop();
      else slider.autoplay.start();
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  return (
    <>
      <Swiper
        className="hero-slider"
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={600}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          waitForTransition: true,
        }}
        onSwiper={(slider) => {
          instance.current = slider;
        }}
        onAutoplayTimeLeft={(slider, _time, remaining) => {
          if (transitioning.current) return;
          bars.current.forEach((bar, index) => {
            if (bar)
              bar.style.transform = `scaleX(${index === slider.realIndex ? 1 - remaining : 0})`;
          });
        }}
        onSlideChangeTransitionStart={() => {
          transitioning.current = true;
          bars.current.forEach((bar, index) => {
            if (bar)
              bar.style.transform = `scaleX(${index === activeSlide.current ? 1 : 0})`;
          });
        }}
        onSlideChangeTransitionEnd={(slider) => {
          activeSlide.current = slider.realIndex;
          transitioning.current = false;
          bars.current.forEach((bar) => {
            if (bar) bar.style.transform = "scaleX(0)";
          });
        }}
      >
        {["hero", "hero-second"].map((name, index) => (
          <SwiperSlide key={name}>
            <Image
              src={`/images/design/${name}.webp`}
              fill
              preload={index === 0}
              alt=""
              sizes="100vw"
              className="hero-slide-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="hero-slider-controls"
        aria-label={content.hero.slider.label}
      >
        <button
          type="button"
          className="hero-arrow hero-arrow--previous"
          aria-label={content.hero.slider.previous}
          onClick={() => {
            if (!instance.current?.animating) instance.current?.slidePrev();
          }}
        >
          ←
        </button>
        <button
          type="button"
          className="hero-arrow hero-arrow--next"
          aria-label={content.hero.slider.next}
          onClick={() => {
            if (!instance.current?.animating) instance.current?.slideNext();
          }}
        >
          →
        </button>
        <div
          className="hero-progress"
          aria-hidden="true"
        >
          {[0, 1].map((index) => (
            <span
              className="hero-progress-track"
              key={index}
            >
              <span
                ref={(element) => {
                  bars.current[index] = element;
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
