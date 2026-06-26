import React from 'react'
import { ResponsiveContainer, AreaChart, Area } from 'recharts'
import { seoOverview } from '../data.js'
import { Card, Delta, Metric, Badge, Dot } from '../ui.jsx'

export default function SeoOverview() {
  const s = seoOverview
  const score = s.onPageScore
  const circumference = 2 * Math.PI * 52
  const dash = (score.score / 100) * circumference

  return (
    <div className="space-y-5">
      {/* On-page score gauge */}
      <Card title="On-Page SEO Score" subtitle="Semrush · Jun 2026">
        <div className="flex flex-wrap items-center gap-6">
          <div className="relative h-32 w-32 shrink-0">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#232323" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="52" fill="none" stroke="#22c55e" strokeWidth="10"
                strokeLinecap="round" strokeDasharray={`${dash} ${circumference}`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
              {score.score}
            </div>
          </div>
          <div>
            <div className="text-xl font-bold text-emerald-400">{score.label}</div>
            <p className="mt-1 text-sm text-neutral-400">{score.note}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="red">{score.critical} Critical</Badge>
              <Badge tone="amber">{score.warning} Warning</Badge>
              <Badge tone="blue">{score.notice} Notice</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Organic monthly traffic */}
      <Card title="Organic Monthly Traffic" subtitle="GA4 · Jun 2026">
        <Metric value={s.organicTraffic.value.toLocaleString()} />
        <Delta className="mt-2" value={s.organicTraffic.delta} up label="MoM" />
        <div className="mt-4 h-28">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={s.organicTraffic.area}>
              <defs>
                <linearGradient id="orgTraffic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={2.5} fill="url(#orgTraffic)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Organic keywords distribution */}
      <Card title="Organic Keywords" subtitle="Semrush · Ahrefs">
        <div className="flex items-end gap-3">
          <Metric value={s.keywords.total} />
          <span className="mb-1 text-sm font-medium text-emerald-400">{s.keywords.delta} MoM</span>
        </div>
        <div className="mt-4 flex h-3 overflow-hidden rounded-full">
          {s.keywords.buckets.map((b) => (
            <div
              key={b.label}
              style={{ background: b.color, width: `${(b.value / 1714) * 100}%` }}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {s.keywords.buckets.map((b) => (
            <div key={b.label} className="flex items-center gap-2 text-sm">
              <Dot color={b.color} size={8} />
              <span className="text-neutral-400">{b.label}</span>
              <span className="font-semibold text-white">{b.value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Backlinks */}
      <Card title="Backlinks" subtitle="Ahrefs">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="text-sm text-neutral-400">Total Backlinks</div>
            <Metric className="mt-1" value={s.backlinks.total.value} />
            <Delta className="mt-2" value={s.backlinks.total.delta} up label="MoM" />
          </div>
          <div>
            <div className="text-sm text-neutral-400">Referring Domains</div>
            <Metric className="mt-1" value={s.backlinks.referring.value} />
            <Delta className="mt-2" value={s.backlinks.referring.delta} up label="MoM" />
          </div>
        </div>
      </Card>

      {/* Pages crawled */}
      <Card title="Pages Crawled" subtitle={s.pagesCrawled.source}>
        <div className="flex items-end gap-3">
          <Metric value={s.pagesCrawled.value.toLocaleString()} />
          <span className="mb-1.5 text-sm text-neutral-500">of {s.pagesCrawled.total.toLocaleString()} crawled</span>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink-700">
          <div className="h-full rounded-full bg-brand" style={{ width: `${(s.pagesCrawled.value / s.pagesCrawled.total) * 100}%` }} />
        </div>
        <p className="mt-2 text-sm text-neutral-500">
          {s.pagesCrawled.indexedPct}% indexed — {s.pagesCrawled.notIndexed} pages not indexed
        </p>
      </Card>

      {/* SEO issues */}
      <Card title="SEO Issues" subtitle="Screaming Frog · Semrush">
        <div className="flex flex-wrap gap-2">
          <Badge tone="red">{s.seoIssues.critical} Critical</Badge>
          <Badge tone="amber">{s.seoIssues.warning} Warning</Badge>
          <Badge tone="blue">{s.seoIssues.notice} Notice</Badge>
        </div>
        <p className="mt-3 text-sm text-neutral-400">
          {s.seoIssues.total} total issues across {s.seoIssues.pages.toLocaleString()} indexed pages
        </p>
        <p className="mt-1 text-sm font-medium text-emerald-400">+{s.seoIssues.fixed} fixed since last crawl</p>
      </Card>
    </div>
  )
}
