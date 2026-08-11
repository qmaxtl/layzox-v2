import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/layout/footer";
import ContactForm from "@/components/contact/contact-form";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <main>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
