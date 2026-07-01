// ---------------------------------------------------------------------------
// Data service layer.
//
// Every page reads its data through getDashboard() instead of importing the
// mock modules directly. Today it returns mock data (scaled per selected
// property); to go live, replace the body of getDashboard() with real calls
// to GA4 / Google Search Console / Semrush / Ahrefs — the shape the pages
// consume stays identical, so no component changes are needed.
// ---------------------------------------------------------------------------

import {
  overview,
  pageSpeed,
  seoOverview,
  seoAudit,
  searchConsole,
  backlinks,
} from './data.js'

// Properties the user can switch between in the topbar.
export const SITES = [
  { id: 'main', name: 'acme.com', label: 'Main site', factor: 1 },
  { id: 'blog', name: 'blog.acme.com', label: 'Content hub', factor: 0.42 },
  { id: 'shop', name: 'shop.acme.com', label: 'Store', factor: 1.65 },
]

const money = (n) => '$' + Math.round(n).toLocaleString()
const num = (s) => Number(String(s).replace(/[^0-9.]/g, ''))

// Apply a per-property multiplier to the count-based metrics so switching
// properties produces distinct, believable numbers.
function forSite(factor) {
  if (factor === 1) {
    return { overview, pageSpeed, seoOverview, seoAudit, searchConsole, backlinks }
  }
  const s = (n) => Math.round(n * factor)
  return {
    overview: {
      ...overview,
      totalVisitors: { ...overview.totalVisitors, value: s(overview.totalVisitors.value) },
      leads: { ...overview.leads, value: s(overview.leads.value) },
      organicSessions: { ...overview.organicSessions, value: s(overview.organicSessions.value) },
      revenue: { ...overview.revenue, value: money(num(overview.revenue.value) * factor) },
    },
    pageSpeed,
    seoOverview: {
      ...seoOverview,
      organicTraffic: { ...seoOverview.organicTraffic, value: s(seoOverview.organicTraffic.value) },
    },
    seoAudit,
    searchConsole: {
      ...searchConsole,
      stats: {
        ...searchConsole.stats,
        clicks: { ...searchConsole.stats.clicks, value: s(num(searchConsole.stats.clicks.value)).toLocaleString() },
        impressions: { ...searchConsole.stats.impressions, value: s(num(searchConsole.stats.impressions.value)).toLocaleString() },
      },
    },
    backlinks,
  }
}

/**
 * Fetch the full dashboard payload for a property.
 * @param {{ siteId: string }} opts
 * @returns {Promise<object>} all sections keyed by page
 */
export function getDashboard({ siteId } = {}) {
  const site = SITES.find((x) => x.id === siteId) || SITES[0]
  return Promise.resolve(forSite(site.factor))

  // --- To connect real data, swap the line above for something like: ---
  //
  // const [ga4, gsc, semrush, ahrefs] = await Promise.all([
  //   fetch(`/api/ga4?site=${siteId}`).then((r) => r.json()),
  //   fetch(`/api/gsc?site=${siteId}`).then((r) => r.json()),
  //   fetch(`/api/semrush?site=${siteId}`).then((r) => r.json()),
  //   fetch(`/api/ahrefs?site=${siteId}`).then((r) => r.json()),
  // ])
  // return mapToDashboard({ ga4, gsc, semrush, ahrefs })
}
