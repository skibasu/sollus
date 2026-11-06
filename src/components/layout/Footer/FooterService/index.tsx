import type { ReactNode } from "react";

export type FooterServiceProps = {
  title: string;
  children: ReactNode;
};

export function FooterService({ title, children }: FooterServiceProps) {
  return (
    <div className="footer-service">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
