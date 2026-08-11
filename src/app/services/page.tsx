import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/layout/footer";
import ServicesHero from '@/components/services/services-hero';
import ServicesGrid from '@/components/services/services-grid';
import ServicesWorkflow from '@/components/services/services-workflow';
import CTA from '@/components/sections/cta';

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main>
        <ServicesHero /><ServicesGrid /><ServicesWorkflow /><CTA />
      </main>
      <Footer />
    </div>
  );
}