import { Benefits } from "../Benefits";
import { PromotionalGrid } from "../PromotionalGrid";
export function Offers() {
  return <div className="offers-section">
    <div className="page-container offers-inner">
      <Benefits />
      <PromotionalGrid />
    </div>
  </div>;
}
