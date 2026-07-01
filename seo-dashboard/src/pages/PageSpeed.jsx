import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { Card, Badge, ToneText, SortableTable } from '../ui.jsx'
import { tooltipStyle } from './Overview.jsx'

export default function PageSpeed({ data: p }) {
  return (
    <div className="space-y-5">
      <Card title="Site Speed Summary" subtitle="PageSpeed Insights · Mobile">
        <div className="grid gap-4 sm:grid-cols-3">
          {p.summary.map((s) => (
            <div key={s.label} className="rounded-xl border border-ink-700 bg-ink-850 p-4">
              <div className="text-xs text-neutral-400">{s.label}</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-2xl font-bold text-white">{s.value}</span>
                <Badge tone="Good">{s.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Core Web Vitals Trend" subtitle="6-month view · LCP & INP improving">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={p.cwvTrend} margin={{ left: -10, right: -6 }}>
              <CartesianGrid stroke="#1f1f1f" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#737373', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="lcp" tick={{ fill: '#737373', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 'auto']} />
              <YAxis yAxisId="inp" orientation="right" tick={{ fill: '#737373', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 'auto']} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line yAxisId="lcp" type="monotone" dataKey="lcp" name="LCP (s)" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: '#3b82f6' }} />
              <Line yAxisId="inp" type="monotone" dataKey="inp" name="INP (ms)" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, fill: '#f59e0b' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-neutral-400">
          <Legendkey color="#3b82f6" label="LCP · ≤2.5s good" />
          <Legendkey color="#f59e0b" label="INP · ≤200ms good" />
          <Legendkey color="#a855f7" label="CLS · ≤0.1 good" />
        </div>
      </Card>

      <Card title="Underperforming Pages" subtitle="Pages failing Core Web Vital thresholds">
        <SortableTable
          minWidth={480}
          initialSort="lcp"
          rows={p.underperforming.map((r) => ({ ...r, _key: r.url }))}
          columns={[
            { key: 'url', label: 'URL' },
            { key: 'lcp', label: 'LCP (s)', sortValue: (r) => parseFloat(r.lcp), render: (r) => <ToneText tone={r.lcpTone}>{r.lcp}</ToneText> },
            { key: 'inp', label: 'INP (ms)', sortValue: (r) => parseFloat(r.inp), render: (r) => <ToneText tone={r.inpTone}>{r.inp}</ToneText> },
          ]}
        />
      </Card>
    </div>
  )
}

function Legendkey({ color, label }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-0.5 w-5 rounded" style={{ background: color }} />
      {label}
    </span>
  )
}
