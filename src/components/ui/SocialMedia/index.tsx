import { Icon, type IconName } from "../Icon";
import { content } from "@/lib/content";
export function SocialMedia() {
  return <nav aria-label={content.accessibility.social} className="social-media">{content.social.map(link => <a key={link.icon} href={link.href} aria-label={link.label} className="social-media-link">
      <Icon name={link.icon as IconName} className="social-media-icon" />
    </a>)}</nav>;
}
