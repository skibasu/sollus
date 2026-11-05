import { Icon } from "@/components/ui/Icon";
import { content } from "@/lib/content";
export function HeaderActions() {
  return <div className="header-actions">
    <a href="#" className="header-configurator">
      <Icon name="cube" className="size-5" />
      <span>{content.header.configurator}</span>
    </a>
    <a href="#" aria-label={content.accessibility.account} className="header-icon">
      <Icon name="user" className="size-6" />
    </a>
    <a href="#" aria-label={content.accessibility.basket} className="header-basket header-icon">
      <Icon name="basket" className="size-6" />
    </a>
    <button type="button" aria-label={content.accessibility.menu} className="hamburger">
      <Icon name="menu" className="size-9" />
    </button>
  </div>;
}
