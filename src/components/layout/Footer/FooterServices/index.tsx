import Image from "next/image";
import { Icon, type IconName } from "@/components/ui/Icon";
import { content } from "@/lib/content";
import { FooterService, type FooterServiceProps } from "../FooterService";

const awards = [
  "design-award",
  "lighting-award",
  "business-award",
  "reliable-company",
  "quality-award",
  "trusted-company",
];

const services: readonly [
  FooterServiceProps,
  FooterServiceProps,
  FooterServiceProps,
] = [
  {
    title: content.footer.payments,
    children: (
      <div className="payment-logos">
        {content.footer.paymentAlt.map((alt, index) => (
          <div
            key={index}
            className="payment-logo"
          >
            <Image
              src={`/images/design/payment-${index}.webp`}
              width={114}
              height={64}
              sizes="43px"
              alt={alt}
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
    ),
  },
  {
    title: content.footer.awards,
    children: (
      <div className="award-logos">
        {awards.map((name, index) => (
          <Image
            key={name}
            src={`/images/design/${name}.webp`}
            width={96}
            height={44}
            alt={content.footer.awardAlt[index]}
            className="award-logo"
          />
        ))}
      </div>
    ),
  },
  {
    title: content.footer.stores,
    children: (
      <div className="country-links">
        {content.footer.countries.map((country, index) => (
          <a
            key={country}
            href="#"
            aria-label={country}
            className="country-link"
          >
            <Icon
              name={`country${index}` as IconName}
              className="size-6"
            />
          </a>
        ))}
      </div>
    ),
  },
];

export function FooterServices() {
  return (
    <div className="page-container footer-services">
      {services.map(({ title, children }) => (
        <FooterService
          key={title}
          title={title}
        >
          {children}
        </FooterService>
      ))}
    </div>
  );
}
