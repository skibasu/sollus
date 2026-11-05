import CopperLamp from "@/components/AnimatedLamp/CopperLamp";
import GoldLamp from "@/components/AnimatedLamp/GoldLamp";
import WallLamp from "@/components/AnimatedLamp/WallLamp";

export function HeroLamps() {
  return (
    <div className="hero-lamps">
      <div className="hero-lamp hero-lamp--gold">
        <GoldLamp
          className="hero-lamp-control"
          defaultOn
        />
      </div>
      <div className="hero-lamp hero-lamp--wall">
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
