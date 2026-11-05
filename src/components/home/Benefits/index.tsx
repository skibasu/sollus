import { Vp, VpIcon } from "@/components/ui/Vp";
import { content } from "@/lib/content";
export function Benefits() {
  return <section aria-label={content.accessibility.benefits} className="benefits">{content.benefits.map(item => <Vp key={item.icon} title={item.title} subtitle={item.subtitle} icon={item.icon as VpIcon} />)}</section>;
}
