import Link from "next/link";
import { Icon } from "../Icon";
import { content } from "@/lib/content";
import { classes } from "@/lib/classes";
export function Logo({
  inverted = false,
  className
}: {
  inverted?: boolean;
  className?: string;
}) {
  return <Link href="/" aria-label={content.accessibility.home} className={classes("logo", className)}>
    <Icon name={inverted ? "logoLight" : "logoDark"} className="h-full w-full" />
  </Link>;
}
