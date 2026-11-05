import { Logo } from "@/components/ui/Logo";
import { SocialMedia } from "@/components/ui/SocialMedia";
import { FooterNavigation } from "./FooterNavigation";
import { FooterServices } from "./FooterServices";
import { FooterLegal } from "./FooterLegal";
export function Footer() {
  return <footer className="site-footer">
    <div className="page-container footer-top">
      <div className="footer-brand">
        <Logo />
        <SocialMedia />
      </div>
      <FooterNavigation />
    </div>
    <FooterServices />
    <FooterLegal />
  </footer>;
}
