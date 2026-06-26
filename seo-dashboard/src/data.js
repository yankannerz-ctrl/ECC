// Mock data modelled on the Website & SEO Dashboard reference design.
// All numbers mirror the example screenshots so the UI looks realistic.

export const LAST_SYNCED = 'Jun 14, 2026 · 11:42 PM'

// --- small helper to build a gently rising sparkline series ---
const series = (base, points, step, jitter) =>
  Array.from({ length: points }, (_, i) => ({
    x: i,
    y: Math.round(base + i * step + Math.sin(i * 1.3) * jitter),
  }))

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

// ---------------- OVERVIEW ----------------
export const overview = {
  totalVisitors: {
    value: 31200,
    delta: '+9.8%',
    deltaLabel: 'vs last month',
    up: true,
    trend: series(820, 30, 6, 25),
  },
  leads: { value: 842, delta: '+14.2%', up: true, sub: 'From 31,200 visitors' },
  conversion: { value: '2.70%', delta: '+0.4%', up: true, sub: 'Industry avg: 2.1%' },
  revenue: {
    value: '$21,300',
    delta: '+7.3%',
    up: true,
    bars: [
      { m: 'Jan', v: 14200 },
      { m: 'Feb', v: 15600 },
      { m: 'Mar', v: 15100 },
      { m: 'Apr', v: 17800 },
      { m: 'May', v: 18200 },
      { m: 'Jun', v: 21300 },
    ],
  },
  siteSpeed: [
    { label: 'Load Time (LCP)', value: '2.1s', status: 'Good' },
    { label: 'Interactivity (INP)', value: '180ms', status: 'Good' },
    { label: 'Visual Stability (CLS)', value: '0.08', status: 'Good' },
  ],
  aiVisibility: {
    appearing: 2,
    total: 3,
    note: 'Based on 40 tracked queries across topics. Last checked Jun 14, 2026.',
    platforms: [
      { name: 'ChatGPT', status: 'Appearing' },
      { name: 'Perplexity', status: 'Appearing' },
      { name: 'Gemini', status: 'Not detected' },
    ],
  },
  organicSessions: { value: 18740, delta: '+11.2%', up: true },
  bounceRate: { value: '41.2%', delta: '-2.1%', up: false },
  sessionsByDay: Array.from({ length: 14 }, (_, i) => ({
    day: i + 1,
    desktop: [1620, 1680, 1280, 1500, 1560, 1540, 1440, 1400, 1600, 1620, 1660, 1700, 1640, 1762][i],
    mobile: Math.round((([1620, 1680, 1280, 1500, 1560, 1540, 1440, 1400, 1600, 1620, 1660, 1700, 1640, 1762][i]) * 0.6)),
    tablet: 182,
    highlight: i === 13,
  })),
  deviceTraffic: [
    { name: 'Desktop', value: 54, color: '#3b82f6' },
    { name: 'Mobile', value: 38, color: '#22c55e' },
    { name: 'Tablet', value: 8, color: '#f59e0b' },
  ],
  gscSummary: [
    { label: 'Indexed Pages', value: '1,842', delta: '+14', tone: 'up' },
    { label: 'Mobile Usability Issues', value: '3', delta: '-5', tone: 'up' },
    { label: 'Manual Actions', value: 'None', delta: '—', tone: 'flat' },
    { label: 'Core Web Vitals (Mobile)', value: 'Good', delta: '—', tone: 'flat' },
  ],
}

// ---------------- PAGE SPEED ----------------
export const pageSpeed = {
  summary: [
    { label: 'Load Time (LCP)', value: '2.1s', status: 'Good' },
    { label: 'Interactivity (INP)', value: '180ms', status: 'Good' },
    { label: 'Visual Stability (CLS)', value: '0.08', status: 'Good' },
  ],
  cwvTrend: MONTHS.map((m, i) => ({
    month: m,
    lcp: [3.1, 2.9, 2.7, 2.5, 2.3, 2.1][i],
    inp: [260, 240, 220, 205, 190, 180][i],
    cls: [0.16, 0.14, 0.12, 0.1, 0.09, 0.08][i],
  })),
  underperforming: [
    { url: '/products/enterprise-plan', lcp: '4.8s', inp: '620ms', lcpTone: 'red', inpTone: 'red' },
    { url: '/blog/ultimate-guide-seo-2026', lcp: '3.9s', inp: '380ms', lcpTone: 'amber', inpTone: 'amber' },
    { url: '/case-studies/acme-corp', lcp: '3.4s', inp: '290ms', lcpTone: 'amber', inpTone: 'amber' },
    { url: '/features/analytics', lcp: '3.1s', inp: '240ms', lcpTone: 'amber', inpTone: 'amber' },
    { url: '/pricing', lcp: '2.8s', inp: '210ms', lcpTone: 'amber', inpTone: 'amber' },
    { url: '/about', lcp: '2.6s', inp: '195ms', lcpTone: 'amber', inpTone: 'green' },
  ],
}

// ---------------- SEO OVERVIEW ----------------
export const seoOverview = {
  onPageScore: { score: 78, label: 'Good', note: 'Up 4 pts from May', critical: 3, warning: 11, notice: 24 },
  organicTraffic: { value: 18740, delta: '+11.2%', up: true, area: series(12000, 24, 280, 400) },
  keywords: {
    total: '1,714',
    delta: '+62',
    buckets: [
      { label: 'Top 3', value: 124, color: '#22c55e' },
      { label: '4–10', value: 287, color: '#3b82f6' },
      { label: '11–20', value: 412, color: '#f59e0b' },
      { label: '21+', value: 891, color: '#9ca3af' },
    ],
  },
  backlinks: {
    total: { value: '14,280', delta: '+3.1%', up: true },
    referring: { value: '892', delta: '+1.8%', up: true },
  },
  pagesCrawled: { value: 1842, total: 1960, indexedPct: 94, notIndexed: 118, source: 'Screaming Frog · Jun 10' },
  seoIssues: { critical: 12, warning: 38, notice: 67, total: 117, fixed: 14, pages: 1842 },
}

// ---------------- SEO AUDIT ----------------
export const seoAudit = {
  categories: [
    { name: 'Metadata', desc: 'Title tags, meta descriptions', badges: [{ t: '1 Critical', tone: 'red' }, { t: '2 Warning', tone: 'amber' }], total: 3 },
    { name: 'Page Quality', desc: 'Thin content, duplicates, canonicalization', badges: [{ t: '1 Critical', tone: 'red' }, { t: '1 Warning', tone: 'amber' }], total: 2 },
    { name: 'Page Structure', desc: 'Headings, internal linking, orphans', badges: [{ t: '1 Warning', tone: 'amber' }, { t: '1 Notice', tone: 'blue' }], total: 2 },
    { name: 'Links', desc: 'Broken links, redirect chains, nofollow', badges: [{ t: '1 Critical', tone: 'red' }, { t: '1 Warning', tone: 'amber' }], total: 2 },
    { name: 'Server', desc: 'Crawl errors, robots.txt, indexability', badges: [{ t: '1 Critical', tone: 'red' }, { t: '1 Warning', tone: 'amber' }], total: 2 },
    { name: 'External Factors', desc: 'Toxic backlinks, manual action risk', badges: [{ t: '1 Critical', tone: 'red' }], total: 1 },
  ],
  lastCrawl: 'Jun 10, 2026',
  issuesFound: 12,
  issues: [
    { url: '/products/enterprise-plan', category: 'Metadata', issue: 'Title tag too long (68 chars)', severity: 'Warning' },
    { url: '/blog/guide-seo', category: 'Metadata', issue: 'Missing meta description', severity: 'Critical' },
    { url: '/case-studies/acme', category: 'Page Quality', issue: 'Thin content (320 words)', severity: 'Warning' },
    { url: '/features', category: 'Page Quality', issue: 'Duplicate content detected', severity: 'Critical' },
    { url: '/pricing', category: 'Page Structure', issue: 'Multiple H1 tags', severity: 'Warning' },
    { url: '/blog/old-post', category: 'Links', issue: 'Broken outbound link (404)', severity: 'Critical' },
    { url: '/integrations', category: 'Links', issue: 'Redirect chain (3 hops)', severity: 'Warning' },
    { url: '/sitemap.xml', category: 'Server', issue: 'Slow server response (1.2s)', severity: 'Critical' },
    { url: '/legacy/page', category: 'Server', issue: 'Blocked by robots.txt', severity: 'Warning' },
    { url: 'sitewide', category: 'External Factors', issue: '4 toxic backlinks detected', severity: 'Critical' },
    { url: '/about', category: 'Page Structure', issue: 'Orphan page — no internal links', severity: 'Notice' },
    { url: '/contact', category: 'Metadata', issue: 'Title tag too long (71 chars)', severity: 'Warning' },
  ],
}

// ---------------- SEARCH CONSOLE ----------------
export const searchConsole = {
  stats: {
    clicks: { value: '3,120', delta: '+13.4%', up: true, trend: series(80, 18, 4, 8) },
    impressions: { value: '41,200', delta: '+7.2%', up: true, trend: series(1100, 18, 30, 60), color: '#a855f7' },
    ctr: { value: '7.6%', delta: '+0.5%', up: true, sub: 'Industry avg: 3.2%' },
    position: { value: '4.2', sub: 'Improved from 5.1', up: true },
  },
  trend: Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    clicks: Math.round(1500 + i * 130 + Math.sin(i) * 60),
    impressions: Math.round(28000 + i * 1100 + Math.cos(i) * 800),
  })),
  topPages: [
    { url: '/blog/seo-guide-2026', clicks: 842, impressions: '12,400' },
    { url: '/features/analytics', clicks: 621, impressions: '9,800' },
    { url: '/pricing', clicks: 518, impressions: '7,200' },
    { url: '/about', clicks: 287, impressions: '5,400' },
    { url: '/blog/core-web-vitals', clicks: 246, impressions: '6,100' },
    { url: '/case-studies', clicks: 198, impressions: '4,200' },
    { url: '/integrations', clicks: 187, impressions: '3,800' },
  ],
  queries: [
    { q: 'seo dashboard tool', clicks: 310, impressions: '4,800', ctr: '6.5%', position: 2.1, intent: 'Commercial' },
    { q: 'website analytics overview', clicks: 240, impressions: '5,200', ctr: '4.6%', position: 3.4, intent: 'Informational' },
    { q: 'core web vitals checker', clicks: 195, impressions: '4,100', ctr: '4.8%', position: 4.2, intent: 'Commercial' },
    { q: 'google search console guide', clicks: 182, impressions: '6,200', ctr: '2.9%', position: 5.6, intent: 'Informational' },
    { q: 'buy seo software', clicks: 167, impressions: '2,800', ctr: '6.0%', position: 2.8, intent: 'Transactional' },
    { q: 'page speed optimization tips', clicks: 143, impressions: '3,900', ctr: '3.7%', position: 4.8, intent: 'Informational' },
    { q: 'backlink checker free', clicks: 128, impressions: '5,100', ctr: '2.5%', position: 6.3, intent: 'Commercial' },
    { q: 'seo audit', clicks: 117, impressions: '3,200', ctr: '3.7%', position: 3.9, intent: 'Commercial' },
  ],
}

// ---------------- BACKLINKS ----------------
export const backlinks = {
  totals: {
    total: { value: '14,280', delta: '+3.1%', up: true },
    referring: { value: '892', delta: '+1.8%', up: true },
  },
  rows: [
    { domain: 'techcrunch.com', da: 94, backlinks: 12, type: 'Dofollow', status: 'Active' },
    { domain: 'searchengineland.com', da: 88, backlinks: 8, type: 'Dofollow', status: 'Active' },
    { domain: 'moz.com', da: 91, backlinks: 6, type: 'Dofollow', status: 'New' },
    { domain: 'hubspot.com', da: 93, backlinks: 5, type: 'Nofollow', status: 'Active' },
    { domain: 'ahrefs.com', da: 90, backlinks: 4, type: 'Dofollow', status: 'New' },
    { domain: 'semrush.com', da: 89, backlinks: 3, type: 'Dofollow', status: 'Active' },
    { domain: 'backlinko.com', da: 82, backlinks: 7, type: 'Dofollow', status: 'Active' },
    { domain: 'neilpatel.com', da: 85, backlinks: 5, type: 'Dofollow', status: 'Active' },
    { domain: 'forbes.com', da: 95, backlinks: 2, type: 'Nofollow', status: 'Lost' },
    { domain: 'inc.com', da: 90, backlinks: 3, type: 'Dofollow', status: 'Active' },
    { domain: 'entrepreneur.com', da: 88, backlinks: 4, type: 'Mixed', status: 'Active' },
    { domain: 'wired.com', da: 93, backlinks: 1, type: 'Nofollow', status: 'New' },
  ],
}
