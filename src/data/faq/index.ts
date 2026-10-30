import { Brand } from '@/constants/brand'

import rataId from './rata/id.json'

export type FaqItem = {
  faqId: number
  question: string
  // HTML, rendered through FaqAnswer
  answer: string
}

export type FaqGroup = {
  groupId: number
  groupName: string
  faqItems: FaqItem[]
}

export type FaqData = {
  // "Frequently Asked Questions" on the homepage, separate from the groups
  faqs: FaqItem[]
  groups: FaqGroup[]
}

// FAQ products are the portal brands
export type FaqProduct = Brand

export type FaqLocale = 'id'

export const DEFAULT_FAQ_LOCALE: FaqLocale = 'id'

const EMPTY_FAQ: FaqData = { faqs: [], groups: [] }

// One JSON file per product per language: src/data/faq/{product}/{locale}.json
// To add English: create en.json next to id.json and register it here.
// Tanam and Vinir aren't used yet: their JSON files exist but aren't registered.
const faqData: Partial<
  Record<FaqProduct, Partial<Record<FaqLocale, FaqData>>>
> = {
  rata: { id: rataId },
}

// Falls back to the default language when a translation doesn't exist yet,
// and to an empty FAQ for products without data
export function getFaq(product: FaqProduct, locale = DEFAULT_FAQ_LOCALE) {
  const data = faqData[product]

  return data?.[locale] ?? data?.[DEFAULT_FAQ_LOCALE] ?? EMPTY_FAQ
}

export function getFeaturedFaqs(product: FaqProduct, locale?: FaqLocale) {
  return getFaq(product, locale).faqs
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
  const { faqs, groups } = getFaq(product, locale)

  for (const group of groups) {
    const item = group.faqItems.find((faq) => faq.faqId === faqId)
    if (item) return { item, group, siblings: group.faqItems }
  }

  // From the separate FAQ list: no group, no related questions
  const item = faqs.find((faq) => faq.faqId === faqId)
  if (item) return { item, group: undefined, siblings: [] }

  return undefined
}
