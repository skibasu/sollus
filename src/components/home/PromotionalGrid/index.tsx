import Image from "next/image";
import { Grid, GridColumn } from "@/components/ui/Grid";
import { TileCard } from "@/components/ui/TileCard";
import { content } from "@/lib/content";
export function PromotionalGrid() {
  return (
    <section
      aria-label={content.accessibility.offers}
      className="promotional-grid"
    >
      <Grid className="promotion-row">
        {content.cards.slice(0, 2).map((card, index) => (
          <GridColumn
            key={card.id}
            size={{
              base: "1/1",
              md: "1/2",
              xl: index === 0 ? "5/12" : "7/12",
            }}
          >
            <TileCard
              {...card}
              image={`/images/design/${card.id === "thoro" ? "thoro-photo" : card.id}.webp`}
              className={`tile-card--${card.id}`}
            />
          </GridColumn>
        ))}
      </Grid>
      <Grid className="promotion-row">
        {content.cards.slice(2).map((card, index) => (
          <GridColumn
            key={card.id}
            size={{
              base: "1/1",
              md: "1/2",
              xl: index === 0 ? "7/12" : "5/12",
            }}
          >
            <TileCard
              {...card}
              image={`/images/design/${card.id === "smart" ? "smart-front" : card.id}.webp`}
              className={`tile-card--${card.id}`}
              artwork={
                card.id === "smart" ? (
                  <Image
                    src="/images/design/smart-back.webp"
                    width={230}
                    height={231}
                    alt=""
                    sizes="15rem"
                    className="smart-secondary"
                  />
                ) : undefined
              }
            />
          </GridColumn>
        ))}
      </Grid>
    </section>
  );
}
