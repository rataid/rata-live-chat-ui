import { Brand } from '@/constants/brand'

import tanamId from './tanam/id.json'
import vinirId from './vinir/id.json'

export type TipsList = {
  label: string
  items: string[]
}

export type Tips = {
  title: string
  description: string
  // Things to do / to avoid, shown side by side
  dos: TipsList
  donts: TipsList
  note: string
}

export type TipsLocale = 'id'

export const DEFAULT_TIPS_LOCALE: TipsLocale = 'id'

// One JSON file per brand per language: src/data/tips/{brand}/{locale}.json
// Brands without a file have no tips section
const tipsData: Partial<Record<Brand, Partial<Record<TipsLocale, Tips>>>> = {
  tanam: { id: tanamId },
  vinir: { id: vinirId },
}

// Falls back to the default language when a translation doesn't exist yet
export function getTips(brand: Brand, locale = DEFAULT_TIPS_LOCALE) {
  const byLocale = tipsData[brand]

  return byLocale?.[locale] ?? byLocale?.[DEFAULT_TIPS_LOCALE] ?? null
}
