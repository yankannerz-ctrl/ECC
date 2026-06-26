// Period-aware scaling so the This Month / Last Month / Last 3 Months
// toggle actually changes the count-based metrics. Rates (conversion,
// CTR, bounce, position) intentionally stay stable — they don't scale
// with the length of the window.

export const PERIODS = {
  'This Month': { mult: 1, deltaLabel: 'vs last month', suffix: 'MoM' },
  'Last Month': { mult: 0.91, deltaLabel: 'vs prior month', suffix: 'MoM' },
  'Last 3 Months': { mult: 2.94, deltaLabel: 'vs prior quarter', suffix: 'QoQ' },
}

export function periodOf(period) {
  return PERIODS[period] || PERIODS['This Month']
}

// Scale a raw integer by the active period.
export function scaleNum(n, period) {
  return Math.round(n * periodOf(period).mult)
}

// Scale a "$21,300" style currency string and re-format it.
export function scaleMoney(str, period) {
  const n = Number(String(str).replace(/[^0-9.]/g, ''))
  return '$' + scaleNum(n, period).toLocaleString()
}
