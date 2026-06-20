'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionHeading from '@/components/ui/SectionHeading'
import FaqAccordion, { type FaqItem } from '@/components/sections/FaqAccordion'
import CtaBand from '@/components/sections/CtaBand'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Pill, Building2, Printer, ArrowRight, CheckCircle2 } from 'lucide-react'

const ingredients = [
  {
    code: '01',
    icon: Pill,
    title: 'Modules & workflows',
    description:
      "Switch on only what your pharmacy runs on — POS billing, batch & expiry tracking, prescription records, insurance claims, multi-store reporting. You pay for what's active, nothing held in reserve.",
  },
  {
    code: '02',
    icon: Building2,
    title: 'Branches & counters',
    description:
      'One counter or a city-wide chain — your plan scales with the number of outlets, billing counters, and the order volume moving through them.',
  },
  {
    code: '03',
    icon: Printer,
    title: 'Hardware & setup',
    description:
      'Barcode scanners, label and receipt printers, fiscal devices — bundled, configured, and set up on your counter with hands-on onboarding for your staff.',
  },
] as const

const included = [
  'Unlimited prescriptions & billing',
  'Real-time stock & expiry alerts',
  'Insurance & TPA claim tracking',
  'Free onboarding & data migration',
]

const faqs: FaqItem[] = [
  {
    q: 'Is there a free trial?',
    a: 'Yes. Every PharmacyPlus plan opens with a 14-day free trial covering the full feature set, so you can run real billing and stock before committing. No card required to start.',
  },
  {
    q: 'Can I change my plan later?',
    a: 'Your plan grows with your pharmacy. Add a branch, switch on a new module, or scale down — changes apply from your next billing cycle with no lock-in penalty.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept major debit and credit cards, bank transfer, and local payment gateways depending on your country. Invoices can also be raised for annual billing.',
  },
  {
    q: 'Is there a long-term contract?',
    a: 'No. PharmacyPlus runs month-to-month by default. Annual billing is available at a discount for pharmacies that want to lock in a rate.',
  },
  {
    q: 'What happens when my trial ends?',
    a: "We'll reach out before your trial closes to confirm the modules and branches you want to keep. Nothing is billed automatically without your confirmation.",
  },
  {
    q: 'Do you charge per transaction?',
    a: 'No. Pricing is based on your modules, branches, and hardware — not on how many bills or prescriptions you process each month.',
  },
  {
    q: 'Can PharmacyPlus migrate my existing data?',
    a: 'Yes. Our onboarding team helps move your existing inventory, customer, and prescription records during setup, at no extra charge for standard imports.',
  },
  {
    q: 'Is support included?',
    a: 'Every plan includes onboarding support and access to our help center. Priority support and on-site training are available as an add-on for larger chains.',
  },
]

export default function PricingPage() {
  return (
    <>
      <Navbar />

      {/*
       * FIX 1 — Navbar overlap root cause fix.
       * The hero section cannot rely on internal pt-* to clear the navbar
       * because the section background starts at top:0 (behind the fixed bar).
       * Solution: add pt-16 (64px) to <main> as a single source of truth for
       * navbar height clearance. Remove per-section pt-32/pt-36 overrides and
       * replace them with section-specific vertical padding only.
       * Adjust pt-16 → pt-[72px] if your navbar is taller than 64px.
       */}
      <main className="pt-[var(--header-height)]">


        {/* ─── HERO ────────────────────────────────────────────────────────────
         * FIX: Removed pt-32/pt-36 (they were fighting the fixed navbar).
         * Now pt-20/pb-24 is pure section breathing room only.
         * The navbar clearance is handled by <main className="pt-16"> above.
         * ─────────────────────────────────────────────────────────────────── */}
        <section style={{ backgroundColor: '#F3FAF9', position: 'relative', overflow: 'hidden' }}>
          {/* Ambient blobs */}
          <div aria-hidden style={{
            position: 'absolute', top: '-80px', right: '-60px',
            width: '380px', height: '380px', borderRadius: '50%',
            background: 'rgba(9,159,147,0.18)', filter: 'blur(72px)',
            pointerEvents: 'none',
          }} />
          <div aria-hidden style={{
            position: 'absolute', bottom: '-100px', left: '-60px',
            width: '380px', height: '380px', borderRadius: '50%',
            background: 'rgba(18,52,77,0.08)', filter: 'blur(72px)',
            pointerEvents: 'none',
          }} />

          {/* Content — centered, no left offset */}
          <div style={{
            position: 'relative',
            maxWidth: '680px',       /* narrow = screenshot feel */
            margin: '0 auto',
            padding: '80px 24px 72px',
            textAlign: 'center',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Eyebrow pill — no bg box, just icon + text */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontSize: '13px', fontWeight: 500, color: '#099F93',
                border: '1px solid rgba(9,159,147,0.25)',
                borderRadius: '999px',
                padding: '6px 16px',
                backgroundColor: 'rgba(255,255,255,0.7)',
              }}>
                <Pill style={{ width: '13px', height: '13px' }} />
                Compounded for your pharmacy
              </span>

              {/* Headline */}
              <h1 style={{
                marginTop: '24px',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#12344D',
              }}>
                Pricing, compounded around how your pharmacy runs.
              </h1>

              {/* Subtitle — short, matches screenshot line breaks */}
              <p style={{
                marginTop: '20px',
                fontSize: '15px',
                lineHeight: '1.7',
                color: 'rgba(18,52,77,0.60)',
                maxWidth: '520px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
                There&apos;s no shelf price for PharmacyPlus. Every plan is mixed from the
                modules, branches, and hardware your pharmacy actually needs.
              </p>

              {/* CTA */}
              <div style={{ marginTop: '32px' }}>
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    backgroundColor: '#099F93',
                    color: '#ffffff',
                    padding: '12px 28px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(9,159,147,0.30)',
                  }}
                >
                  Get your estimate
                  <ArrowRight style={{ width: '15px', height: '15px' }} />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Dotted divider */}
          <div aria-hidden style={{
            height: '1px', width: '100%',
            backgroundImage: 'radial-gradient(circle, rgba(18,52,77,0.18) 1.5px, transparent 1.5px)',
            backgroundSize: '14px 1px',
          }} />
        </section>

        {/* ─── INGREDIENTS ─────────────────────────────────────────────────────
         * FIX 4 — Layout rhythm & card design.
         *
         * Container: max-w-6xl with px-6 (same as hero uses relative to max-w-4xl
         * so both flush to the same side gutters on wide screens).
         *
         * Cards: gap-8 → gap-6 lg:gap-8 for tighter but not cramped grid.
         *   - Added min-h to equalize card heights via flex
         *   - Stronger Rx code → icon → title → body hierarchy
         *   - Icon container gets a subtle ring for depth
         *   - Hover: combined border glow + lift + shadow for premium feel
         * ─────────────────────────────────────────────────────────────────── */}
        <section style={{ padding: '50px' }}>
          <div className="mx-auto max-w-8xl">
            {/* Section heading — left aligned, no subtitle shown */}
            <p className="text-xs font-semibold uppercase tracking-widest text-[#099F93] mb-2">
              What goes into your plan
            </p>
            <h2 className="text-2xl font-semibold text-[#12344D] mb-10" style={{ paddingBottom: '20px' }}>
              Three ingredients, one tailored plan
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ingredients.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.code}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                    className="group flex flex-col rounded-2xl border border-[#099F93]/20 bg-white
                              transition-all duration-300
                              hover:-translate-y-1 hover:border-[#099F93]/40
                              hover:shadow-[0_8px_24px_rgba(9,159,147,0.10)]"
                    style={{ padding: '20px' }}
                  >
                    {/* Rx code — top left, small teal */}
                    <span className="text-[11px] font-medium text-[#099F93] mb-4">
                      {item.code}
                    </span>

                    {/* Icon — plain light teal box, no ring */}
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#099F93]/10 text-[#099F93] mb-6">
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Title in teal */}
                    <h3 className="text-base font-semibold text-[#099F93] mb-2">
                      {item.title}
                    </h3>

                    {/* Body in muted dark */}
                    <p className="text-sm leading-relaxed text-[#12344D]/55">
                      {item.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── INCLUDED IN EVERY PLAN ──────────────────────────────────────────
         * FIX 6 — Included band.
         * Increased inner padding for more air.
         * 4-col grid with wider gap so items aren't cramped on desktop.
         * Check items get slightly larger text for readability.
         * ─────────────────────────────────────────────────────────────────── */}
        <section className="border-y border-[#12344D]/8 bg-[#F3FAF9]">
          <div className="mx-auto max-w-8xl px-6 py-14 sm:py-20" style={{ padding: '20px', marginLeft: '50px' }}>
            <p className="text-center text-xs font-bold uppercase tracking-widest text-[#099F93]" style={{ paddingBottom: '10px' }}>
              Included in every plan
            </p>
            <div className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
              {included.map((line) => (
                <div key={line} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#099F93]" />
                  <span className="text-[15px] leading-snug text-[#12344D]/80">{line}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─────────────────────────────────────────────────────────────
         * FIX 7 — FAQ alignment and width.
         *
         * Root cause: max-w-3xl without mx-auto centering on the section
         * wrapper made the accordion drift left on wide screens.
         *
         * Fix:
         *  - Outer section: max-w-6xl centers the section in page flow.
         *  - Inner content wrapper: max-w-2xl mx-auto constrains reading width
         *    and keeps it optically centred.
         *  - Added a subtle top divider line via the border-t on the section.
         * ─────────────────────────────────────────────────────────────────── */}
        <section style={{ padding: '60px 50px', maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#099F93', marginBottom: '12px' }}>
              FAQ
            </p>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#12344D', margin: 0 }}>
              Pricing questions, answered
            </h2>
          </div>

          <FaqAccordion items={faqs} />
        </section>

        {/* FINAL CTA — unchanged */}
        <div className="px-5 lg:ml-[200px]">
          <CtaBand
            title="Ready to see your number?"
            subtitle="Tell us about your pharmacy and we'll put together a tailored PharmacyPlus estimate within 24 hours — no obligation."
            primary={{ label: 'Get your estimate', href: '/contact' }}
            secondary={{ label: 'Start free trial', href: '/contact' }}
          />
        </div>

      </main>

      <Footer />
    </>
  )
}
