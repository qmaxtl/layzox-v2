import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/layout/footer";
import PricingHero from '@/components/pricing/pricing-hero';
import PricingCards from '@/components/pricing/pricing-cards';
import PricingFAQ from '@/components/pricing/pricing-faq';
import CTA from '@/components/sections/cta';

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main>
        <PricingHero /><PricingCards /><PricingFAQ /><CTA />
      </main>
      <Footer />
    </div>
  );
}