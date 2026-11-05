import { content } from "@/lib/content";
import { FooterLink } from "./FooterLink";
import { ProviderMarks } from "./ProviderMarks";
export function FooterLegal() {
  return (
    <div className="page-container footer-legal">
      <p className="footer-vat">{content.footer.vat}</p>
      <div className="footer-contact">
        {content.footer.contact.map((item) =>
          typeof item === "string" ? (
            <span key={item}>{item}</span>
          ) : (
            <FooterLink
              key={item.href}
              href={item.href}
              label={item.label}
            />
          ),
        )}
      </div>
      <ProviderMarks />
    </div>
  );
}
