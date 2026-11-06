import { content } from "@/lib/content";
import { Benefits } from "../Benefits";
import { PromotionalGrid } from "../PromotionalGrid";
export function Offers() {
  return (
    <section
      aria-label={content.accessibility.offers}
      className="offers-section"
    >
      <div className="page-container offers-inner">
        <Benefits />
        <PromotionalGrid />
      </div>
    </section>
  );
}
