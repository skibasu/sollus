import { Icon } from "@/components/ui/Icon";
export type NavigationLink = {
  id: string;
  href: string;
  label: string;
};
export function MenuLink({
  href,
  label,
  chevron = false,
}: Omit<NavigationLink, "id"> & {
  chevron?: boolean;
}) {
  // TODO: Use next/link for menu items when their destination routes are added.
  return (
    <a
      className="menu-link"
      href={href}
    >
      {label}
      {chevron && (
        <Icon
          name="chevron"
          className="size-4"
        />
      )}
    </a>
  );
}
