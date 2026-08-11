import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/layout/footer";
import QuoteForm from '@/components/quote/quote-form';

export default function RequestQuotePage() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main>
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}