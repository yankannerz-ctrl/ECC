import React, { useState } from 'react'
import { Card, Delta, Metric, Badge, SortableTable } from '../ui.jsx'

export default function Backlinks({ data: b }) {
  const [tab, setTab] = useState('All Links')
  const rows = tab === 'Dofollow Only' ? b.rows.filter((r) => r.type === 'Dofollow') : b.rows

  return (
    <div className="space-y-5">
      {/* Totals */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Card title="Total Backlinks" subtitle="Ahrefs">
          <Metric value={b.totals.total.value} />
          <Delta className="mt-2" value={b.totals.total.delta} up label="MoM" />
        </Card>
        <Card title="Referring Domains" subtitle="Ahrefs">
          <Metric value={b.totals.referring.value} />
          <Delta className="mt-2" value={b.totals.referring.delta} up label="MoM" />
        </Card>
      </div>

      {/* Table */}
      <Card title="Referring Domains" subtitle="Sorted by authority">
        <div className="mb-4 inline-flex rounded-xl border border-ink-700 bg-ink-850 p-1">
          {['All Links', 'Dofollow Only'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                tab === t ? 'bg-ink-700 text-white' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <SortableTable
          minWidth={560}
          initialSort="da"
          rows={rows.map((r) => ({ ...r, _key: r.domain }))}
          columns={[
            { key: 'domain', label: 'Domain' },
            { key: 'da', label: 'DA', render: (r) => <span className="font-bold text-white">{r.da}</span> },
            { key: 'backlinks', label: 'Backlinks', cellClass: 'text-neutral-300' },
            { key: 'type', label: 'Link Type', cellClass: 'text-neutral-400' },
            { key: 'status', label: 'Status', render: (r) => <Badge tone={r.status}>{r.status}</Badge> },
          ]}
        />
      </Card>
    </div>
  )
}
