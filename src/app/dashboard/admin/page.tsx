import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/layout/footer";
import AdminOverview from '@/components/dashboard/admin/admin-overview';

export default function AdminDashboardPage() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main>
        <AdminOverview />
      </main>
      <Footer />
    </div>
  );
}