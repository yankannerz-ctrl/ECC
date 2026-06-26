import React, { useState } from 'react'
import { backlinks } from '../data.js'
import { Card, Delta, Metric, Badge } from '../ui.jsx'

export default function Backlinks() {
  const b = backlinks
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

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-ink-700 text-left text-xs uppercase tracking-wider text-neutral-500">
                <th className="py-3 pr-4 font-medium">Domain</th>
                <th className="py-3 pr-4 font-medium">DA</th>
                <th className="py-3 pr-4 font-medium">Backlinks</th>
                <th className="py-3 pr-4 font-medium">Link Type</th>
                <th className="py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-800">
              {rows.map((r) => (
                <tr key={r.domain} className="hover:bg-ink-850/50">
                  <td className="py-3 pr-4 text-neutral-200">{r.domain}</td>
                  <td className="py-3 pr-4">
                    <span className="font-bold text-white">{r.da}</span>
                  </td>
                  <td className="py-3 pr-4 text-neutral-300">{r.backlinks}</td>
                  <td className="py-3 pr-4 text-neutral-400">{r.type}</td>
                  <td className="py-3"><Badge tone={r.status}>{r.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
