import Image from "next/image";
import { Icon, type IconName } from "@/components/ui/Icon";
import { content } from "@/lib/content";
const awards = ["design-award", "lighting-award", "business-award", "reliable-company", "quality-award", "trusted-company"];
export function FooterServices() {
  return <div className="page-container footer-services">
    <section className="footer-service">
      <h2>{content.footer.payments}</h2>
      <div className="payment-logos">{content.footer.paymentAlt.map((alt, index) => <Image key={index} src={`/images/design/payment-${index}.webp`} width={43} height={24} alt={alt} className="payment-logo" />)}</div>
    </section>
    <section className="footer-service">
      <h2>{content.footer.awards}</h2>
      <div className="award-logos">{awards.map((name, index) => <Image key={name} src={`/images/design/${name}.webp`} width={96} height={44} alt={content.footer.awardAlt[index]} className="award-logo" />)}</div>
    </section>
    <section className="footer-service">
      <h2>{content.footer.stores}</h2>
      <div className="country-links">{content.footer.countries.map((country, index) => <a key={country} href="#" aria-label={country} className="country-link">
          <Icon name={`country${index}` as IconName} className="size-6" />
        </a>)}</div>
    </section>
  </div>;
}
