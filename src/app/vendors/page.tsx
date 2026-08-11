import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/layout/footer";
import VendorsHero from '@/components/vendors/vendors-hero';
import VendorsDirectory from '@/components/vendors/vendors-directory';
import VendorsVerification from '@/components/vendors/vendors-verification';
import CTA from '@/components/sections/cta';

export default function VendorsPage() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main>
        <VendorsHero /><VendorsDirectory /><VendorsVerification /><CTA />
      </main>
      <Footer />
    </div>
  );
}