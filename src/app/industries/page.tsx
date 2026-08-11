import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/layout/footer";
import IndustriesHero from '@/components/industries/industries-hero';
import IndustriesList from '@/components/industries/industries-list';
import CTA from '@/components/sections/cta';

export default function IndustriesPage() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main>
        <IndustriesHero /><IndustriesList /><CTA />
      </main>
      <Footer />
    </div>
  );
}