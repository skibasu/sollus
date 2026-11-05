import { content } from "@/lib/content";
import { ProviderMarks } from "./ProviderMarks";
export function FooterLegal() {
  return (
    <div className="page-container footer-legal">
      <p className="footer-vat">{content.footer.vat}</p>
      <div className="footer-contact">
        {content.footer.contact.map((text) => (
          <span key={text}>{text}</span>
        ))}
      </div>
      <ProviderMarks />
    </div>
  );
}
