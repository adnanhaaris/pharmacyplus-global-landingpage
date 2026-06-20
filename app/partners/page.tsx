'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionHeading from '@/components/ui/SectionHeading'
import FaqAccordion, { type FaqItem } from '@/components/sections/FaqAccordion'
import CtaBand from '@/components/sections/CtaBand'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, BadgeDollarSign, Repeat, Layers, GraduationCap,
  Headset, Network, CheckCircle2, FileText, Award, Search, TrendingUp,
} from 'lucide-react'

/**
 * Partner page — content sourced from the PharmacyPlus Partner Program brief.
 * Sections: Hero → Benefits → Categories (Referral / Reseller / White Label)
 * → Process/Workflow → FAQ → CTA. Brand colors hardcoded to match the site.
 */

const benefits = [
  { icon: BadgeDollarSign, title: 'Earn recurring rewards', desc: 'Referral commissions and reseller margins on every successful sale, processed promptly after payment verification.' },
  { icon: GraduationCap, title: 'Free certification', desc: 'Train and get certified through PharmacyPlus University — understand the platform, workflows, and value proposition.' },
  { icon: Headset, title: 'We handle the heavy lifting', desc: 'PharmacyPlus runs demonstrations, sales, onboarding, and support so you can focus on relationships.' },
  { icon: Network, title: 'No joining fee', desc: 'There is currently no fee to apply for the Referral and Reseller programs — start growing right away.' },
  { icon: Layers, title: 'Multiple categories', desc: 'Eligible partners can participate as both a Referral and Reseller Partner, subject to approval.' },
  { icon: TrendingUp, title: 'Grow with an ecosystem', desc: 'Track opportunities, monitor commissions, and access resources through our partner ecosystem.' },
]

interface Category {
  badge: string
  title: string
  tagline: string
  bestFor: string[]
  howItWorks: string[]
  payment: string
  featured?: boolean
}

const categories: Category[] = [
  {
    badge: 'Referral',
    title: 'Referral Partner',
    tagline: 'Recommend PharmacyPlus to your network and earn rewards for successful referrals.',
    bestFor: ['Business Consultants', 'Healthcare Professionals', 'Industry Contacts', 'Business Development Professionals'],
    howItWorks: [
      'Register as a partner',
      'Complete PharmacyPlus University certification',
      'Refer qualified opportunities',
      'PharmacyPlus handles demos, sales, onboarding & support',
      'Receive referral commissions on successful sales',
    ],
    payment: 'Customer pays PharmacyPlus directly. Referral commissions are processed within 3–7 working days after payment verification.',
  },
  {
    badge: 'Reseller',
    title: 'Reseller Partner',
    tagline: 'Expand your portfolio by offering PharmacyPlus to pharmacies and healthcare organizations.',
    bestFor: ['IT Companies', 'Software Resellers', 'Technology Consultants', 'Healthcare Solution Providers'],
    howItWorks: [
      'Register and become certified',
      'Identify and sell opportunities',
      'Manage customer relationships',
      'Purchase licenses from PharmacyPlus',
      'Receive reseller pricing & commercial benefits',
    ],
    payment: 'Resellers purchase licenses from PharmacyPlus. Licenses are activated after payment confirmation.',
    featured: true,
  },
  {
    badge: 'White Label',
    title: 'White Label Partner',
    tagline: 'Launch your own branded pharmacy management solution powered by PharmacyPlus.',
    bestFor: ['Software Companies', 'Healthcare Technology Providers', 'Enterprise Solution Providers'],
    howItWorks: [
      'Offer the platform under your own brand',
      'Access dedicated commercial arrangements',
      'Accelerate market entry without building from scratch',
    ],
    payment: 'Flexible payment options available — sign up and let’s discuss.',
  },
]

const steps = [
  { icon: FileText, title: 'Apply', desc: 'Submit your partner application with your business and contact information.' },
  { icon: Award, title: 'Get Certified', desc: 'Complete PharmacyPlus University to understand the platform, workflows, features, and value proposition.' },
  { icon: Search, title: 'Refer or Resell', desc: 'Start identifying opportunities and introducing PharmacyPlus to pharmacies, providers, and pharmacy groups.' },
  { icon: TrendingUp, title: 'Grow With Us', desc: 'Track opportunities, monitor commissions, access resources, and expand through our partner ecosystem.' },
]

const faqs: FaqItem[] = [
  { q: 'Who can become a PharmacyPlus Partner?', a: 'Consultants, software companies, IT service providers, healthcare professionals, business development firms, and technology providers are welcome to apply.' },
  { q: 'Do you provide training?', a: 'Yes. We provide training and certification through PharmacyPlus University.' },
  { q: 'When are referral commissions paid?', a: 'Referral commissions are processed within 3–7 working days after customer payment has been received and verified.' },
  { q: 'How does the reseller model work?', a: 'Resellers purchase licenses from PharmacyPlus and can offer them to their customers according to the applicable commercial agreement.' },
  { q: 'Can I participate as both a Referral and a Reseller Partner?', a: 'Yes. Eligible partners may participate in multiple partnership categories subject to approval.' },
  { q: 'Is there a fee to join the partner program?', a: 'No. There is currently no fee to apply for the Referral and Reseller programs.' },
  { q: 'Is the White Label Program available to everyone?', a: 'No. White Label partnerships are reviewed individually and offered based on strategic fit and business requirements.' },
]

export default function PartnersPage() {
  return (
    <>
      <Navbar />


      <main className="bg-white pt-16">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#12344D] style={{ minHeight: 'calc(100vh - 64px)' }}>">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-[#099F93]/30 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#099F93]/15 blur-3xl" />
          <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:py-28" style={{ marginTop: '100px', marginLeft: '260px', padding: '20px' }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white">
                PharmacyPlus Partner Program
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Grow your business with PharmacyPlus
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70" style={{marginLeft: '120px', paddingBottom: '20px'}}>
                Join our global partner network and help pharmacies transform their operations
                with a modern pharmacy management platform.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex h-[50px] w-[180px] items-center justify-center gap-2 rounded-xl bg-[#099F93] px-7 py-[11px] text-[14px] font-semibold text-white hover:bg-[#08887e]"
                  style={{
                    boxShadow: '0 4px 14px rgba(9,159,147,0.35)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Apply Now
                  <ArrowRight className="h-[15px] w-[15px]" />
                </Link>
                <a
                  href="#categories"
                  className="inline-flex h-11 h-[50px] w-[180px] items-center justify-center gap-2 rounded-xl border border-white/20 px-8 text-[14px] font-semibold text-white transition hover:bg-white/10"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BENEFITS */}
        <section style={{ maxWidth: '1152px', margin: '0 auto', padding: '40px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#12344D',
              margin: 0,
            }}>
              Built to reward the partners who grow with us
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}>
            {benefits.map((b, i) => {
              const Icon = b.icon
              const cardStyle: React.CSSProperties = {
                borderRadius: '16px',
                border: '1px solid rgba(18,52,77,0.10)',
                backgroundColor: '#ffffff',
                padding: '28px',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }
              const iconWrapStyle: React.CSSProperties = {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: 'rgba(9,159,147,0.10)',
                color: '#099F93',
                marginBottom: '16px',
              }
              const titleStyle: React.CSSProperties = {
                fontSize: '15px',
                fontWeight: 600,
                color: '#12344D',
                margin: '0 0 8px 0',
              }
              const descStyle: React.CSSProperties = {
                fontSize: '13px',
                lineHeight: 1.65,
                color: 'rgba(18,52,77,0.60)',
                margin: 0,
              }

              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  style={cardStyle}
                >
                  <div style={iconWrapStyle}>
                    <Icon style={{ width: '18px', height: '18px' }} />
                  </div>
                  <h3 style={titleStyle}>{b.title}</h3>
                  <p style={descStyle}>{b.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* CATEGORIES */}
        <section
          id="categories"
          style={{ borderTop: '1px solid rgba(18,52,77,0.10)', borderBottom: '1px solid rgba(18,52,77,0.10)', backgroundColor: '#F3FAF9' }}
        >
          <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '80px 24px' }}>

            {/* Heading */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#12344D', margin: 0 }}>
                Choose the partnership that fits you
              </h2>
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'start' }}>
              {categories.map((cat, i) => {
                const Icon = cat.icon

                const cardStyle: React.CSSProperties = {
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  border: cat.featured ? '1.5px solid #099F93' : '1px solid rgba(18,52,77,0.10)',
                  boxShadow: cat.featured ? '0 0 0 3px rgba(9,159,147,0.12)' : '0 1px 4px rgba(0,0,0,0.05)',
                  backgroundColor: '#ffffff',
                  padding: '28px',
                }

                const badgeStyle: React.CSSProperties = {
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(9,159,147,0.10)',
                  padding: '4px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#099F93',
                  width: 'fit-content',
                }

                const sectionLabelStyle: React.CSSProperties = {
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(18,52,77,0.40)',
                  margin: '0 0 8px 0',
                }

                const listItemStyle: React.CSSProperties = {
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontSize: '13px',
                  color: 'rgba(18,52,77,0.75)',
                  marginBottom: '6px',
                }

                const numberStyle: React.CSSProperties = {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(9,159,147,0.15)',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#099F93',
                  flexShrink: 0,
                  marginTop: '2px',
                }

                const paymentBoxStyle: React.CSSProperties = {
                  marginTop: '20px',
                  borderRadius: '10px',
                  backgroundColor: '#F3FAF9',
                  padding: '14px',
                }

                const ctaStyle: React.CSSProperties = {
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#099F93',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#ffffff',
                  textDecoration: 'none',
                }

                return (
                  <motion.div
                    key={cat.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                    style={cardStyle}
                  >
                    {/* Popular badge */}
                    {cat.featured && (
                      <span style={{
                        position: 'absolute',
                        top: '-12px',
                        right: '20px',
                        borderRadius: '999px',
                        backgroundColor: '#099F93',
                        padding: '3px 12px',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#ffffff',
                      }}>
                        Popular
                      </span>
                    )}

                    {/* Badge */}
                    <span style={badgeStyle}>{cat.badge}</span>

                    {/* Title */}
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#12344D', margin: '14px 0 6px' }}>
                      {cat.title}
                    </h3>

                    {/* Tagline */}
                    <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'rgba(18,52,77,0.60)', margin: 0 }}>
                      {cat.tagline}
                    </p>

                    {/* Best For */}
                    <div style={{ marginTop: '20px' }}>
                      <p style={sectionLabelStyle}>Best For</p>
                      {cat.bestFor.map((b) => (
                        <div key={b} style={listItemStyle}>
                          <CheckCircle2 style={{ width: '14px', height: '14px', color: '#099F93', flexShrink: 0, marginTop: '2px' }} />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                    {/* How It Works */}
                    <div style={{ marginTop: '20px' }}>
                      <p style={sectionLabelStyle}>How It Works</p>
                      {cat.howItWorks.map((h, idx) => (
                        <div key={h} style={listItemStyle}>
                          <span style={numberStyle}>{idx + 1}</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Payment */}
                    <div style={paymentBoxStyle}>
                      <p style={sectionLabelStyle}>Payment Model</p>
                      <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'rgba(18,52,77,0.65)', margin: 0 }}>
                        {cat.payment}
                      </p>
                    </div>

                    {/* CTA */}
                    <Link href="/contact" style={ctaStyle}>
                      Apply as {cat.badge}
                      <ArrowRight style={{ width: '15px', height: '15px' }} />
                    </Link>

                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* PROCESS / WORKFLOW */}
        <section style={{ maxWidth: '1152px', margin: '0 auto', padding: '40px 24px' }}>

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#12344D', margin: 0 }}>
              Four steps to start growing
            </h2>
          </div>

          {/* 4-col grid */}
          <div
            className="steps-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}
          >
            {steps.map((s, i) => {
              const Icon = s.icon

              const cardStyle: React.CSSProperties = {
                position: 'relative',
                borderRadius: '16px',
                border: '1px solid rgba(18,52,77,0.10)',
                backgroundColor: '#ffffff',
                padding: '28px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }

              const stepNumStyle: React.CSSProperties = {
                fontSize: '28px',
                fontWeight: 700,
                color: 'rgba(9,159,147,0.20)',
                lineHeight: 1,
                marginBottom: '10px',
              }

              const iconWrapStyle: React.CSSProperties = {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: 'rgba(9,159,147,0.10)',
                color: '#099F93',
                marginBottom: '16px',
              }

              const titleStyle: React.CSSProperties = {
                fontSize: '15px',
                fontWeight: 600,
                color: '#12344D',
                margin: '0 0 8px 0',
              }

              const descStyle: React.CSSProperties = {
                fontSize: '13px',
                lineHeight: 1.65,
                color: 'rgba(18,52,77,0.60)',
                margin: 0,
              }

              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={cardStyle}
                >
                  <div style={stepNumStyle}>0{i + 1}</div>

                  <div style={iconWrapStyle}>
                    <Icon style={{ width: '18px', height: '18px' }} />
                  </div>

                  <h3 style={titleStyle}>{s.title}</h3>
                  <p style={descStyle}>{s.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ borderTop: '1px solid rgba(18,52,77,0.10)', backgroundColor: '#F3FAF9' }}>
          <div style={{ maxWidth: '950px', margin: '0 auto', padding: '40px 24px' }}>

            {/* Heading */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <p style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#099F93',
                margin: '0 0 10px 0',
              }}>
                FAQ
              </p>
              <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#12344D', margin: 0 }}>
                Partner program questions
              </h2>
            </div>

            <FaqAccordion items={faqs} />
          </div>
        </section>

        {/* CTA */}
        <CtaBand
          title="Ready to grow with PharmacyPlus?"
          subtitle="Apply to the partner program today. No joining fee for Referral and Reseller partners."
          primary={{ label: 'Apply Now', href: '/contact' }}
        />
      </main>

      <Footer />
    </>
  )
}
