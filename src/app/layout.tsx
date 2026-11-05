import type { Metadata } from "next";
import localFont from "next/font/local";
import { content } from "@/lib/content";
import "./globals.css";
const redHatDisplay = localFont({
  src: [
    {
      path: "../assets/fonts/red-hat-display-medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/red-hat-display-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-red-hat-display",
  display: "swap",
});
export const metadata: Metadata = content.metadata;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pl"
      className={redHatDisplay.variable}
    >
      <body>{children}</body>
    </html>
  );
}
