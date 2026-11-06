import { Suspense } from "react";
import Image from "next/image";
import { HeroSlider } from "./HeroSlider";
import { ButtonLink } from "@/components/ui/Button";
import { TrustBadge } from "./TrustBadge";
import { content } from "@/lib/content";
export function Hero() {
  return (
    <section
      className="hero"
      aria-labelledby="hero-heading"
    >
      <Suspense
        fallback={
          <Image
            src="/images/design/hero.webp"
            fill
            preload
            alt=""
            sizes="100vw"
            className="hero-background"
          />
        }
      >
        <HeroSlider />
      </Suspense>
      <div className="page-container hero-content">
        <div className="hero-copy">
          <p className="text-lead">{content.hero.eyebrow}</p>
          <h1 id="hero-heading">
            {content.hero.title.map((line) => (
              <span
                className="block"
                key={line}
              >
                {line}
              </span>
            ))}
          </h1>
          <ButtonLink
            href="#"
            label={content.hero.button}
          />
        </div>
      </div>
      <TrustBadge />
    </section>
  );
}
