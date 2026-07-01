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
import { scaleNum, periodOf } from '../period.js'
import { Card, Delta, Metric, Badge, SortableTable } from '../ui.jsx'
import { tooltipStyle } from './Overview.jsx'

const toNum = (s) => Number(String(s).replace(/[^0-9.]/g, ''))

const intentTone = { Commercial: 'blue', Informational: 'amber', Transactional: 'green' }

function MiniStat({ title, sub, value, delta, up, color = '#3b82f6', trend, valueClass = '', suffix = 'MoM' }) {
  return (
    <Card title={title} subtitle={sub} className="!p-4">
      <Metric className={valueClass} value={value} />
      {delta && <Delta className="mt-2" value={delta} up={up} label={suffix} />}
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

export default function SearchConsole({ data: s, period = 'This Month' }) {
  const p = periodOf(period)
  const clicks = scaleNum(toNum(s.stats.clicks.value), period).toLocaleString()
  const impressions = scaleNum(toNum(s.stats.impressions.value), period).toLocaleString()
  return (
    <div className="space-y-5">
      {/* Stat grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        <MiniStat title="Total Clicks" sub="GSC · This period" value={clicks} delta={s.stats.clicks.delta} up trend={s.stats.clicks.trend} color="#3b82f6" suffix={p.suffix} />
        <MiniStat title="Total Impressions" sub="GSC · This period" value={impressions} delta={s.stats.impressions.delta} up trend={s.stats.impressions.trend} color="#a855f7" suffix={p.suffix} />
        <Card title="Average CTR" subtitle="GSC · This period" className="!p-4">
          <Metric value={s.stats.ctr.value} />
          <Delta className="mt-2" value={s.stats.ctr.delta} up label={p.suffix} />
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
        <SortableTable
          minWidth={480}
          initialSort="clicks"
          rows={s.topPages.map((r) => ({ ...r, _key: r.url }))}
          columns={[
            { key: 'url', label: 'URL' },
            { key: 'clicks', label: 'Clicks', cellClass: 'font-semibold text-white' },
            { key: 'impressions', label: 'Impressions', cellClass: 'text-neutral-300', sortValue: (r) => toNum(r.impressions) },
          ]}
        />
      </Card>

      {/* Queries */}
      <Card title="Top Queries" subtitle="By clicks · with search intent">
        <SortableTable
          minWidth={640}
          initialSort="clicks"
          rows={s.queries.map((r) => ({ ...r, _key: r.q }))}
          columns={[
            { key: 'q', label: 'Query' },
            { key: 'clicks', label: 'Clicks', cellClass: 'text-neutral-300' },
            { key: 'impressions', label: 'Impressions', cellClass: 'text-neutral-300', sortValue: (r) => toNum(r.impressions) },
            { key: 'ctr', label: 'CTR', cellClass: 'text-neutral-300', sortValue: (r) => toNum(r.ctr) },
            {
              key: 'position', label: 'Position',
              render: (r) => (
                <span className={r.position <= 3 ? 'font-semibold text-emerald-400' : 'font-semibold text-amber-400'}>{r.position}</span>
              ),
            },
            { key: 'intent', label: 'Intent', render: (r) => <Badge tone={intentTone[r.intent]}>{r.intent}</Badge> },
          ]}
        />
      </Card>
    </div>
  )
}
