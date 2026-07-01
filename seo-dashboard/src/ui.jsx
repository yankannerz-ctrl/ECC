import React, { useState } from 'react'
import { TrendingUp, TrendingDown, ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react'

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

// ---- Loading skeletons ----
export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-xl bg-ink-800 ${className}`} />
}

export function PageSkeleton() {
  return (
    <div className="space-y-5">
      <Skeleton className="h-44 w-full" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Skeleton className="h-36" />
        <Skeleton className="h-36" />
      </div>
      <Skeleton className="h-56 w-full" />
      <div className="grid gap-5 lg:grid-cols-2">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    </div>
  )
}

// ---- Sortable table ----
// columns: [{ key, label, render?, sortValue?, className? }]
// Click a header to sort; click again to flip direction.
export function SortableTable({ columns, rows, initialSort, minWidth = 480 }) {
  const [sort, setSort] = useState(initialSort ? { key: initialSort, dir: 'desc' } : null)

  const sorted = React.useMemo(() => {
    if (!sort) return rows
    const col = columns.find((c) => c.key === sort.key)
    const val = (r) => (col?.sortValue ? col.sortValue(r) : r[sort.key])
    const out = [...rows].sort((a, b) => {
      const av = val(a)
      const bv = val(b)
      if (typeof av === 'number' && typeof bv === 'number') return av - bv
      return String(av).localeCompare(String(bv))
    })
    return sort.dir === 'desc' ? out.reverse() : out
  }, [rows, sort, columns])

  const toggle = (key) =>
    setSort((s) => (s && s.key === key ? { key, dir: s.dir === 'desc' ? 'asc' : 'desc' } : { key, dir: 'desc' }))

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" style={{ minWidth }}>
        <thead>
          <tr className="border-b border-ink-700 text-left text-xs uppercase tracking-wider text-neutral-500">
            {columns.map((c) => {
              const active = sort?.key === c.key
              const Icon = !active ? ChevronsUpDown : sort.dir === 'desc' ? ChevronDown : ChevronUp
              return (
                <th key={c.key} className={`py-3 pr-4 font-medium ${c.className || ''}`}>
                  <button
                    onClick={() => toggle(c.key)}
                    className={`inline-flex items-center gap-1 transition hover:text-neutral-200 ${active ? 'text-neutral-200' : ''}`}
                  >
                    {c.label}
                    <Icon size={13} className={active ? 'text-brand' : 'text-neutral-600'} />
                  </button>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-800">
          {sorted.map((r, i) => (
            <tr key={r._key || i} className="hover:bg-ink-850/50">
              {columns.map((c) => (
                <td key={c.key} className={`py-3 pr-4 ${c.cellClass || 'text-neutral-200'}`}>
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
