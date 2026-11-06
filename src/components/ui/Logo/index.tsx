import Link from "next/link";
import { Icon } from "../Icon";
import { content } from "@/lib/content";
import clsx from "clsx";
export function Logo({
  inverted = false,
  className,
}: {
  inverted?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={content.accessibility.home}
      className={clsx("logo", className)}
    >
      <Icon
        name={inverted ? "logoLight" : "logoDark"}
        className="h-full w-full"
      />
    </Link>
  );
}
