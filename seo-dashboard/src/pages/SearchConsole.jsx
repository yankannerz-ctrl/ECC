import React from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { searchConsole } from '../data.js'
import { Card, Delta, Metric, Badge } from '../ui.jsx'
import { tooltipStyle } from './Overview.jsx'

const intentTone = { Commercial: 'blue', Informational: 'amber', Transactional: 'green' }

function MiniStat({ title, sub, value, delta, up, color = '#3b82f6', trend, valueClass = '' }) {
  return (
    <Card title={title} subtitle={sub} className="!p-4">
      <Metric className={valueClass} value={value} />
      {delta && <Delta className="mt-2" value={delta} up={up} label="MoM" />}
      {trend && (
        <div className="mt-3 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <Line type="monotone" dataKey="y" stroke={color} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}

export default function SearchConsole() {
  const s = searchConsole
  return (
    <div className="space-y-5">
      {/* Stat grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        <MiniStat title="Total Clicks" sub="GSC · This period" value={s.stats.clicks.value} delta={s.stats.clicks.delta} up trend={s.stats.clicks.trend} color="#3b82f6" />
        <MiniStat title="Total Impressions" sub="GSC · This period" value={s.stats.impressions.value} delta={s.stats.impressions.delta} up trend={s.stats.impressions.trend} color="#a855f7" />
        <Card title="Average CTR" subtitle="GSC · This period" className="!p-4">
          <Metric value={s.stats.ctr.value} />
          <Delta className="mt-2" value={s.stats.ctr.delta} up label="MoM" />
          <p className="mt-3 text-sm text-neutral-500">{s.stats.ctr.sub}</p>
        </Card>
        <Card title="Average Position" subtitle="GSC · Lower = better" className="!p-4">
          <Metric className="text-emerald-400" value={s.stats.position.value} />
          <p className="mt-2 text-sm font-medium text-emerald-400">↑ {s.stats.position.sub}</p>
        </Card>
      </div>

      {/* Clicks vs impressions trend */}
      <Card title="Clicks vs Impressions Trend" subtitle="Dual-axis · 12-month view">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={s.trend} margin={{ left: -8, right: -8 }}>
              <CartesianGrid stroke="#1f1f1f" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#737373', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: '#737373', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#737373', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar yAxisId="right" dataKey="impressions" fill="#7c3aed" radius={[3, 3, 0, 0]} name="Impressions" barSize={14} />
              <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#3b82f6" strokeWidth={2.5} dot={false} name="Clicks" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Top pages */}
      <Card title="Top Pages" subtitle="Top 10 by clicks · sortable">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-ink-700 text-left text-xs uppercase tracking-wider text-neutral-500">
                <th className="py-3 pr-4 font-medium">URL</th>
                <th className="py-3 pr-4 font-medium">Clicks</th>
                <th className="py-3 font-medium">Impressions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-800">
              {s.topPages.map((r) => (
                <tr key={r.url} className="hover:bg-ink-850/50">
                  <td className="py-3 pr-4 text-neutral-200">{r.url}</td>
                  <td className="py-3 pr-4 font-semibold text-white">{r.clicks}</td>
                  <td className="py-3 text-neutral-300">{r.impressions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Queries */}
      <Card title="Top Queries" subtitle="By clicks · with search intent">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-ink-700 text-left text-xs uppercase tracking-wider text-neutral-500">
                <th className="py-3 pr-4 font-medium">Query</th>
                <th className="py-3 pr-4 font-medium">Clicks</th>
                <th className="py-3 pr-4 font-medium">Impressions</th>
                <th className="py-3 pr-4 font-medium">CTR</th>
                <th className="py-3 pr-4 font-medium">Position</th>
                <th className="py-3 font-medium">Intent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-800">
              {s.queries.map((r) => (
                <tr key={r.q} className="hover:bg-ink-850/50">
                  <td className="py-3 pr-4 text-neutral-200">{r.q}</td>
                  <td className="py-3 pr-4 text-neutral-300">{r.clicks}</td>
                  <td className="py-3 pr-4 text-neutral-300">{r.impressions}</td>
                  <td className="py-3 pr-4 text-neutral-300">{r.ctr}</td>
                  <td className="py-3 pr-4">
                    <span className={r.position <= 3 ? 'font-semibold text-emerald-400' : 'font-semibold text-amber-400'}>
                      {r.position}
                    </span>
                  </td>
                  <td className="py-3"><Badge tone={intentTone[r.intent]}>{r.intent}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
