import { content } from "@/lib/content";
import { FooterLink } from "./FooterLink";
import { ProviderMarks } from "./ProviderMarks";
export function FooterLegal() {
  return (
    <div className="page-container footer-legal">
      <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-8">
        <p className="footer-vat min-w-0">{content.footer.vat}</p>
        <div className="w-full border-t border-border md:flex-1" />
        <div className="shrink-0">
          <ProviderMarks />
        </div>
      </div>

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
    </div>
  );
}
