'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionHeading from '@/components/ui/SectionHeading'
import FaqAccordion, { type FaqItem } from '@/components/sections/FaqAccordion'
import PhoneField from '@/components/ui/PhoneField'
import { COUNTRIES } from '@/components/ui/countries'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Clock, CheckCircle2, ArrowRight, LifeBuoy } from 'lucide-react'

/**
 * Contact page — inspired by the PosBytz reference (two-column "Get in Touch"
 * with an advanced form + searchable country phone field) but restyled and
 * re-written for PharmacyPlus. Frontend only: the form validates client-side
 * and shows a success state; there is no backend submission wired up.
 *
 * NOTE: replace the office address / map query below with the real location.
 */

const OFFICE_ADDRESS = 'PharmacyPlus Global, 1 Innovation Way, Dubai, UAE'
const MAP_QUERY = encodeURIComponent(OFFICE_ADDRESS)

const infoCards = [
  { icon: Mail, label: 'Email us', value: 'info@pharmacyplus.com', href: 'mailto:info@pharmacyplus.com' },
  { icon: Phone, label: 'Call us', value: '+971 4 000 0000', href: 'tel:+97140000000' },
  { icon: Clock, label: 'Hours', value: 'Sun–Fri, 9am – 6pm GST', href: undefined },
]

const faqs: FaqItem[] = [
  { q: 'How quickly will I get a response?', a: 'We respond to all inquiries within 24 hours during business days. Priority support customers get responses within 4 hours.' },
  { q: 'What are your support hours?', a: 'Standard support runs Sunday to Friday, 9am to 6pm GST. Priority and on-site support are available for larger chains.' },
  { q: 'How do I contact sales vs. support?', a: 'Use this form for sales and general inquiries. Existing customers can reach technical support through the in-app help center for the fastest response.' },
  { q: 'Can I schedule a demo?', a: 'Yes — mention "demo" in your message and our team will arrange a walkthrough tailored to your pharmacy or chain.' },
  { q: 'Do you have a help center?', a: 'Yes. Our help center has guides, tutorials, and FAQs covering setup, billing, inventory, and more.' },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [phone, setPhone] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Frontend only — no backend. Show a success state.
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#F3FAF9] style={{ minHeight: 'calc(100vh - 64px)' }}">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#099F93]/20 blur-3xl" />
         <div
  className="relative mx-auto max-w-3xl px-6 pt-32 pb-20 text-center sm:pt-36 sm:pb-24"
  style={{
    marginTop: '70px',
    padding: '20px',
    marginLeft: '340px',
  }}
>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-[#099F93] shadow-sm">
                Contact
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#12344D] sm:text-5xl">
                Talk to our team
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#12344D]/70">
                Whether you have a question about features, pricing, or need a demo — we&apos;re
                here to help and respond within 24 hours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* GET IN TOUCH — info + form */}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Left: info */}
            <div className="lg:col-span-2">
              <SectionHeading
                eyebrow="Get in touch"
                title="We'd love to hear from you"
                subtitle="Reach out through the form or any of the channels below. Our team responds within one business day."
              />
              <div className="mt-8 space-y-4">
                {infoCards.map((c) => {
                  const Icon = c.icon
                  const body = (
                    <div className="flex items-start gap-4 rounded-2xl border border-[#12344D]/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#099F93]/10 text-[#099F93]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#12344D]/40">{c.label}</p>
                        <p className="mt-0.5 text-sm font-medium text-[#12344D]">{c.value}</p>
                      </div>
                    </div>
                  )
                  return c.href ? (
                    <a key={c.label} href={c.href} className="block">{body}</a>
                  ) : (
                    <div key={c.label}>{body}</div>
                  )
                })}
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-[#12344D]/10 bg-white p-7 shadow-sm sm:p-9">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#099F93]/10 text-[#099F93]">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-[#12344D]">Message sent</h3>
                    <p className="mt-2 max-w-sm text-sm text-[#12344D]/65">
                      Thanks for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-sm font-semibold text-[#099F93] hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="name" label="Name" required>
                        <input id="name" name="name" type="text" required placeholder="Your name" className={inputCls} />
                      </Field>
                      <Field id="email" label="Email" required>
                        <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputCls} />
                      </Field>
                      <Field id="company" label="Company Name">
                        <input id="company" name="company" type="text" placeholder="Company name (optional)" className={inputCls} />
                      </Field>
                      <Field id="country" label="Country" required>
                        <select id="country" name="country" required defaultValue="" className={`${inputCls} appearance-none`}>
                          <option value="" disabled>Select your country</option>
                          {COUNTRIES.map((c) => (
                            <option key={`${c.iso2}-${c.dial}`} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <div className="mt-5">
                      <PhoneField id="phone" name="phone" required label="Phone Number" onChange={(v) => setPhone(v)} />
                    </div>

                    <div className="mt-5">
                      <Field id="message" label="Message" required>
                        <textarea id="message" name="message" rows={4} required placeholder="How can we help you?" className={`${inputCls} resize-none`} />
                      </Field>
                    </div>

                    <button
                      type="submit"
                      className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#099F93] text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#08887e] hover:shadow-[0_10px_25px_rgba(9,159,147,0.3)]"
                    >
                      Send Message
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    {phone && <input type="hidden" name="phone_full" value={phone} />}
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* OFFICE + MAP */}
        <section className="border-y border-[#12344D]/10 bg-[#F3FAF9]">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <SectionHeading eyebrow="Visit us" title="Our office" />
                <div className="mt-6 flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#099F93]/10 text-[#099F93]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#12344D]">PharmacyPlus Global HQ</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#12344D]/65">{OFFICE_ADDRESS}</p>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-[#12344D]/10 shadow-sm">
                <iframe
                  title="Office location map"
                  src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                  className="h-[320px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ + SUPPORT */}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <SectionHeading eyebrow="FAQ" title="Common questions" align="center" />
          <div className="mt-10">
            <FaqAccordion items={faqs} />
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#12344D]/10 bg-[#F3FAF9] p-7 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#099F93]/10 text-[#099F93]">
                <LifeBuoy className="h-5 w-5" />
              </div>
              <div>
                <p className="text-base font-semibold text-[#12344D]">Prefer self-service?</p>
                <p className="text-sm text-[#12344D]/65">Browse our help center for guides, tutorials, and FAQs.</p>
              </div>
            </div>
            <a
              href="#"
              className="inline-flex h-11 flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-[#099F93] px-6 text-sm font-semibold text-white transition hover:bg-[#08887e]"
            >
              Visit Help Center
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
        
      </main>

      <Footer />
    </>
  )
}

const inputCls =
  'w-full rounded-xl border border-[#12344D]/15 bg-white px-3.5 py-3 text-sm text-[#12344D] placeholder-[#12344D]/40 outline-none transition focus:border-[#099F93] focus:ring-2 focus:ring-[#099F93]/20'

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#12344D]">
        {label}
        {required && <span className="ml-0.5 text-[#099F93]">*</span>}
      </label>
      {children}
    </div>
  )
}
