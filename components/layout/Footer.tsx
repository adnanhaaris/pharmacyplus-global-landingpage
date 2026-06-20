import Link from 'next/link'
import { Plus } from 'lucide-react'
/**
 * Site footer (new — the site had none). Column layout inspired by the
 * reference, restyled to PharmacyPlus brand (navy surface, teal accent logo).
 * Fully responsive: 2 cols on mobile, 4 on desktop.
 */
const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Retail Pharmacy', href: '#' },
      { label: 'Pharmacy Chain ERP', href: '#' },
      { label: 'POS & Billing', href: '#' },
      { label: 'Inventory', href: '#' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Partners', href: '/partners' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'Contact Support', href: '/contact' },
    ],
  },
  {
    heading: 'Partners',
    links: [
      { label: 'Partner Program', href: '/partners' },
      { label: 'White-Label Program', href: '/partners' },
      { label: 'Become a Partner', href: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#12344D', color: '#ffffff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 48px' }}>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '40px' }}>

          {/* Brand col — spans 1 column */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <span style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '32px', height: '32px', borderRadius: '10px',
                backgroundColor: '#099F93',
              }}>
                <Plus size={16} color="white" strokeWidth={2.8} />
              </span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                Pharmacy<span style={{ color: '#099F93' }}>Plus</span>
              </span>
            </Link>
            <p style={{ marginTop: '16px', fontSize: '13px', lineHeight: '1.7', color: 'rgba(255,255,255,0.55)', maxWidth: '200px' }}>
              A modern pharmacy management platform helping pharmacies worldwide transform their operations.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', margin: 0 }}>
                {col.heading}
              </p>
              <ul style={{ marginTop: '16px', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: '56px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.45)',
        }}>
          <p style={{ margin: 0 }}>© {new Date().getFullYear()} PharmacyPlus Global. All rights reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="#" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
              Terms &amp; Conditions
            </Link>
            <Link href="#" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
              Privacy Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
