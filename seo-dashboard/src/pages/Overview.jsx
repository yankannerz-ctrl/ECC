import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  XAxis,
  Tooltip,
} from 'recharts'
import { scaleNum, scaleMoney, periodOf } from '../period.js'
import { Card, Delta, Metric, Badge, Dot } from '../ui.jsx'

export default function Overview({ data: o, period = 'This Month' }) {
  const p = periodOf(period)
  return (
    <div className="space-y-5">
      {/* Total visitors — full width hero */}
      <Card title="Total Visitors" subtitle="GA4 · Organic + All Channels">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Metric value={scaleNum(o.totalVisitors.value, period).toLocaleString()} />
            <Delta className="mt-2" value={o.totalVisitors.delta} up label={p.deltaLabel} />
          </div>
        </div>
        <div className="mt-4 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={o.totalVisitors.trend}>
              <Line type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Leads + Conversion */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Card title="Leads Generated" subtitle="CRM">
          <Metric value={scaleNum(o.leads.value, period).toLocaleString()} />
          <Delta className="mt-2" value={o.leads.delta} up label={p.suffix} />
          <p className="mt-3 text-sm text-neutral-500">From {scaleNum(o.totalVisitors.value, period).toLocaleString()} visitors</p>
        </Card>
        <Card title="Conversion Rate" subtitle="Leads / Visitors">
          <Metric value={o.conversion.value} />
          <Delta className="mt-2" value={o.conversion.delta} up label={p.suffix} />
          <p className="mt-3 text-sm text-neutral-500">{o.conversion.sub}</p>
        </Card>
      </div>

      {/* Revenue from organic */}
      <Card title="Revenue from Organic" subtitle="CRM attribution">
        <Metric value={scaleMoney(o.revenue.value, period)} />
        <Delta className="mt-2" value={o.revenue.delta} up label={p.suffix} />
        <div className="mt-4 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={o.revenue.bars}>
              <XAxis dataKey="m" tick={{ fill: '#737373', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: '#ffffff08' }}
                contentStyle={tooltipStyle}
                formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']}
              />
              <Bar dataKey="v" radius={[6, 6, 0, 0]}>
                {o.revenue.bars.map((b, i) => (
                  <Cell key={i} fill={i === o.revenue.bars.length - 1 ? '#3b82f6' : '#2e2e2e'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Site speed + AI visibility */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Site Speed Summary" subtitle="PageSpeed Insights · Mobile">
          <div className="divide-y divide-ink-800">
            {o.siteSpeed.map((s) => (
              <div key={s.label} className="flex items-center justify-between py-3">
                <span className="text-sm text-neutral-300">{s.label}</span>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white">{s.value}</span>
                  <Badge tone="Good">{s.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="AI Search Visibility" subtitle="Appearance in AI-generated answers">
          <div className="mb-3 flex items-center gap-2">
            <Dot color="#22c55e" />
            <span className="text-sm text-neutral-200">
              Appearing in <span className="font-bold text-white">{o.aiVisibility.appearing} of {o.aiVisibility.total}</span> AI platforms
            </span>
          </div>
          <div className="divide-y divide-ink-800">
            {o.aiVisibility.platforms.map((p) => (
              <div key={p.name} className="flex items-center justify-between py-3">
                <span className="text-sm text-neutral-200">{p.name}</span>
                <span className="flex items-center gap-2">
                  <Dot color={p.status === 'Appearing' ? '#22c55e' : '#6b7280'} size={8} />
                  <span className={p.status === 'Appearing' ? 'text-sm font-medium text-emerald-400' : 'text-sm text-neutral-500'}>
                    {p.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 rounded-lg bg-ink-850 p-3 text-xs text-neutral-500">{o.aiVisibility.note}</p>
        </Card>
      </div>

      {/* Organic sessions + bounce */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Card title="Organic Sessions" subtitle="GA4">
          <Metric value={scaleNum(o.organicSessions.value, period).toLocaleString()} />
          <Delta className="mt-2" value={o.organicSessions.delta} up label={p.suffix} />
        </Card>
        <Card title="Bounce Rate" subtitle="GA4">
          <Metric value={o.bounceRate.value} />
          <Delta className="mt-2" value={o.bounceRate.delta} up={false} label={p.suffix} />
        </Card>
      </div>

      {/* Sessions by day */}
      <Card title="Sessions by Day" subtitle="Device breakdown · last 14 days">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={o.sessionsByDay}>
              <XAxis dataKey="day" tick={{ fill: '#737373', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#ffffff08' }} contentStyle={tooltipStyle} />
              <Bar dataKey="desktop" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} name="Desktop" />
              <Bar dataKey="mobile" stackId="a" fill="#3b82f6" name="Mobile" />
              <Bar dataKey="tablet" stackId="a" fill="#22c55e" radius={[3, 3, 0, 0]} name="Tablet" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Device donut + GSC summary */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Device Traffic" subtitle="Donut breakdown">
          <div className="flex items-center gap-6">
            <div className="h-40 w-40 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={o.deviceTraffic}
                    dataKey="value"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {o.deviceTraffic.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => [`${v}%`, n]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {o.deviceTraffic.map((d) => (
                <div key={d.name} className="flex items-center gap-3">
                  <Dot color={d.color} />
                  <span className="text-sm text-neutral-300">{d.name}</span>
                  <span className="ml-auto font-semibold text-white">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="GSC Summary" subtitle="Period comparison">
          <div className="divide-y divide-ink-800">
            {o.gscSummary.map((g) => (
              <div key={g.label} className="flex items-center justify-between py-3">
                <span className="text-sm text-neutral-400">{g.label}</span>
                <span className="flex items-center gap-2">
                  <span className="font-bold text-white">{g.value}</span>
                  <span className={g.tone === 'up' ? 'text-xs text-emerald-400' : 'text-xs text-neutral-600'}>
                    {g.delta}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export const tooltipStyle = {
  background: '#1a1a1a',
  border: '1px solid #2e2e2e',
  borderRadius: 10,
  fontSize: 12,
  color: '#e5e5e5',
}
