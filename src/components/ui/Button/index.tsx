import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { classes } from "@/lib/classes";
type Appearance = "brand" | "dark";
type Shared = {
  label: string;
  appearance?: Appearance;
  className?: string;
};
export function buttonClasses(
  appearance: Appearance = "brand",
  className?: string,
) {
  return classes(
    "button",
    appearance === "brand" ? "button--brand" : "button--dark",
    className,
  );
}
export function ButtonLabel({ label }: { label: string }) {
  return (
    <span className="button-label">
      {label}
      <span
        aria-hidden="true"
        className="button-label-highlight"
      >
        {label}
      </span>
    </span>
  );
}

export function Button({
  label,
  appearance,
  className,
  type = "button",
  ...props
}: Shared & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">) {
  return (
    <button
      type={type}
      className={buttonClasses(appearance, className)}
      {...props}
    >
      <ButtonLabel label={label} />
    </button>
  );
}
export function ButtonLink({
  label,
  appearance,
  className,
  href,
  ...props
}: Shared &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> & {
    href: string;
  }) {
  return (
    <Link
      href={href}
      className={buttonClasses(appearance, className)}
      {...props}
    >
      <ButtonLabel label={label} />
    </Link>
  );
}
