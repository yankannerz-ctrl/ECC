import React, { useState, useEffect, useRef } from 'react'
import {
  LayoutGrid,
  Gauge,
  Search,
  FileSearch,
  TrendingUp,
  Link2,
  Globe,
  Menu,
  X,
  Download,
  ChevronRight,
  ChevronDown,
  Check,
} from 'lucide-react'
import { LAST_SYNCED } from './data.js'
import { getDashboard, SITES } from './api.js'
import { PageSkeleton } from './ui.jsx'
import Overview from './pages/Overview.jsx'
import PageSpeed from './pages/PageSpeed.jsx'
import SeoOverview from './pages/SeoOverview.jsx'
import SeoAudit from './pages/SeoAudit.jsx'
import SearchConsole from './pages/SearchConsole.jsx'
import Backlinks from './pages/Backlinks.jsx'

const NAV = [
  {
    group: 'Website',
    items: [
      { id: 'overview', label: 'Overview', icon: LayoutGrid, page: Overview, dataKey: 'overview' },
      { id: 'page-speed', label: 'Page Speed', icon: Gauge, page: PageSpeed, dataKey: 'pageSpeed' },
    ],
  },
  {
    group: 'SEO',
    items: [
      { id: 'seo-overview', label: 'SEO Overview', icon: Search, page: SeoOverview, dataKey: 'seoOverview' },
      { id: 'seo-audit', label: 'SEO Audit', icon: FileSearch, page: SeoAudit, dataKey: 'seoAudit' },
      { id: 'search-console', label: 'Search Console', icon: TrendingUp, page: SearchConsole, dataKey: 'searchConsole' },
      { id: 'backlinks', label: 'Backlinks', icon: Link2, page: Backlinks, dataKey: 'backlinks' },
    ],
  },
]

const PERIODS = ['This Month', 'Last Month', 'Last 3 Months']
const ALL_ITEMS = NAV.flatMap((g) => g.items)

export default function App() {
  const [active, setActive] = useState('overview')
  const [period, setPeriod] = useState('This Month')
  const [siteId, setSiteId] = useState('main')
  const [navOpen, setNavOpen] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load dashboard data whenever the selected property changes.
  useEffect(() => {
    let alive = true
    setLoading(true)
    // Small delay so the skeleton is visible — mirrors a real network fetch.
    const t = setTimeout(() => {
      getDashboard({ siteId }).then((d) => {
        if (alive) {
          setData(d)
          setLoading(false)
        }
      })
    }, 260)
    return () => {
      alive = false
      clearTimeout(t)
    }
  }, [siteId])

  const current = ALL_ITEMS.find((i) => i.id === active)
  const PageComponent = current.page

  return (
    <div className="flex min-h-screen bg-ink-950 text-neutral-200">
      <Sidebar active={active} setActive={(id) => { setActive(id); setNavOpen(false) }} open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 border-b border-ink-700 bg-ink-950/90 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button
              className="rounded-lg p-2 text-neutral-300 hover:bg-ink-800 lg:hidden"
              onClick={() => setNavOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>

            <SiteSelector siteId={siteId} setSiteId={setSiteId} />

            {/* Period toggle */}
            <div className="hidden rounded-xl border border-ink-700 bg-ink-900 p-1 sm:flex">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
                    period === p ? 'bg-ink-700 text-white' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-lg border border-ink-700 bg-ink-900 px-3 py-2 text-sm text-neutral-300 hover:bg-ink-800">
                <Download size={16} />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {/* Period toggle — mobile row */}
          <div className="flex gap-1 px-4 pb-3 sm:hidden">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`flex-1 whitespace-nowrap rounded-lg px-2 py-1.5 text-xs font-semibold transition ${
                  period === p ? 'bg-ink-700 text-white' : 'bg-ink-900 text-neutral-400'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </header>

        {/* Page content */}
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
          <div className="mb-5 flex items-center gap-2 text-sm text-neutral-500">
            <span>{current.group}</span>
            <ChevronRight size={14} />
            <span className="text-neutral-300">{current.label}</span>
          </div>

          {loading || !data ? (
            <PageSkeleton />
          ) : (
            <PageComponent data={data[current.dataKey]} period={period} />
          )}

          <footer className="mt-10 border-t border-ink-800 pt-4 text-xs text-neutral-600">
            Last synced: {LAST_SYNCED} · {SITES.find((s) => s.id === siteId)?.name} ·{' '}
            <span className="text-neutral-400">{period}</span>
          </footer>
        </main>
      </div>
    </div>
  )
}

function SiteSelector({ siteId, setSiteId }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const site = SITES.find((s) => s.id === siteId) || SITES[0]

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl border border-ink-700 bg-ink-900 px-3 py-2 text-sm hover:bg-ink-800"
      >
        <Globe size={15} className="text-brand" />
        <span className="font-medium text-white">{site.name}</span>
        <ChevronDown size={15} className={`text-neutral-500 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-40 mt-2 w-56 overflow-hidden rounded-xl border border-ink-700 bg-ink-850 shadow-xl">
          {SITES.map((s) => (
            <button
              key={s.id}
              onClick={() => { setSiteId(s.id); setOpen(false) }}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-ink-800"
            >
              <Globe size={15} className="text-neutral-400" />
              <span className="flex-1">
                <span className="block text-sm font-medium text-white">{s.name}</span>
                <span className="block text-xs text-neutral-500">{s.label}</span>
              </span>
              {s.id === siteId && <Check size={16} className="text-brand" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Sidebar({ active, setActive, open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={onClose} aria-hidden />}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-ink-700 bg-ink-900 transition-transform duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-ink-700 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand">
                <Globe size={18} className="text-white" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-bold text-white">Website Dashboard</div>
                <div className="text-[11px] text-neutral-500">Website &amp; SEO</div>
              </div>
            </div>
            <button className="rounded-lg p-1.5 text-neutral-400 hover:bg-ink-800 lg:hidden" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {NAV.map((group) => (
              <div key={group.group} className="mb-6">
                <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
                  {group.group}
                </div>
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = active === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActive(item.id)}
                      className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        isActive ? 'bg-ink-700 text-white' : 'text-neutral-400 hover:bg-ink-800 hover:text-neutral-200'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-brand' : ''} />
                      <span>{item.label}</span>
                      {isActive && <ChevronRight size={16} className="ml-auto text-neutral-500" />}
                    </button>
                  )
                })}
              </div>
            ))}
          </nav>

          <div className="border-t border-ink-700 px-5 py-4 text-[11px] text-neutral-600">
            Synced · {LAST_SYNCED}
          </div>
        </div>
      </aside>
    </>
  )
}
