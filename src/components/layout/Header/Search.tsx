import { Icon } from "@/components/ui/Icon";
import { content } from "@/lib/content";
export function Search() {
  return <label className="header-search">
    <span className="sr-only">{content.accessibility.search}</span>
    <input type="search" placeholder={content.header.placeholder} autoComplete="off" />
    <Icon name="search" className="size-5" />
  </label>;
}
