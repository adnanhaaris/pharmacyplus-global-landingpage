'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * Shared FAQ accordion. Lifted from the inline version that lived (commented
 * out) on the pricing page so Pricing / Partners / Contact all share one
 * accessible, animated accordion. Single-open behavior; first item open.
 */
export interface FaqItem {
  q: string
  a: string
}

interface FaqAccordionProps {
  items: FaqItem[]
  className?: string
}

export default function FaqAccordion({ items, className = '' }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className={className} style={{ borderTop: '1px solid rgba(18,52,77,0.10)' }}>
      {items.map((item, i) => {
        const open = openIndex === i
        return (
          <div key={item.q} style={{ borderBottom: '1px solid rgba(18,52,77,0.10)' }}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-4 text-left"
              style={{ padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}
              aria-expanded={open}
            >
              <span style={{ fontSize: '15px', fontWeight: 500, color: '#12344D' }}>
                {item.q}
              </span>
              <ChevronDown
                style={{
                  width: '18px',
                  height: '18px',
                  flexShrink: 0,
                  color: '#099F93',
                  transition: 'transform 0.2s',
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p style={{ paddingBottom: '20px', fontSize: '14px', lineHeight: '1.7', color: 'rgba(18,52,77,0.65)', margin: 0 }}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
