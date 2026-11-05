import { artwork, type IconName } from "./artwork";
import { classes } from "@/lib/classes";
type Props = {
  name: IconName;
  className?: string;
};
export function Icon({ name, className }: Props) {
  return (
    <span
      aria-hidden="true"
      className={classes("svg-artwork", className)}
      dangerouslySetInnerHTML={{
        __html: artwork[name],
      }}
    />
  );
}
export type { IconName };
