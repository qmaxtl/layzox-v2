import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/layout/footer";
import VendorOverview from '@/components/dashboard/vendor/vendor-overview';

export default function VendorDashboardPage() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main>
        <VendorOverview />
      </main>
      <Footer />
    </div>
  );
}