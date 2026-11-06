import { artwork, type IconName } from "./artwork";
import clsx from "clsx";
type Props = {
  name: IconName;
  className?: string;
};
export function Icon({ name, className }: Props) {
  return (
    <span
      aria-hidden="true"
      className={clsx("svg-artwork", className)}
      dangerouslySetInnerHTML={{
        __html: artwork[name],
      }}
    />
  );
}
export type { IconName };
