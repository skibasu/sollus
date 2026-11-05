import { Icon } from "@/components/ui/Icon";
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
        <Icon
          name="providerReviews"
          className="h-9 w-[6.125rem]"
        />
      </a>
      <a
        href="https://www.idosell.com/pl"
        target="_blank"
        rel="noopener noreferrer"
        className="commerce-mark"
        aria-label={content.footer.providerCommerce}
      >
        <Icon
          name="providerPart0"
          className="absolute inset-0"
        />
        <Icon
          name="providerPart1"
          className="absolute top-[19.76%] left-[12.55%]"
        />
        <Icon
          name="providerPart2"
          className="absolute top-[22.8%] left-[19.28%]"
        />
        <Icon
          name="providerPart3"
          className="absolute top-[23.01%] left-[26.66%]"
        />
        <Icon
          name="providerPart4"
          className="absolute top-[22.8%] left-[37.08%]"
        />
        <Icon
          name="providerPart5"
          className="absolute top-[22.8%] left-[45.03%]"
        />
        <Icon
          name="providerPart6"
          className="absolute top-[22.8%] left-[49.11%]"
        />
        <Icon
          name="providerPart7"
          className="absolute top-[18.75%] left-[56.58%]"
        />
        <Icon
          name="providerPart8"
          className="absolute top-[18.75%] left-[68.29%]"
        />
        <Icon
          name="providerPart9"
          className="absolute top-[23.01%] left-[75.71%]"
        />
        <Icon
          name="providerDetail"
          className="absolute top-[48.75%] left-[12.55%]"
        />
      </a>
    </div>
  );
}
