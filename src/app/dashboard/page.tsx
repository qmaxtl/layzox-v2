import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/layout/footer";
import DashboardOverview from '@/components/dashboard/dashboard-overview';

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main>
        <DashboardOverview />
      </main>
      <Footer />
    </div>
  );
}