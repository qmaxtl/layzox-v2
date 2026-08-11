import React from "react";
import Link from "next/link";
import { Building2, ShieldCheck, Truck, ArrowRight, CheckCircle2, Factory, Layers, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Layzox v2
            </span>
            <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
              Ranchi Hub
            </span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-slate-400 font-medium">
            <Link href="/about" className="hover:text-white transition">About Us</Link>
            <Link href="/services" className="hover:text-white transition">Services</Link>
            <Link href="/vendors" className="hover:text-white transition">Vendors</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </nav>
          <div className="flex gap-3">
            <Link href="/request-quote" className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-4 py-2 rounded-lg font-semibold transition flex items-center gap-1.5">
              Get Quote <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold mb-6">
          <Building2 className="w-4 h-4" /> B2B Industrial Sourcing Engine
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          Next-Gen Industrial Procurement for <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Enterprise Buyers & Suppliers</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
          Eliminate supply delays, unverified counterparties, and manual RFQs. Connect directly with audited manufacturers across Jharkhand and Pan-India.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/request-quote" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition">
            Post RFQ Requirement
          </Link>
          <Link href="/become-partner" className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl font-semibold text-sm transition">
            Become a Supplier
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-slate-800 bg-slate-900/40 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-white">300+</div>
            <div className="text-xs text-slate-400 mt-1">Verified Suppliers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">65%</div>
            <div className="text-xs text-slate-400 mt-1">Lead Time Reduced</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-xs text-slate-400 mt-1">In-Person Audited</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">Pan-India</div>
            <div className="text-xs text-slate-400 mt-1">Logistics Coverage</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">Our Capabilities</h2>
          <p className="text-2xl md:text-3xl font-bold text-white">End-to-End Industrial Sourcing Solutions</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Vendor Verification</h3>
            <p className="text-sm text-slate-400">Strict on-ground audit of manufacturing facilities, machinery specs, and quality standards.</p>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <Layers className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Smart Matching</h3>
            <p className="text-sm text-slate-400">Match RFQs with capable regional suppliers based on technical precision and capacity.</p>
          </div>
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <Truck className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Freight & Escrow</h3>
            <p className="text-sm text-slate-400">Integrated freight tracking and milestone escrow payment for risk-free transactions.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        © Layzox B2B Industrial Marketplace. All rights reserved.
      </footer>
    </div>
  );
}
