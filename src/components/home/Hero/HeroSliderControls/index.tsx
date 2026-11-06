import { content } from "@/lib/content";

export type IntroPhase = "loading" | "image" | "lamps" | "ready";

type HeroSliderControlsProps = {
  phase: IntroPhase;
  onPrevious: () => void;
  onNext: () => void;
  onProgressBarRef: (index: number, element: HTMLSpanElement | null) => void;
};

export function HeroSliderControls({
  phase,
  onPrevious,
  onNext,
  onProgressBarRef,
}: HeroSliderControlsProps) {
  return (
    <div
      hidden={phase === "loading" || phase === "image"}
      inert={phase !== "ready"}
      data-intro={phase}
      className="hero-slider-controls"
      aria-label={content.hero.slider.label}
    >
      <button
        type="button"
        className="hero-arrow hero-arrow--previous"
        aria-label={content.hero.slider.previous}
        onClick={onPrevious}
      >
        ←
      </button>
      <button
        type="button"
        className="hero-arrow hero-arrow--next"
        aria-label={content.hero.slider.next}
        onClick={onNext}
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
                onProgressBarRef(index, element);
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
