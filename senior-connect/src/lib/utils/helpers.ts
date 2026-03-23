import { SEKTORER } from './constants'

export function anonymizePostnummer(postnummer: string): string {
  if (postnummer.length < 2) return postnummer
  return postnummer.substring(0, 2) + 'xx'
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trimEnd() + '...'
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function getSektorLabel(value: string): string {
  const sektor = SEKTORER.find(s => s.value === value)
  return sektor?.label ?? value
}
