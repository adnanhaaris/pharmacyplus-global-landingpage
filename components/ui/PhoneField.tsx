'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Search, Check } from 'lucide-react'
import { COUNTRIES, DEFAULT_COUNTRY, type Country } from './countries'

/**
 * Self-contained international phone field — no external dependency.
 * Country selector with real flags (flagcdn images), dial codes, and a
 * searchable dropdown, mirroring the reference site's UX. Mobile-friendly:
 * the dropdown is full-width, scrollable, and closes on outside click / Escape.
 *
 * Exposes the composed value (e.g. "+91 98765 43210") and the selected country
 * through onChange so a parent form can read it. Frontend only — no submission.
 */
interface PhoneFieldProps {
  id?: string
  name?: string
  required?: boolean
  label?: string
  onChange?: (value: string, country: Country, nationalNumber: string) => void
}

export default function PhoneField({
  id = 'phone',
  name = 'phone',
  required = false,
  label = 'Phone Number',
  onChange,
}: PhoneFieldProps) {
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY)
  const [number, setNumber] = useState('')
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const wrapRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COUNTRIES
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.iso2.includes(q),
    )
  }, [query])

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  // Focus search when opening
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 30)
    else setQuery('')
  }, [open])

  function emit(c: Country, n: string) {
    onChange?.(`${c.dial} ${n}`.trim(), c, n)
  }

  function selectCountry(c: Country) {
    setCountry(c)
    setOpen(false)
    emit(c, number)
  }

  function onNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/[^\d\s-]/g, '')
    setNumber(val)
    emit(country, val)
  }

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#12344D]">
          {label}
          {required && <span className="ml-0.5 text-[#099F93]">*</span>}
        </label>
      )}

      <div ref={wrapRef} className="relative">
        <div className="flex rounded-xl border border-[#12344D]/15 bg-white transition focus-within:border-[#099F93] focus-within:ring-2 focus-within:ring-[#099F93]/20" style={{ padding: '10px' }}>
          {/* Country selector trigger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={`Selected country ${country.name}, dial code ${country.dial}. Change country.`}
            className="flex flex-shrink-0 items-center gap-1.5 rounded-l-xl px-3 py-3 text-sm text-[#12344D] transition hover:bg-[#F3FAF9]"
          >
            <img
              src={`https://flagcdn.com/24x18/${country.iso2}.png`}
              srcSet={`https://flagcdn.com/48x36/${country.iso2}.png 2x`}
              width={24}
              height={18}
              alt=""
              className="h-[18px] w-6 rounded-sm object-cover"
            />
            <span className="font-medium">{country.dial}</span>
            <ChevronDown
              className={`h-4 w-4 text-[#12344D]/50 transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </button>

          <span className="my-2 w-px bg-[#12344D]/10" aria-hidden />

          {/* Number input */}
          <input
            id={id}
            name={name}
            type="tel"
            inputMode="tel"
            required={required}
            value={number}
            onChange={onNumberChange}
            placeholder="Enter your mobile number"
            className="w-full rounded-r-xl bg-transparent px-3 py-3 text-sm text-[#12344D] placeholder-[#12344D]/40 outline-none"
          />
        </div>

        {/* Dropdown */}
        {open && (
          <div
            role="listbox"
            className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-xl border border-[#12344D]/10 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)]" style={{padding: '10px' }}
          >
            <div className="flex items-center gap-2 border-b border-[#12344D]/10 px-3 py-2.5">
              <Search className="h-4 w-4 flex-shrink-0 text-[#12344D]/40" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country or code"
                className="w-full bg-transparent text-sm text-[#12344D] placeholder-[#12344D]/40 outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setOpen(false)
                }}
              />
            </div>

            <ul className="max-h-64 overflow-y-auto py-1">
              {filtered.length === 0 && (
                <li className="px-4 py-3 text-sm text-[#12344D]/50">No matches</li>
              )}
              {filtered.map((c) => {
                const active = c.iso2 === country.iso2 && c.dial === country.dial
                return (
                  <li key={`${c.iso2}-${c.dial}`} role="option" aria-selected={active}>
                    <button
                      type="button"
                      onClick={() => selectCountry(c)}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-[#F3FAF9] ${
                        active ? 'bg-[#F3FAF9]' : ''
                      }`}
                    >
                      <img
                        src={`https://flagcdn.com/24x18/${c.iso2}.png`}
                        srcSet={`https://flagcdn.com/48x36/${c.iso2}.png 2x`}
                        width={24}
                        height={18}
                        alt=""
                        className="h-[18px] w-6 flex-shrink-0 rounded-sm object-cover"
                      />
                      <span className="flex-1 truncate text-[#12344D]">{c.name}</span>
                      <span className="text-[#12344D]/50">{c.dial}</span>
                      {active && <Check className="h-4 w-4 text-[#099F93]" />}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
