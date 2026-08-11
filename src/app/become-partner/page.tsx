import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/layout/footer";
import PartnerForm from '@/components/partner/partner-form';

export default function BecomePartnerPage() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main>
        <PartnerForm />
      </main>
      <Footer />
    </div>
  );
}