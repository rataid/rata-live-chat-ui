import { Brand } from '@/constants/brand'

import rataId from './rata/id.json'
import tanamId from './tanam/id.json'
import vinirId from './vinir/id.json'

export type Intro = {
  text: string
}

export type IntroLocale = 'id'

export const DEFAULT_INTRO_LOCALE: IntroLocale = 'id'

// One JSON file per brand per language: src/data/intro/{brand}/{locale}.json
const introData: Record<Brand, Partial<Record<IntroLocale, Intro>>> = {
  rata: { id: rataId },
  tanam: { id: tanamId },
  vinir: { id: vinirId },
}

// Falls back to the default language when a translation doesn't exist yet
export function getIntro(brand: Brand, locale = DEFAULT_INTRO_LOCALE) {
  const byLocale = introData[brand]

  return byLocale[locale] ?? byLocale[DEFAULT_INTRO_LOCALE] ?? null
}
