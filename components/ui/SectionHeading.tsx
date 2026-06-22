'use client'
import { motion } from 'framer-motion'
/**
 * Shared section heading: optional eyebrow label + title + subtitle.
 * Reuses the eyebrow / title pattern already used on the pricing page so
 * every page reads with the same rhythm. Brand colors are hardcoded hex
 * (matching the rest of the codebase) rather than theme tokens.
 */
interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`${isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'} ${className}`}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wide text-[#099F93] ">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#12344D] sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed text-[#12344D]/70 sm:text-base ${
            isCenter ? 'mx-auto max-w-2xl' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
