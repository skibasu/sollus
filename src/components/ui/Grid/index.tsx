import type { HTMLAttributes } from "react";
import clsx from "clsx";
import { spanClasses, type GridBreakpoint, type GridFraction } from "./classes";
type GridSize = GridFraction | Partial<Record<GridBreakpoint, GridFraction>>;
export function Grid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "grid grid-cols-[repeat(60,minmax(0,1fr))]",
        className,
      )}
      {...props}
    />
  );
}
export function GridColumn({
  size,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  size: GridSize;
}) {
  const values =
    typeof size === "string"
      ? {
          base: size,
        }
      : { base: "1/1" as const, ...size };
  const spans = Object.entries(values).map(
    ([breakpoint, value]) => spanClasses[breakpoint as GridBreakpoint][value],
  );
  return (
    <div
      className={clsx("min-w-0", ...spans, className)}
      {...props}
    />
  );
}
