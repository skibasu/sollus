import CopperLamp from "@/components/AnimatedLamp/CopperLamp";
import GoldLamp from "@/components/AnimatedLamp/GoldLamp";
import WallLamp from "@/components/AnimatedLamp/WallLamp";

type Props = {
  intro: "loading" | "image" | "lamps" | "ready";
  onIntroEnd: () => void;
};

export function HeroLamps({ intro, onIntroEnd }: Props) {
  return (
    <div
      className="hero-lamps"
      data-intro={intro}
      inert={intro !== "ready"}
    >
      <div className="hero-lamp hero-lamp--gold">
        <GoldLamp
          className="hero-lamp-control"
          defaultOn
        />
      </div>
      <div
        className="hero-lamp hero-lamp--wall"
        onAnimationEnd={(event) => {
          if (intro === "lamps" && event.animationName === "hero-lamp-light")
            onIntroEnd();
        }}
      >
        <WallLamp
          className="hero-lamp-control"
          defaultOn
        />
      </div>
      <div className="hero-lamp hero-lamp--copper">
        <CopperLamp
          className="hero-lamp-control"
          defaultOn
        />
      </div>
    </div>
  );
}
