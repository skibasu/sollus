"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";

import { HeroLamps } from "./HeroLamps";

import { HeroSliderControls, type IntroPhase } from "./HeroSliderControls";

export function HeroSlider() {
  const [phase, setPhase] = useState<IntroPhase>("loading");
  const ready = phase === "ready";
  const startImage = () =>
    setPhase((current) => (current === "loading" ? "image" : current));
  const instance = useRef<SwiperInstance | null>(null);
  const transitioning = useRef(false);
  const activeSlide = useRef(0);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const slider = instance.current;
      if (!slider) return;
      slider.allowTouchMove = ready;
      slider.params.speed = preference.matches
        ? 0
        : slider.originalParams.speed;
      if (!ready || preference.matches) slider.autoplay.stop();
      else slider.autoplay.start();
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, [ready]);
  return (
    <>
      <Swiper
        className="hero-slider"
        data-intro={phase}
        allowTouchMove={false}
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
          slider.autoplay.stop();
          instance.current = slider;
        }}
        onAutoplayTimeLeft={(slider, _time, remaining) => {
          if (!ready || transitioning.current) return;
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
              onLoad={index === 0 ? startImage : undefined}
              onError={index === 0 ? startImage : undefined}
              onAnimationEnd={(event) => {
                if (
                  phase === "image" &&
                  event.animationName === "hero-image-enter"
                ) {
                  setPhase("lamps");
                }
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <HeroLamps
        intro={phase}
        onIntroEnd={() => setPhase("ready")}
      />
      <HeroSliderControls
        phase={phase}
        onPrevious={() => {
          if (!instance.current?.animating) instance.current?.slidePrev();
        }}
        onNext={() => {
          if (!instance.current?.animating) instance.current?.slideNext();
        }}
        onProgressBarRef={(index, element) => {
          bars.current[index] = element;
        }}
      />
    </>
  );
}
