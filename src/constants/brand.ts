import { LogoRata, LogoTanam, LogoVinir } from '@/assets'

// The 3 products every patient can browse in the portal
export const BRANDS = ['rata', 'tanam', 'vinir'] as const

export type Brand = (typeof BRANDS)[number]

export const DEFAULT_BRAND: Brand = 'rata'

export const BRAND_INFO: Record<
  Brand,
  {
    label: string
    caption: string
    Logo: (props: { className?: string }) => JSX.Element
  }
> = {
  rata: { label: 'RATA', caption: 'RATA Aligner', Logo: LogoRata },
  tanam: { label: 'TANAM', caption: 'TANAM Implant', Logo: LogoTanam },
  vinir: { label: 'VINIR', caption: 'VINIR Veneer', Logo: LogoVinir },
}

export const isBrand = (value?: string): value is Brand =>
  BRANDS.includes(value as Brand)
