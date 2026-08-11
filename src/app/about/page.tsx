import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/layout/footer";
import AboutHero from "@/components/about/about-hero";
import AboutMission from "@/components/about/about-mission";
import AboutRanchiHub from "@/components/about/about-ranchi-hub";
import CTA from "@/components/sections/cta";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main>
        <AboutHero />
        <AboutMission />
        <AboutRanchiHub />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
