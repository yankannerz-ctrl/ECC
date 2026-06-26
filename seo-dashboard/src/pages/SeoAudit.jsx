import React, { useState } from 'react'
import { seoAudit } from '../data.js'
import { Card, Badge } from '../ui.jsx'

const sevTone = { Critical: 'red', Warning: 'amber', Notice: 'blue' }

export default function SeoAudit() {
  const a = seoAudit
  const [filter, setFilter] = useState('All')
  const categories = ['All', ...a.categories.map((c) => c.name)]
  const rows = filter === 'All' ? a.issues : a.issues.filter((i) => i.category === filter)

  return (
    <div className="space-y-5">
      {/* Category cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {a.categories.map((c) => (
          <Card key={c.name} className="!p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">{c.name}</div>
            <p className="mt-0.5 text-sm text-neutral-500">{c.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.badges.map((b) => (
                <Badge key={b.t} tone={b.tone}>{b.t}</Badge>
              ))}
            </div>
            <p className="mt-3 text-sm text-neutral-500">{c.total} total issues</p>
          </Card>
        ))}
      </div>

      {/* All issues table */}
      <Card
        title="All Issues"
        subtitle={`Last crawl: ${a.lastCrawl} · ${a.issuesFound} issues found`}
      >
        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filter === c ? 'bg-ink-700 text-white' : 'bg-ink-850 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-ink-700 text-left text-xs uppercase tracking-wider text-neutral-500">
                <th className="py-3 pr-4 font-medium">URL</th>
                <th className="py-3 pr-4 font-medium">Category</th>
                <th className="py-3 pr-4 font-medium">Issue</th>
                <th className="py-3 font-medium">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-800">
              {rows.map((r, i) => (
                <tr key={i} className="hover:bg-ink-850/50">
                  <td className="py-3 pr-4 font-mono text-xs text-neutral-300">{r.url}</td>
                  <td className="py-3 pr-4 text-neutral-400">{r.category}</td>
                  <td className="py-3 pr-4 text-neutral-200">{r.issue}</td>
                  <td className="py-3"><Badge tone={sevTone[r.severity]}>{r.severity}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
