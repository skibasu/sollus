import { Icon } from "@/components/ui/Icon";
import { content } from "@/lib/content";
export function TrustBadge() {
  return <div className="trust-badge">
    <span className="flex items-center gap-1">
      <strong className="text-vp">{content.hero.rating}</strong>
      <Icon name="trustmate" className="size-5" />
    </span>
    <span className="text-small">{content.hero.ratingLabel}</span>
  </div>;
}
