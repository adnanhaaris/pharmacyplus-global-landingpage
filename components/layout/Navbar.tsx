'use client'
import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, Layers, GitBranch, ShoppingBag, Truck, ShoppingCart,
  Hospital, HeartPulse, Shield, Star, ClipboardCheck, UserPlus,
  BadgeDollarSign, Wrench, Globe, Heart,
  CreditCard, Package, Wallet, BarChart3, Briefcase,
  Warehouse, Settings, Tag, Gift, MapPin, Users,
  ChevronDown, Plus, Menu, X,
} from 'lucide-react'

interface NavItem {
  label: string
  desc: string
  icon: React.ElementType
  tag?: string
  href?: string
}
interface NavColumn {
  heading: string
  items: NavItem[]
}
interface NavMenuData {
  columns: NavColumn[]
}

const MENUS: Record<string, NavMenuData> = {
  Solutions: {
    columns: [
      {
        heading: 'Retail & Chain',
        items: [
          { label: 'Retail Pharmacy Software', icon: Home, desc: 'Complete billing, POS & dispensing' },
          { label: 'Pharmacy Chain ERP', icon: Layers, desc: 'Multi-outlet centralised control' },
          { label: 'Multi-branch Pharmacy System', icon: GitBranch, desc: 'Seamless branch synchronisation', tag: 'Popular' },
          { label: 'Medical Store Management', icon: ShoppingBag, desc: 'Smart stock & sales management' },
        ],
      },
      {
        heading: 'Enterprise & Healthcare',
        items: [
          { label: 'Hospital Pharmacy Management', icon: Hospital, desc: 'Integrated with HMIS workflows' },
          { label: 'Healthcare Retail ERP', icon: HeartPulse, desc: 'Unified retail health platform', tag: 'New' },
          { label: 'Distribution & Warehouse ERP', icon: Truck, desc: 'End-to-end supply chain' },
          { label: 'eCommerce Pharmacy Platform', icon: ShoppingCart, desc: 'Online ordering & delivery' },
        ],
      },
    ],
  },

  Partners: {
    columns: [
      {
        heading: 'Get Started',
        items: [
          { label: 'Introduction to Partner Program', icon: Shield, desc: 'Program overview & scope', href: '/partners' },
          { label: 'Partnership Benefits', icon: Star, desc: 'Revenue share & perks', tag: 'Popular', href: '/partners' },
          { label: 'Requirements', icon: ClipboardCheck, desc: 'Eligibility & checklist', href: '/partners' },
          { label: 'Onboarding Process', icon: UserPlus, desc: 'Step-by-step guide', href: '/partners' },
        ],
      },
      {
        heading: 'Partner Types',
        items: [
          { label: 'Reseller Partner', icon: BadgeDollarSign, desc: 'Sell & earn recurring revenue', href: '/partners' },
          { label: 'Implementation Partner', icon: Wrench, desc: 'Deploy & configure solutions', href: '/partners' },
          { label: 'Country Distributor', icon: Globe, desc: 'Exclusive regional rights', tag: 'New', href: '/partners' },
          { label: 'White-Label Partner', icon: Heart, desc: 'Brand as your own product', href: '/partners' },
        ],
      },
    ],
  },

  Features: {
    columns: [
      {
        heading: 'Core Operations',
        items: [
          { label: 'POS & Billing', icon: CreditCard, desc: 'Fast, accurate point of sale' },
          { label: 'Inventory Management', icon: Package, desc: 'Real-time stock control', tag: 'Popular' },
          { label: 'Financial Management', icon: Wallet, desc: 'Accounts, GST & reporting' },
          { label: 'Analytics & Reporting', icon: BarChart3, desc: 'Data-driven decisions' },
          { label: 'Offers & Promotions', icon: Tag, desc: 'Flexible discount engine' },
          { label: 'Customer Management', icon: Users, desc: 'Profiles, loyalty & history' },
        ],
      },
      {
        heading: 'Advanced & Enterprise',
        items: [
          { label: 'Enterprise Features', icon: Briefcase, desc: 'Scalable multi-entity tools', tag: 'New' },
          { label: 'Warehouse & Supply Chain', icon: Warehouse, desc: 'Procurement to delivery' },
          { label: 'Administration & Control', icon: Settings, desc: 'Roles, permissions & audit' },
          { label: 'Incentives Management', icon: Gift, desc: 'Staff & loyalty incentives' },
          { label: 'Country-specific Integrations', icon: MapPin, desc: 'Local compliance built-in' },
        ],
      },
    ],
  },
}

const LINKS: Record<string, string> = {
  Pricing: '/pricing',
  Blog: '#',
  Contact: '/contact',
}

const NAV = ['Solutions', 'Partners', 'Features', 'Pricing', 'Blog', 'Contact']

const ICON_COLORS: Record<string, { bg: string; color: string }> = {
  Home: { bg: '#EFF6FF', color: '#3B82F6' },
  Layers: { bg: '#F0FDF4', color: '#22C55E' },
  GitBranch: { bg: '#FFF7ED', color: '#F97316' },
  ShoppingBag: { bg: '#FDF4FF', color: '#A855F7' },
  Hospital: { bg: '#FFF1F2', color: '#F43F5E' },
  HeartPulse: { bg: '#ECFDF5', color: '#10B981' },
  Truck: { bg: '#FFFBEB', color: '#F59E0B' },
  ShoppingCart: { bg: '#EFF6FF', color: '#6366F1' },
  Shield: { bg: '#F0FDF4', color: '#22C55E' },
  Star: { bg: '#FFFBEB', color: '#F59E0B' },
  ClipboardCheck: { bg: '#EFF6FF', color: '#3B82F6' },
  UserPlus: { bg: '#FDF4FF', color: '#A855F7' },
  BadgeDollarSign: { bg: '#ECFDF5', color: '#10B981' },
  Wrench: { bg: '#FFF7ED', color: '#F97316' },
  Globe: { bg: '#EFF6FF', color: '#6366F1' },
  Heart: { bg: '#FFF1F2', color: '#F43F5E' },
  CreditCard: { bg: '#EFF6FF', color: '#3B82F6' },
  Package: { bg: '#FFF7ED', color: '#F97316' },
  Wallet: { bg: '#F0FDF4', color: '#22C55E' },
  BarChart3: { bg: '#ECFDF5', color: '#10B981' },
  Briefcase: { bg: '#FDF4FF', color: '#A855F7' },
  Warehouse: { bg: '#FFFBEB', color: '#F59E0B' },
  Settings: { bg: '#F1F5F9', color: '#64748B' },
  Tag: { bg: '#FFF1F2', color: '#F43F5E' },
  Gift: { bg: '#EFF6FF', color: '#6366F1' },
  MapPin: { bg: '#FDF4FF', color: '#A855F7' },
  Users: { bg: '#F0FDF4', color: '#22C55E' },
}

function getIconStyle(icon: React.ElementType) {
  const name = (icon as { displayName?: string; name?: string }).displayName
    ?? (icon as { name?: string }).name ?? ''
  return ICON_COLORS[name] ?? { bg: '#F1F5F9', color: '#099F93' }
}

function MegaDropdown({ menuKey }: { menuKey: string }) {
  const data = MENUS[menuKey]
  if (!data) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.16, ease: [0.25, 1, 0.5, 1] }}
      className="fixed inset-x-0 top-16 z-50 w-full"
    >
      <div
        className="w-full bg-white"
        style={{
          borderTop: '1px solid #e5e7eb',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
        }}
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8" style={{ marginLeft: '450px' }}>
          <div
            className="grid py-10"
            style={{ gridTemplateColumns: `repeat(${data.columns.length}, minmax(0, 1fr))` }}
          >
            {data.columns.map((col) => (
              <div key={col.heading}>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: '#9ca3af' }}>
                  {col.heading}
                </p>
                <ul className="space-y-3">
                  {col.items.map((item, i) => {
                    const Icon = item.icon
                    const { bg, color } = getIconStyle(Icon)
                    return (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03, duration: 0.14 }}
                      >
                        <Link
                          href={item.href ?? '#'}
                          className="group flex items-start gap-3 rounded-2xl px-3 py-3 transition-all duration-200 hover:bg-[#f8fafc]" style={{ padding: '10px' }}
                        >
                          <div
                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl transition-transform duration-150 group-hover:scale-110"
                            style={{ background: bg }}
                          >
                            <Icon size={16} strokeWidth={1.8} color={color} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className="text-[13.5px] font-semibold leading-tight transition-colors duration-150 group-hover:text-[#099F93]"
                                style={{ color: '#111827' }}
                              >
                                {item.label}
                              </span>
                              {item.tag && (
                                <span
                                  className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                                  style={{
                                    background: item.tag === 'New' ? '#eff6ff' : '#fef3c7',
                                    color: item.tag === 'New' ? '#3b82f6' : '#d97706',
                                  }}
                                >
                                  {item.tag.toUpperCase()}
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 text-[12px] leading-tight" style={{ color: '#6b7280' }}>
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 top-16 z-40 lg:hidden"
    >
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <motion.nav
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -12, opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
        className="absolute inset-x-0 top-0 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-gray-200 bg-white px-5 pb-8 pt-4 shadow-xl"
      >
        <ul className="space-y-1">
          {NAV.map((key) => {
            const menu = MENUS[key]
            if (menu) {
              const isOpen = expanded === key
              return (
                <li key={key} className="border-b border-gray-100">
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : key)}
                    className="flex w-full items-center justify-between py-3.5 text-[15px] font-semibold text-[#12344D]"
                    aria-expanded={isOpen}
                  >
                    {key}
                    <ChevronDown
                      className={`h-4 w-4 text-[#099F93] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 pb-4">
                          {menu.columns.map((col) => (
                            <div key={col.heading}>
                              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                                {col.heading}
                              </p>
                              <ul className="space-y-0.5">
                                {col.items.map((item) => (
                                  <li key={item.label}>
                                    <Link
                                      href={item.href ?? '#'}
                                      onClick={onClose}
                                      className="block rounded-lg px-2 py-2 text-sm text-[#12344D]/80 transition hover:bg-[#F3FAF9] hover:text-[#099F93]"
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            }
            return (
              <li key={key} className="border-b border-gray-100">
                <Link
                  href={LINKS[key] ?? '#'}
                  onClick={onClose}
                  className="block py-3.5 text-[15px] font-semibold text-[#12344D]"
                >
                  {key}
                </Link>
              </li>
            )
          })}
        </ul>

        <Link
          href="/partners"
          onClick={onClose}
          className="mt-6 flex h-11 w-full items-center justify-center rounded-md bg-[#099F93] text-[14px] font-semibold text-white transition hover:bg-[#08887e]"
        >
          Be a Partner
        </Link>
      </motion.nav>
    </motion.div>
  )
}

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const enter = useCallback((key: string) => {
    if (timer.current) clearTimeout(timer.current)
    setActive(key)
  }, [])

  const leave = useCallback(() => {
    timer.current = setTimeout(() => setActive(null), 80)
  }, [])

  return (
    <>
      <header
        className="fixed left-0 top-0 z-50 h-[var(--header-height)] w-full"
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: active ? '0 1px 0 #e5e7eb' : 'none',
        }}
        onMouseLeave={leave}
      >
        {/* Full-width flex row, padded on sides */}
       <div className="flex h-16 w-full items-center px-6 lg:px-12">

          {/* Logo */}
          <div className="nav-logo-section flex-none" style={{ width: '220px', display: 'flex', justifyContent: 'flex-end' }}>
            <Link href="/" className="flex flex-shrink-0 items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: '#099F93' }}>
                <Plus size={16} color="white" strokeWidth={2.8} />
              </span>
              <span className="text-[16px] font-bold" style={{ color: '#12344D' }}>
                Pharmacy<span style={{ color: '#099F93' }}>Plus</span>
              </span>
            </Link>
          </div>

          {/* Nav — flex-1 with true center */}
          <nav className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-8">
              {NAV.map((key) => {
                if (LINKS[key]) {
                  return (
                    <li key={key}>
                      <Link
                        href={LINKS[key]}
                        className="rounded-lg px-4 py-2 text-[15px] font-medium transition-colors duration-150 hover:text-[#099F93]"
                        style={{ color: '#374151' }}
                      >
                        {key}
                      </Link>
                    </li>
                  )
                }
                const hasDrop = !!MENUS[key]
                const isOn = active === key
                return (
                  <li key={key} className="relative" onMouseEnter={() => enter(key)}>
                    <button
                      className="flex cursor-pointer items-center gap-1 rounded-lg px-4 py-2 text-[15px] font-medium transition-colors duration-150"
                      style={{ color: isOn ? '#099F93' : '#374151' }}
                    >
                      {key}
                      {hasDrop && (
                        <motion.span className="flex" animate={{ rotate: isOn ? 180 : 0 }} transition={{ duration: 0.18 }}>
                          <ChevronDown size={14} strokeWidth={2} color={isOn ? '#099F93' : '#9ca3af'} />
                        </motion.span>
                      )}
                    </button>
                    <AnimatePresence>
                      {isOn && hasDrop && <MegaDropdown menuKey={key} />}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Right: CTA + hamburger */}
          <div className="flex-none" style={{ width: '220px', display: 'flex', justifyContent: 'flex-start' }}>
            <div className="hidden lg:flex">
              <motion.div
                whileHover={{ scale: 1.03, y: -2, boxShadow: '0 10px 25px rgba(9,159,147,0.28)' }}
                whileTap={{ scale: 0.98 }}
                className="rounded-md"
              >
                <Link
                  href="/partners"
                  className="flex h-10 min-w-[150px] items-center justify-center rounded-md text-[14px] font-semibold text-white transition-all duration-200"
                  style={{ background: '#099F93' }}
                >
                  Be a Partner
                </Link>
              </motion.div>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-[#12344D] transition hover:bg-[#F3FAF9] lg:hidden"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-40 hidden lg:block"
            style={{ background: 'rgba(0,0,0,0.08)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
