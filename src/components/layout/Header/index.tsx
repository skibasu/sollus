import { HeaderSurface } from "./HeaderSurface";
import { Logo } from "@/components/ui/Logo";
import { MenuLink, type NavigationLink } from "./MenuLink";
import { HeaderActions } from "./HeaderActions";
import { content } from "@/lib/content";
export function Header({ links }: { links: NavigationLink[] }) {
  return (
    <HeaderSurface>
      <div className="page-container header-inner">
        <Logo inverted />
        <nav
          aria-label={content.accessibility.navigation}
          className="header-navigation"
        >
          {links.map((link, index) => (
            <MenuLink
              key={link.id}
              href={link.href}
              label={link.label}
              //TODO  : This is a temporary solution to limit the number of chevrons displayed.
              chevron={index < 3}
            />
          ))}
        </nav>
        <HeaderActions />
      </div>
    </HeaderSurface>
  );
}
