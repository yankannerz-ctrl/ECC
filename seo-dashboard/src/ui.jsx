import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

// ---- Card shell ----
export function Card({ children, className = '', title, subtitle, right }) {
  return (
    <div className={`rounded-2xl border border-ink-700 bg-ink-900 p-5 ${className}`}>
      {(title || right) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && (
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {title}
              </h3>
            )}
            {subtitle && <p className="mt-0.5 text-sm text-neutral-500">{subtitle}</p>}
          </div>
          {right}
        </div>
      )}
      {children}
    </div>
  )
}

// ---- Delta pill (green up / red down) ----
export function Delta({ value, up, label, className = '' }) {
  if (value === '—' || value == null)
    return <span className={`text-sm text-neutral-500 ${className}`}>—</span>
  const Icon = up ? TrendingUp : TrendingDown
  const color = up ? 'text-emerald-400' : 'text-red-400'
  return (
    <span className={`inline-flex items-center gap-1 text-sm font-medium ${color} ${className}`}>
      <Icon size={15} strokeWidth={2.4} />
      {value}
      {label && <span className="font-normal text-neutral-500">{label}</span>}
    </span>
  )
}

// ---- Status badge (Good / Active / New / Lost ...) ----
const toneMap = {
  Good: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  Active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  Appearing: 'text-emerald-400',
  New: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  Lost: 'bg-red-500/10 text-red-400 border-red-500/30',
  'Not detected': 'text-neutral-500',
  red: 'bg-red-500/10 text-red-400 border-red-500/30',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
}

export function Badge({ children, tone }) {
  const cls = toneMap[tone] || toneMap[children] || 'bg-ink-700 text-neutral-300 border-ink-600'
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold ${cls}`}>
      {children}
    </span>
  )
}

// ---- Big metric number ----
export function Metric({ value, className = '' }) {
  return <div className={`text-3xl font-bold tracking-tight text-white sm:text-4xl ${className}`}>{value}</div>
}

// ---- Severity dot ----
export function Dot({ color = '#22c55e', size = 9 }) {
  return (
    <span
      className="inline-block rounded-full"
      style={{ width: size, height: size, background: color }}
    />
  )
}

// ---- Coloured value for tables (red/amber/green) ----
export function ToneText({ tone, children }) {
  const map = { red: 'text-red-400', amber: 'text-amber-400', green: 'text-emerald-400' }
  return <span className={`font-semibold ${map[tone] || 'text-white'}`}>{children}</span>
}
