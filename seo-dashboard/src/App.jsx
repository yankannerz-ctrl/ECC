import React, { useState } from 'react'
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
} from 'lucide-react'
import { LAST_SYNCED } from './data.js'
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
      { id: 'overview', label: 'Overview', icon: LayoutGrid, page: Overview },
      { id: 'page-speed', label: 'Page Speed', icon: Gauge, page: PageSpeed },
    ],
  },
  {
    group: 'SEO',
    items: [
      { id: 'seo-overview', label: 'SEO Overview', icon: Search, page: SeoOverview },
      { id: 'seo-audit', label: 'SEO Audit', icon: FileSearch, page: SeoAudit },
      { id: 'search-console', label: 'Search Console', icon: TrendingUp, page: SearchConsole },
      { id: 'backlinks', label: 'Backlinks', icon: Link2, page: Backlinks },
    ],
  },
]

const PERIODS = ['This Month', 'Last Month', 'Last 3 Months']

const ALL_ITEMS = NAV.flatMap((g) => g.items)

export default function App() {
  const [active, setActive] = useState('overview')
  const [period, setPeriod] = useState('This Month')
  const [navOpen, setNavOpen] = useState(false)

  const current = ALL_ITEMS.find((i) => i.id === active)
  const PageComponent = current.page

  return (
    <div className="flex min-h-screen bg-ink-950 text-neutral-200">
      {/* ---------- Sidebar ---------- */}
      <Sidebar active={active} setActive={(id) => { setActive(id); setNavOpen(false) }} open={navOpen} onClose={() => setNavOpen(false)} />

      {/* ---------- Main column ---------- */}
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

            {/* Period toggle */}
            <div className="flex rounded-xl border border-ink-700 bg-ink-900 p-1">
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
        </header>

        {/* Page content */}
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
          <div className="mb-5 flex items-center gap-2 text-sm text-neutral-500">
            <span>{current.group}</span>
            <ChevronRight size={14} />
            <span className="text-neutral-300">{current.label}</span>
          </div>
          <PageComponent period={period} />
          <footer className="mt-10 border-t border-ink-800 pt-4 text-xs text-neutral-600">
            Last synced: {LAST_SYNCED} · Showing data for{' '}
            <span className="text-neutral-400">{period}</span>
          </footer>
        </main>
      </div>
    </div>
  )
}

function Sidebar({ active, setActive, open, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={onClose} aria-hidden />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-ink-700 bg-ink-900 transition-transform duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Brand */}
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

          {/* Nav */}
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
                        isActive
                          ? 'bg-ink-700 text-white'
                          : 'text-neutral-400 hover:bg-ink-800 hover:text-neutral-200'
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
