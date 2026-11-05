import Image from "next/image";
import { content } from "@/lib/content";
const lamps = [
  {
    id: "gold",
    image: "gold-lamp",
    width: 372,
    height: 419,
  },
  {
    id: "wall",
    image: "wall-lamp",
    width: 470,
    height: 428,
  },
  {
    id: "copper",
    image: "copper-lamp",
    width: 423,
    height: 393,
  },
] as const;
export function StaticLamps() {
  return (
    <div className="hero-lamps">
      {lamps.map((lamp) => (
        <Image
          key={lamp.id}
          src={`/images/design/${lamp.image}.webp`}
          alt={content.hero.lamps[lamp.id]}
          width={lamp.width}
          height={lamp.height}
          sizes="(min-width: 1920px) 30rem, (min-width: 768px) 25rem, 16rem"
          className={`hero-lamp hero-lamp--${lamp.id}`}
          preload
        />
      ))}
    </div>
  );
}
