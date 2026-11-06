import Image from "next/image";
import type { ReactNode } from "react";
import { ButtonLabel, buttonClasses } from "../Button";
import clsx from "clsx";
export type TileCardProps = {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  className?: string;
  artwork?: ReactNode;
};
export function TileCard({
  image,
  alt,
  title,
  subtitle,
  buttonLabel,
  className,
  artwork,
}: TileCardProps) {
  return (
    <a
      href="#"
      className={clsx("tile-card group", className)}
    >
      <div className="tile-artwork">
        <Image
          src={image}
          alt={alt}
          width={1100}
          height={1100}
          sizes="(min-width: 1920px) 60rem, (min-width: 768px) 60vw, 100vw"
          className="tile-image"
        />
        {artwork}
      </div>
      <div className="tile-copy">
        <div className="flex flex-col gap-3">
          <p className="tile-eyebrow">{title}</p>
          <h3 className="tile-heading">{subtitle}</h3>
        </div>
        <span className={buttonClasses("dark")}>
          <ButtonLabel label={buttonLabel} />
        </span>
      </div>
    </a>
  );
}
