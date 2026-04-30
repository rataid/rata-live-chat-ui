import { format } from 'date-fns'

export const sanitizeFileName = (filename: string[]) => {
  const parsedFilename = JSON.parse(JSON.stringify(filename))
  return parsedFilename
    .map((s: string) => s.trim())
    .map((item: string) => item.replace(/^"|"$/g, ''))
}

export const getFileExtension = (name: string) =>
  name.split('.').pop()?.toUpperCase() || 'FILE'

export const toInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

export const formatRupiah = (value: string | number, usePrefix = true) => {
  if (usePrefix) {
    return `Rp. ${Math.floor(Number(value)).toLocaleString('id-ID')}`
  } else {
    return `${Math.floor(Number(value)).toLocaleString('id-ID')}`
  }
}

export const kebabToSnake = (value: string) => value.replace(/-/g, '_')

export const constantToTitle = (value: string) =>
  value
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

export function NewformatDate(
  value?: string | null,
  pattern = 'dd/MM/yyyy HH:mm'
) {
  if (!value) return '-'

  const date = new Date(value)

  if (isNaN(date.getTime())) return '-'

  return format(date, pattern)
}

export function getFileName(path?: string | null): string {
  if (!path) return ''
  return path.split('/').pop() ?? ''
}

export function getFileNameFromUrl(url: string) {
  try {
    const pathname = new URL(url).pathname
    return pathname.substring(pathname.lastIndexOf('/') + 1)
  } catch {
    return ''
  }
}

export function calculateTotal({
  price,
  qty,
  vatRate = 11,
}: {
  price: number
  qty: number
  vatRate?: number
}) {
  const subtotal = price * qty
  const ppn = subtotal * (vatRate / 100)
  const total = subtotal + ppn

  return total
}

export function generateDummyUUID() {
  return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
