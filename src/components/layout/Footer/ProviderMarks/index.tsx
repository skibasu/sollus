import Image from "next/image";
import { content } from "@/lib/content";
export function ProviderMarks() {
  return (
    <div className="provider-marks">
      <a
        href="https://idomods.pl/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={content.footer.providerDesign}
      >
        <Image
          src="/images/providers/idomods.svg"
          alt=""
          width={98}
          height={36}
        />
      </a>
      <a
        href="https://www.idosell.com/pl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={content.footer.providerCommerce}
      >
        <Image
          src="/images/providers/idosell.svg"
          alt=""
          width={66}
          height={36}
        />
      </a>
    </div>
  );
}
