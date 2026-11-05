import { Icon } from "@/components/ui/Icon";
export type NavigationLink = {
  id: string;
  href: string;
  label: string;
};
export function MenuLink({
  href,
  label,
  chevron = false
}: Omit<NavigationLink, "id"> & {
  chevron?: boolean;
}) {
  return <a className="menu-link" href={href}>{label}{chevron && <Icon name="chevron" className="size-4" />}</a>;
}
