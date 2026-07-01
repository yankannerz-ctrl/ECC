import React, { useState } from 'react'
import { Card, Badge, SortableTable } from '../ui.jsx'

const sevTone = { Critical: 'red', Warning: 'amber', Notice: 'blue' }

export default function SeoAudit({ data: a }) {
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

        <SortableTable
          minWidth={560}
          rows={rows.map((r, i) => ({ ...r, _key: i }))}
          columns={[
            { key: 'url', label: 'URL', cellClass: 'font-mono text-xs text-neutral-300' },
            { key: 'category', label: 'Category', cellClass: 'text-neutral-400' },
            { key: 'issue', label: 'Issue' },
            { key: 'severity', label: 'Severity', render: (r) => <Badge tone={sevTone[r.severity]}>{r.severity}</Badge> },
          ]}
        />
      </Card>
    </div>
  )
}
