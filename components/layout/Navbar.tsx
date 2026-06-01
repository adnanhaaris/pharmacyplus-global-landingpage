'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, Layers, GitBranch, ShoppingBag, Truck, ShoppingCart,
  Hospital, HeartPulse, Shield, Star, ClipboardCheck, UserPlus,
  BadgeDollarSign, Wrench, Globe, Heart,
  CreditCard, Package, Wallet, BarChart3, Briefcase,
  Warehouse, Settings, Tag, Gift, MapPin, Users,
  ChevronDown, Plus, ArrowRight,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavItem {
  label: string
  desc: string
  icon: React.ElementType
  tag?: string
}
interface NavColumn {
  heading: string
  items: NavItem[]
}
interface NavMenuData {
  columns: NavColumn[]
}

// ─── Menu Data ────────────────────────────────────────────────────────────────
const MENUS: Record<string, NavMenuData> = {
  Solutions: {
    columns: [
      {
        heading: 'Retail & Chain',
        items: [
          { label: 'Retail Pharmacy Software',     icon: Home,         desc: 'Complete billing, POS & dispensing' },
          { label: 'Pharmacy Chain ERP',            icon: Layers,       desc: 'Multi-outlet centralised control' },
          { label: 'Multi-branch Pharmacy System',  icon: GitBranch,    desc: 'Seamless branch synchronisation',  tag: 'Popular' },
          { label: 'Medical Store Management',      icon: ShoppingBag,  desc: 'Smart stock & sales management' },
        ],
      },
      {
        heading: 'Enterprise & Healthcare',
        items: [
          { label: 'Hospital Pharmacy Management',  icon: Hospital,     desc: 'Integrated with HMIS workflows' },
          { label: 'Healthcare Retail ERP',         icon: HeartPulse,   desc: 'Unified retail health platform',  tag: 'New' },
          { label: 'Distribution & Warehouse ERP',  icon: Truck,        desc: 'End-to-end supply chain' },
          { label: 'eCommerce Pharmacy Platform',   icon: ShoppingCart, desc: 'Online ordering & delivery' },
        ],
      },
    ],
  },

  Partners: {
    columns: [
      {
        heading: 'Get Started',
        items: [
          { label: 'Introduction to Partner Program', icon: Shield,         desc: 'Program overview & scope' },
          { label: 'Partnership Benefits',             icon: Star,           desc: 'Revenue share & perks',    tag: 'Popular' },
          { label: 'Requirements',                     icon: ClipboardCheck, desc: 'Eligibility & checklist' },
          { label: 'Onboarding Process',               icon: UserPlus,       desc: 'Step-by-step guide' },
        ],
      },
      {
        heading: 'Partner Types',
        items: [
          { label: 'Reseller Partner',       icon: BadgeDollarSign, desc: 'Sell & earn recurring revenue' },
          { label: 'Implementation Partner', icon: Wrench,          desc: 'Deploy & configure solutions' },
          { label: 'Country Distributor',    icon: Globe,           desc: 'Exclusive regional rights',    tag: 'New' },
          { label: 'White-Label Partner',    icon: Heart,           desc: 'Brand as your own product' },
        ],
      },
    ],
  },

  Features: {
    columns: [
      {
        heading: 'Core Operations',
        items: [
          { label: 'POS & Billing',          icon: CreditCard, desc: 'Fast, accurate point of sale' },
          { label: 'Inventory Management',   icon: Package,    desc: 'Real-time stock control',       tag: 'Popular' },
          { label: 'Financial Management',   icon: Wallet,     desc: 'Accounts, GST & reporting' },
          { label: 'Analytics & Reporting',  icon: BarChart3,  desc: 'Data-driven decisions' },
          { label: 'Offers & Promotions',    icon: Tag,        desc: 'Flexible discount engine' },
          { label: 'Customer Management',    icon: Users,      desc: 'Profiles, loyalty & history' },
        ],
      },
      {
        heading: 'Advanced & Enterprise',
        items: [
          { label: 'Enterprise Features',            icon: Briefcase, desc: 'Scalable multi-entity tools', tag: 'New' },
          { label: 'Warehouse & Supply Chain',       icon: Warehouse, desc: 'Procurement to delivery' },
          { label: 'Administration & Control',       icon: Settings,  desc: 'Roles, permissions & audit' },
          { label: 'Incentives Management',          icon: Gift,      desc: 'Staff & loyalty incentives' },
          { label: 'Country-specific Integrations',  icon: MapPin,    desc: 'Local compliance built-in' },
        ],
      },
    ],
  },
}

// ─── Icon colour map — each icon gets its own tint like FeedHive ──────────────
const ICON_COLORS: Record<string, { bg: string; color: string }> = {
  Home:          { bg: '#EFF6FF', color: '#3B82F6' },
  Layers:        { bg: '#F0FDF4', color: '#22C55E' },
  GitBranch:     { bg: '#FFF7ED', color: '#F97316' },
  ShoppingBag:   { bg: '#FDF4FF', color: '#A855F7' },
  Hospital:      { bg: '#FFF1F2', color: '#F43F5E' },
  HeartPulse:    { bg: '#ECFDF5', color: '#10B981' },
  Truck:         { bg: '#FFFBEB', color: '#F59E0B' },
  ShoppingCart:  { bg: '#EFF6FF', color: '#6366F1' },
  Shield:        { bg: '#F0FDF4', color: '#22C55E' },
  Star:          { bg: '#FFFBEB', color: '#F59E0B' },
  ClipboardCheck:{ bg: '#EFF6FF', color: '#3B82F6' },
  UserPlus:      { bg: '#FDF4FF', color: '#A855F7' },
  BadgeDollarSign:{ bg: '#ECFDF5', color: '#10B981' },
  Wrench:        { bg: '#FFF7ED', color: '#F97316' },
  Globe:         { bg: '#EFF6FF', color: '#6366F1' },
  Heart:         { bg: '#FFF1F2', color: '#F43F5E' },
  CreditCard:    { bg: '#EFF6FF', color: '#3B82F6' },
  Package:       { bg: '#FFF7ED', color: '#F97316' },
  Wallet:        { bg: '#F0FDF4', color: '#22C55E' },
  BarChart3:     { bg: '#ECFDF5', color: '#10B981' },
  Briefcase:     { bg: '#FDF4FF', color: '#A855F7' },
  Warehouse:     { bg: '#FFFBEB', color: '#F59E0B' },
  Settings:      { bg: '#F1F5F9', color: '#64748B' },
  Tag:           { bg: '#FFF1F2', color: '#F43F5E' },
  Gift:          { bg: '#EFF6FF', color: '#6366F1' },
  MapPin:        { bg: '#FDF4FF', color: '#A855F7' },
  Users:         { bg: '#F0FDF4', color: '#22C55E' },
}

function getIconStyle(icon: React.ElementType) {
  const name = (icon as { displayName?: string; name?: string }).displayName
    ?? (icon as { name?: string }).name ?? ''
  return ICON_COLORS[name] ?? { bg: '#F1F5F9', color: '#099F93' }
}

// ─── Mega Dropdown ────────────────────────────────────────────────────────────
function MegaDropdown({ menuKey }: { menuKey: string }) {
  const data = MENUS[menuKey]
  if (!data) return null

  return (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 4 }}
    transition={{ duration: 0.16, ease: [0.25, 1, 0.5, 1] }}
    className="fixed inset-x-0 top-[64px] z-50 w-full"
  >
    {/* Full Width Background */}
    <div
      className="w-full bg-white"
      style={{
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
      }}
    >
      {/* Centered Content */}
      <div className="max-w-7xl mx-auto px-6" style={{ marginLeft: '300px' }}>

        <div
          className="px-12 py-10 grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${data.columns.length}, minmax(0, 1fr))`,
          }}
        >
          {data.columns.map((col) => (
            <div key={col.heading}>
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-4"
                style={{ color: '#9ca3af' }}
              >
                {col.heading}
              </p>

              <ul className="space-y-1">
                {col.items.map((item, i) => {
                  const Icon = item.icon
                  const { bg, color } = getIconStyle(Icon)

                  return (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.03,
                        duration: 0.14,
                      }}
                    >
                      <a
                        href="#"
                        className="group flex items-start gap-3 px-3 py-3 rounded-2xl transition-all duration-200 hover:bg-[#f8fafc]"
                      >
                        <div
                          className="w-11 h-11 rounded-2xl flex-shrink-0 flex items-center justify-center transition-transform duration-150 group-hover:scale-110"
                          style={{ background: bg }}
                        >
                          <Icon
                            size={16}
                            strokeWidth={1.8}
                            color={color}
                          />
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
                                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                                style={{
                                  background:
                                    item.tag === 'New'
                                      ? '#eff6ff'
                                      : '#fef3c7',
                                  color:
                                    item.tag === 'New'
                                      ? '#3b82f6'
                                      : '#d97706',
                                }}
                              >
                                {item.tag.toUpperCase()}
                              </span>
                            )}
                          </div>

                          <p
                            className="text-[12px] mt-0.5 leading-tight"
                            style={{ color: '#6b7280' }}
                          >
                            {item.desc}
                          </p>
                        </div>
                      </a>
                    </motion.li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        {/* <div
          className="px-6 py-3 flex items-center justify-between"
          style={{
            background: '#f9fafb',
            borderTop: '1px solid #f3f4f6',
          }}
        >
          <p
            className="text-[12px]"
            style={{ color: '#9ca3af' }}
          >
            {menuKey === 'Solutions' &&
              'Serving 2,000+ pharmacies worldwide'}
            {menuKey === 'Partners' &&
              'Join 120+ partners across 30 countries'}
            {menuKey === 'Features' &&
              '50+ enterprise features in one platform'}
          </p>

          <a
            href="#"
            className="flex items-center gap-1 text-[12px] font-semibold hover:opacity-80"
            style={{ color: '#099F93' }}
          >
            View all {menuKey.toLowerCase()}
            <ArrowRight size={12} />
          </a>
        </div> */}

      </div>
    </div>
  </motion.div>
)
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [active, setActive] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const enter = useCallback((key: string) => {
    if (timer.current) clearTimeout(timer.current)
    setActive(key)
  }, [])

  const leave = useCallback(() => {
    timer.current = setTimeout(() => setActive(null), 80)
  }, [])

  const NAV = ['Solutions', 'Partners', 'Features', 'Blog']

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50"
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: active ? '0 1px 0 #e5e7eb' : 'none',
        }}
        onMouseLeave={leave}
      >
       <div className="max-w-7xl mx-auto pl-[100px] pr-[100px] flex items-center h-[64px]"  style={{ marginLeft: '120px' }}>

          {/* ── Logo ── */}
          <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: '#099F93' }}
            >
              <Plus size={16} color="white" strokeWidth={2.8} />
            </div>
            <span className="text-[16px] font-bold" style={{ color: '#12344D' }}>
              Pharmacy<span style={{ color: '#099F93' }}>Plus</span>
            </span>
          </a>

          {/* ── Centered nav ── */}
          <nav className="flex-1 flex items-center justify-center">
            <ul className="flex items-center gap-0.5">
              {NAV.map((key) => {
                const hasDrop = !!MENUS[key]
                const isOn = active === key
                return (
                  <li key={key} className="relative" onMouseEnter={() => enter(key)}>
                    <button
                      className="flex items-center gap-1 px-4 py-2 rounded-lg text-[15px] font-medium transition-colors duration-150 cursor-pointer"
                      style={{ color: isOn ? '#099F93' : '#374151' }}
                    >
                      {key}
                      {hasDrop && (
                        <motion.span
                          className="flex"
                          animate={{ rotate: isOn ? 180 : 0 }}
                          transition={{ duration: 0.18 }}
                        >
                          <ChevronDown
                            size={14}
                            strokeWidth={2}
                            color={isOn ? '#099F93' : '#9ca3af'}
                          />
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

          {/* ── Right CTAs ── */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <motion.a
                href="#"
                whileHover={{
                  scale: 1.03,
                  y: -2,
                  boxShadow: '0 10px 25px rgba(9,159,147,0.28)',
                }}
                whileTap={{ scale: 0.98 }}
                className="h-10 min-w-[150px] rounded-md text-[14px] font-semibold text-white flex items-center justify-center transition-all duration-200"
                style={{ background: '#099F93' }}
              >
                Be a Partner
            </motion.a>
          </div>

        </div>
      </header>

      {/* Subtle page overlay when menu open */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-40 pointer-events-none"
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
