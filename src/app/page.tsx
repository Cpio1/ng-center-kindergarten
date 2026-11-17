import { siteMedia } from "@/data/media";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/ui/SkipLink";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { Hero } from "@/components/sections/Hero";
import { AboutAndGroups } from "@/components/sections/AboutAndGroups";
import { Nutrition } from "@/components/sections/Nutrition";
import { Gallery } from "@/components/sections/Gallery";
import { Documents } from "@/components/sections/Documents";
import { Contacts } from "@/components/sections/Contacts";

export default function Home() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero photo={siteMedia.hero} />
        <AboutAndGroups video={siteMedia.video} />
        <Nutrition />
        <Gallery photos={siteMedia.gallery} />
        <Documents />
        <Contacts />
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </>
  );
}
