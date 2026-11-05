import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { Offers } from "@/components/home/Offers";
import { ShaderSection } from "@/components/home/ShaderSection";
import { Footer } from "@/components/layout/Footer";
import { content } from "@/lib/content";
export default function Home() {
  return <>
    <a href="#main-content" className="skip-link">{content.accessibility.skip}</a>
    <Header links={content.header.links} />
    <main id="main-content">
      <Hero />
      <Offers />
      <ShaderSection />
    </main>
    <Footer />
  </>;
}
