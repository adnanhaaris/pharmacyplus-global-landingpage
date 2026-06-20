'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/**
 * Shared navy call-to-action band with soft teal glow. Reused as the closing
 * section on every page. Supports a primary and optional secondary action.
 */
interface CtaAction {
  label: string
  href: string
}

interface CtaBandProps {
  title: string
  subtitle?: string
  primary: CtaAction
  secondary?: CtaAction
}

export default function CtaBand({ title, subtitle, primary, secondary }: CtaBandProps) {
  return (
    <section style={{ backgroundColor: '#12344D', overflow: 'hidden', position: 'relative' }}>
      {/* Ambient blobs — kept but not affecting layout */}
      <div
        aria-hidden
        style={{
          position: 'absolute', top: '-60px', right: '0',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'rgba(9,159,147,0.25)', filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', bottom: '-60px', left: '-20px',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'rgba(9,159,147,0.12)', filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div style={{
        position: 'relative',
        maxWidth: '720px',
        margin: '0 auto',
        padding: '64px 24px',
        textAlign: 'center',
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: '32px', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <p style={{
            marginTop: '16px',
            fontSize: '15px',
            lineHeight: '1.7',
            color: 'rgba(255,255,255,0.65)',
            maxWidth: '520px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            {subtitle}
          </p>
        )}

        <div style={{ marginTop: '32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          {/* Primary — teal filled */}
          <Link
            href={primary.href}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              backgroundColor: '#099F93',
              color: '#ffffff',
              padding: '11px 28px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid transparent',
              transition: 'background 0.2s',
            }}
          >
            {primary.label}
            <ArrowRight style={{ width: '16px', height: '16px' }} />
          </Link>

          {/* Secondary — outlined white */}
          {secondary && (
            <Link
              href={secondary.href}
              style={{
                display: 'inline-flex', alignItems: 'center',
                color: '#ffffff',
                padding: '11px 28px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.25)',
                backgroundColor: 'transparent',
                transition: 'background 0.2s',
              }}
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}