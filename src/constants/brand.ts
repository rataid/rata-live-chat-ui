import logoRata from '@/assets/images/logo-rata.png'
import logoTanam from '@/assets/images/logo-tanam.png'
import logoVinir from '@/assets/images/logo-vinir.png'

// The 3 products every patient can browse in the portal
export const BRANDS = ['rata', 'tanam', 'vinir'] as const

export type Brand = (typeof BRANDS)[number]

export const DEFAULT_BRAND: Brand = 'rata'

export const BRAND_INFO: Record<
  Brand,
  {
    label: string
    caption: string
    // Image url, rendered with <img alt={label}>
    logo: string
  }
> = {
  rata: { label: 'RATA', caption: 'RATA Aligner', logo: logoRata },
  tanam: { label: 'TANAM', caption: 'TANAM Implant', logo: logoTanam },
  vinir: { label: 'VINIR', caption: 'VINIR Veneer', logo: logoVinir },
}

export const isBrand = (value?: string): value is Brand =>
  BRANDS.includes(value as Brand)
