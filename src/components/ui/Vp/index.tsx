import { Icon } from "../Icon";
export enum VpIcon {
  Returns = "returns",
  Warranty = "warranty",
  Delivery = "delivery",
  Poland = "poland",
  Trophy = "trophy",
}
export function Vp({
  title,
  subtitle,
  icon
}: {
  title: string;
  subtitle: string;
  icon: VpIcon;
}) {
  return <div className="value-proposition">
    <Icon name={icon} className="size-8" />
    <div className="value-proposition-copy">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  </div>;
}
