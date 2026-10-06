import { Brand } from '@/constants/brand'

import rataId from './rata/id.json'
import tanamId from './tanam/id.json'
import vinirId from './vinir/id.json'

export type FaqItem = {
  faqId: number
  question: string
  shortAnswer: string
  // HTML, rendered through FaqAnswer
  answer: string
  // Shown in "Frequently Asked Questions" on the homepage
  isFeatured: boolean
}

export type FaqGroup = {
  groupId: number
  groupName: string
  groupDescription: string
  faqItems: FaqItem[]
}

export type FaqData = {
  groups: FaqGroup[]
}

// FAQ products are the portal brands
export type FaqProduct = Brand

export type FaqLocale = 'id'

export const DEFAULT_FAQ_LOCALE: FaqLocale = 'id'

// One JSON file per product per language: src/data/faq/{product}/{locale}.json
// To add English: create en.json next to id.json and register it here
const faqData: Record<FaqProduct, Partial<Record<FaqLocale, FaqData>>> = {
  rata: { id: rataId },
  tanam: { id: tanamId as FaqData },
  vinir: { id: vinirId as FaqData },
}

// Falls back to the default language when a translation doesn't exist yet
export function getFaq(product: FaqProduct, locale = DEFAULT_FAQ_LOCALE) {
  return faqData[product][locale] ?? faqData[product][DEFAULT_FAQ_LOCALE]!
}

export function getFeaturedFaqs(product: FaqProduct, locale?: FaqLocale) {
  return getFaq(product, locale).groups.flatMap((group) =>
    group.faqItems.filter((item) => item.isFeatured)
  )
}

export function findFaqGroup(
  product: FaqProduct,
  groupId: number,
  locale?: FaqLocale
) {
  return getFaq(product, locale).groups.find(
    (group) => group.groupId === groupId
  )
}

export function findFaqItem(
  product: FaqProduct,
  faqId: number,
  locale?: FaqLocale
) {
  for (const group of getFaq(product, locale).groups) {
    const item = group.faqItems.find((faq) => faq.faqId === faqId)
    if (item) return { item, group }
  }

  return undefined
}
