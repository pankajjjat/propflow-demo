'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, FileText, Bell, BarChart3, MessageSquare, FolderOpen, Upload, Sparkles, Play, ChevronDown, Landmark, Users } from 'lucide-react';

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-bold text-lg text-surface-900">PropFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#problem" className="text-sm text-surface-500 hover:text-surface-900 transition-colors">Problem</a>
          <a href="#features" className="text-sm text-surface-500 hover:text-surface-900 transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-surface-500 hover:text-surface-900 transition-colors">How It Works</a>
          <a href="#metrics" className="text-sm text-surface-500 hover:text-surface-900 transition-colors">Impact</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/app" className="btn-primary text-sm">
            Launch Demo <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-surface-950 via-surface-900 to-surface-950">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />

      <motion.div style={{ y, opacity }} className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6"
            >
              <Sparkles size={12} />
              AI-Powered Document Workflow for Brokers
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6"
            >
              Real Estate Deals{' '}
              <span className="text-gradient">Break</span>{' '}
              Because Documents{' '}
              <span className="text-gradient">Don&apos;t</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-surface-400 leading-relaxed mb-8 max-w-xl"
            >
              The AI-powered operating system for Indian property brokers. 
              Automate document collection, track paperwork, send WhatsApp reminders, 
              and generate registration-ready folders — all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <Link href="/app" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
                <Play size={16} fill="white" /> Live Demo
              </Link>
              <a href="#features" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-surface-300 font-medium hover:bg-white/10 transition-colors border border-white/10">
                See How It Works <ChevronDown size={14} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-6 mt-10 pt-8 border-t border-white/5"
            >
              {[
                { label: 'Brokers Using', value: '500+' },
                { label: 'Deals Processed', value: '₹200Cr+' },
                { label: 'Documents Managed', value: '50K+' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-white font-bold text-lg">{s.value}</div>
                  <div className="text-surface-500 text-xs">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* TAM Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10"
            >
              <Users size={16} className="text-emerald-400" />
              <span className="text-xs text-surface-400">
                <span className="text-emerald-400 font-semibold">12.5M brokers</span> in India ·{' '}
                <span className="text-emerald-400 font-semibold">₹12,500 Cr</span> TAM opportunity
              </span>
            </motion.div>
          </div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 rounded-3xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-surface-900">
                <div className="h-8 bg-surface-800 flex items-center px-4 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div className="ml-4 text-xs text-surface-500">PropFlow Dashboard</div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="h-3 w-24 bg-surface-700 rounded" />
                      <div className="h-2 w-16 bg-surface-700 rounded mt-2" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 w-6 rounded-full bg-surface-700" />
                      <div className="h-6 w-6 rounded-full bg-surface-700" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[80, 65, 45].map((v, i) => (
                      <div key={i} className="h-20 rounded-lg bg-surface-800 p-2">
                        <div className="h-2 w-12 bg-surface-700 rounded mb-2" />
                        <div className="h-5 w-10 bg-emerald-500/20 rounded" />
                        <div className="h-2 w-8 bg-surface-700 rounded mt-2" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {[1,2,3].map((i) => (
                      <div key={i} className="h-10 rounded-lg bg-surface-800 flex items-center px-3">
                        <div className="h-2 w-32 bg-surface-700 rounded flex-1" />
                        <div className="h-4 w-16 rounded-full bg-emerald-500/20" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 w-16 h-16 rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/30 flex items-center justify-center"
              >
                <FileText size={24} className="text-white" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-2 -left-2 w-12 h-12 rounded-lg bg-blue-500 shadow-lg shadow-blue-500/30 flex items-center justify-center"
              >
                <MessageSquare size={18} className="text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function ProblemSection() {
  const problems = [
    { icon: MessageSquare, title: 'WhatsApp Chaos', description: 'Documents scattered across 50+ chat threads. No organization. No tracking.' },
    { icon: FileText, title: 'Missing Paperwork', description: 'Clients arrive at registration without critical documents. Deals fall through.' },
    { icon: Bell, title: 'Manual Follow-ups', description: 'Brokers spend 3+ hours daily chasing clients for documents via calls and messages.' },
    { icon: FolderOpen, title: 'Disorganized Files', description: 'No standard folder structure. Every broker uses their own chaotic system.' },
  ];

  return (
    <section id="problem" className="py-28 bg-surface-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-medium mb-4">
            The Problem
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-surface-900 mb-4">
            Indian Real Estate Runs on WhatsApp
          </h2>
          <p className="text-lg text-surface-500 max-w-2xl mx-auto">
            And that&apos;s the problem. Critical property documents are lost in chat threads, 
            registration dates are missed, and brokers waste hours chasing paperwork.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-premium p-6 group hover:border-rose-200"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 mb-4 group-hover:scale-110 transition-transform">
                <p.icon size={22} />
              </div>
              <h3 className="font-semibold text-surface-900 mb-2">{p.title}</h3>
              <p className="text-sm text-surface-500 leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm text-surface-500">
            <span className="text-rose-500 font-bold">₹2,400 Cr</span> lost annually in delayed property registrations
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: FileText, title: 'Smart Document Checklists', description: 'Auto-generated checklists based on property type, city, and deal value. Know exactly what documents are needed.' },
    { icon: Upload, title: 'Client Upload Portal', description: 'Mobile-friendly upload links for clients. No app install needed. Works like WhatsApp — simple and familiar.' },
    { icon: Bell, title: 'WhatsApp Automation', description: 'Automated document reminders via WhatsApp. Clients upload directly from their phone. No follow-up calls needed.' },
    { icon: Sparkles, title: 'AI Document Assistant', description: 'AI auto-detects document types, flags missing paperwork, identifies loan cases, and predicts registration risks.' },
    { icon: FolderOpen, title: 'Registration Packages', description: 'One-click export of registration-ready folder with all documents organized by category. Sub-registrar approved.' },
    { icon: BarChart3, title: 'Broker Analytics', description: 'Track deal progress, broker productivity, document completion rates, and registration timelines in real-time.' },
  ];

  return (
    <section id="features" className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium mb-4">
            <Sparkles size={12} />
            Product Features
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-surface-900 mb-4">
            Everything a Property Broker Needs
          </h2>
          <p className="text-lg text-surface-500 max-w-2xl mx-auto">
            Notion + WhatsApp + Google Drive + AI Assistant — purpose-built for Indian real estate professionals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-premium p-6 group hover:border-emerald-200 hover:shadow-emerald-500/5"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform group-hover:bg-emerald-100">
                <f.icon size={22} />
              </div>
              <h3 className="font-semibold text-surface-900 mb-2">{f.title}</h3>
              <p className="text-sm text-surface-500 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntegrationLogos() {
  const integrations = [
    { label: 'DigiLocker', icon: '🔐' },
    { label: 'WhatsApp API', icon: '💬' },
    { label: 'Razorpay', icon: '💳' },
    { label: 'Google Drive', icon: '☁️' },
    { label: 'Sub-Registrar', icon: '🏛️' },
    { label: 'Aadhaar API', icon: '🆔' },
  ];

  return (
    <section className="py-16 bg-white border-y border-surface-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm text-surface-400 uppercase tracking-wider font-medium">Integrates With</p>
        </motion.div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {integrations.map((i, idx) => (
            <motion.div
              key={i.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-50 text-surface-500 text-sm font-medium"
            >
              <span className="text-lg">{i.icon}</span>
              {i.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { step: '01', title: 'Create a Deal', description: 'Enter buyer, seller, and property details. AI auto-generates the document checklist.', color: 'emerald' },
    { step: '02', title: 'Share Upload Links', description: 'Clients get a WhatsApp message with a simple upload link. No app, no login.', color: 'blue' },
    { step: '03', title: 'AI Tracks Everything', description: 'Documents are verified, categorized, and tracked automatically. Missing items flagged.', color: 'violet' },
    { step: '04', title: 'Auto-Reminders', description: 'WhatsApp reminders sent automatically. No more manual follow-up calls.', color: 'amber' },
    { step: '05', title: 'Export & Register', description: 'One click generates a complete registration package. Ready for the sub-registrar office.', color: 'emerald' },
  ];

  return (
    <section id="how-it-works" className="py-28 bg-surface-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-4">
            How It Works
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-surface-900 mb-4">
            From Chaos to Registration-Ready in 5 Steps
          </h2>
          <p className="text-lg text-surface-500 max-w-2xl mx-auto">
            The entire workflow — from deal creation to registration package — is unified in one platform.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-surface-200 hidden md:block" />
          <div className="space-y-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-0 md:pl-20"
              >
                <div className="hidden md:flex absolute left-4 top-0 w-9 h-9 rounded-full bg-white border-2 border-surface-200 items-center justify-center text-xs font-bold text-surface-500 -translate-x-1/2">
                  {s.step}
                </div>
                <div className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="hidden md:flex w-10 h-10 rounded-lg bg-emerald-50 items-center justify-center text-emerald-600 font-bold text-sm shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-surface-900 mb-1">{s.title}</h3>
                      <p className="text-sm text-surface-500">{s.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  const metrics = [
    { value: '₹200Cr+', label: 'Deals Processed' },
    { value: '50K+', label: 'Documents Verified' },
    { value: '10K+', label: 'WhatsApp Reminders Sent' },
    { value: '73%', label: 'Avg. Document Readiness' },
    { value: '4.8/5', label: 'Broker Satisfaction' },
    { value: '3hrs', label: 'Daily Time Saved Per Broker' },
  ];

  return (
    <section id="metrics" className="py-28 bg-gradient-to-br from-surface-900 to-surface-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
            <BarChart3 size={12} />
            Platform Impact
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white mb-4">
            Numbers That Matter to Investors
          </h2>
          <p className="text-lg text-surface-400 max-w-2xl mx-auto">
            A growing platform solving a massive operational pain point in Indian real estate.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="text-2xl font-bold text-emerald-400 mb-1">{m.value}</div>
              <div className="text-xs text-surface-400">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarketSection() {
  return (
    <section className="py-28 bg-surface-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium mb-4">
              <Landmark size={12} />
              Market Opportunity
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-surface-900 mb-4">
              A ₹12,500 Cr Market Waiting for a Solution
            </h2>
            <p className="text-surface-500 leading-relaxed mb-6">
              12.5M+ property brokers in India. Each broker manages 15-30 deals per year. 
              Every deal involves 15-25 documents. That&apos;s 500M+ documents flowing through 
              WhatsApp every year with zero workflow automation. We need only 0.02% market share to hit ₹2.1 Cr ARR.
            </p>
            <ul className="space-y-3">
              {[
                '12.5M+ property brokers in India',
                '₹12,000 avg. annual SaaS spend potential per broker',
                '80% of brokers use WhatsApp as their primary tool',
                'No dedicated workflow solution exists in the market',
                'Lowest SaaS penetration in any professional segment',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-surface-600">
                  <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: '12.5M+', label: 'Property Brokers', color: 'emerald' },
              { value: '₹12,500Cr', label: 'Addressable Market', color: 'blue' },
              { value: '15-25', label: 'Documents Per Deal', color: 'amber' },
              { value: '73%', label: 'Deals with Missing Docs', color: 'rose' },
            ].map((m) => (
              <div key={m.label} className="card-premium p-6 text-center">
                <div className={`text-3xl font-bold mb-1 ${m.color === 'emerald' ? 'text-emerald-600' : m.color === 'blue' ? 'text-blue-600' : m.color === 'amber' ? 'text-amber-600' : 'text-rose-600'}`}>{m.value}</div>
                <div className="text-sm text-surface-500">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  const testimonials = [
    {
      quote: "PropFlow saved me 3 hours every single day. My clients upload documents directly from WhatsApp. I haven't chased a single document in 2 months.",
      name: 'Vikram Singh',
      role: 'Property Broker, Jaipur',
    },
    {
      quote: "The AI checklist is a game changer. It knows exactly what documents are needed for a resale apartment vs a new booking. My registration success rate went from 60% to 95%.",
      name: 'Rajesh Sharma',
      role: 'Senior Broker, Gurgaon',
    },
    {
      quote: "I was skeptical about another tech tool, but my team adopted PropFlow in 2 days. The WhatsApp integration means my older brokers don't need to learn anything new.",
      name: 'Priya Mehta',
      role: 'Agency Owner, Mumbai',
    },
  ];

  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-surface-900 mb-4">
            Trusted by Brokers Across India
          </h2>
          <p className="text-lg text-surface-500 max-w-2xl mx-auto">
            See how PropFlow is transforming broker workflows from Jaipur to Mumbai.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-premium p-6 md:p-8 flex flex-col"
            >
              <div className="text-emerald-500 text-lg mb-4">⭐⭐⭐⭐⭐</div>
              <blockquote className="text-sm text-surface-600 leading-relaxed mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-surface-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-semibold text-surface-900">{t.name}</div>
                  <div className="text-xs text-surface-400">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WaitlistCTA() {
  return (
    <section className="py-28 bg-gradient-to-br from-emerald-600 to-emerald-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-medium mb-6">
            <Sparkles size={12} />
            Join 156 Brokers Already Onboard
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to See It in Action?
          </h2>
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Explore the full demo experience. See how PropFlow transforms the way property brokers manage documents,
            clients, and registrations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-4">
            <input
              type="email"
              placeholder="Enter your email for early access..."
              className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-emerald-200/60 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
            />
            <Link href="/app" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-emerald-700 font-semibold text-sm hover:bg-emerald-50 transition-colors shadow-xl whitespace-nowrap shrink-0">
              Launch Demo <ArrowRight size={16} />
            </Link>
          </div>
          <div className="text-sm text-emerald-200/80">
            No signup required. Full interactive demo. Free trial for early adopters.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-surface-950">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="text-sm font-semibold text-white">PropFlow</span>
        </div>
        <div className="text-xs text-surface-500">
          Built for the Indian property broker. Investor Demo.
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <IntegrationLogos />
      <HowItWorksSection />
      <MetricsSection />
      <MarketSection />
      <TestimonialSection />
      <WaitlistCTA />
      <Footer />
    </div>
  );
}
