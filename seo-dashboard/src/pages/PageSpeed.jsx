import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts'
import { pageSpeed } from '../data.js'
import { Card, Badge, ToneText } from '../ui.jsx'
import { tooltipStyle } from './Overview.jsx'

export default function PageSpeed() {
  const p = pageSpeed
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

      <Card title="Core Web Vitals Trend" subtitle="6-month view">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={p.cwvTrend} margin={{ left: -10, right: 10 }}>
              <CartesianGrid stroke="#1f1f1f" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#737373', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#737373', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#a3a3a3' }} />
              <Line type="monotone" dataKey="lcp" name="LCP (s)" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="cls" name="CLS" stroke="#a855f7" strokeWidth={2.5} dot={false} />
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
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-ink-700 text-left text-xs uppercase tracking-wider text-neutral-500">
                <th className="py-3 pr-4 font-medium">URL</th>
                <th className="py-3 pr-4 font-medium">LCP (s)</th>
                <th className="py-3 font-medium">INP (ms)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-800">
              {p.underperforming.map((row) => (
                <tr key={row.url} className="hover:bg-ink-850/50">
                  <td className="py-3 pr-4 text-neutral-200">{row.url}</td>
                  <td className="py-3 pr-4"><ToneText tone={row.lcpTone}>{row.lcp}</ToneText></td>
                  <td className="py-3"><ToneText tone={row.inpTone}>{row.inp}</ToneText></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
