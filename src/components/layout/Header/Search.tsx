import { Icon } from "@/components/ui/Icon";
import { content } from "@/lib/content";

export function Search() {
  return (
    <div className="header-search">
      <button
        type="button"
        className="header-search-trigger"
        aria-label={content.accessibility.search}
      >
        <Icon name="search" className="size-5" />
      </button>
      <label className="header-search-field">
        <span className="sr-only">{content.accessibility.search}</span>
        <input
          type="search"
          placeholder={content.header.placeholder}
          autoComplete="off"
        />
        <Icon name="search" className="size-5" />
      </label>
    </div>
  );
}
