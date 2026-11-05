import { content } from "@/lib/content";
import { FooterLink } from "./FooterLink";
export function FooterNavigation() {
  return (
    <nav
      aria-label={content.accessibility.footer}
      className="footer-navigation"
    >
      {content.footer.columns.map((column) => (
        <div
          key={column.title}
          className="footer-column"
        >
          <h2>{column.title}</h2>
          <ul>
            {column.links.map((label) => (
              <li key={label}>
                <FooterLink
                  href="#"
                  label={label}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
