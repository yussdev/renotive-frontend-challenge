/**
 * Tiny formatting helpers shared across the dashboard UI.
 */
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})

const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit'
})

export function useFormat() {
  function formatCurrency(amount: number): string {
    return currencyFormatter.format(amount)
  }

  function formatCompactCurrency(amount: number): string {
    return compactCurrencyFormatter.format(amount)
  }

  function formatDate(iso: string): string {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return dateFormatter.format(d)
  }

  function formatDateTime(iso: string): string {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return dateTimeFormatter.format(d)
  }

  return { formatCurrency, formatCompactCurrency, formatDate, formatDateTime }
}
