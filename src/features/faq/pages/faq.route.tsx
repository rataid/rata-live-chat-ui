import { LoaderFunctionArgs } from 'react-router-dom'

import { isBrand } from '@/constants/brand'
import { FaqProduct, findFaqGroup, findFaqItem } from '@/data/faq'

const notFound = () => new Response('Not Found', { status: 404 })

function parseProduct(value?: string): FaqProduct {
  if (!isBrand(value)) throw notFound()
  return value
}

export async function faqDetailLoader({ params }: LoaderFunctionArgs) {
  const product = parseProduct(params.product)
  const found = findFaqItem(product, Number(params.faqId))

  if (!found) throw notFound()

  // All other questions from the same group
  const related = found.siblings.filter(
    (item) => item.faqId !== found.item.faqId
  )

  return { product, item: found.item, group: found.group, related }
}

export async function faqGroupLoader({ params }: LoaderFunctionArgs) {
  const product = parseProduct(params.product)
  const group = findFaqGroup(product, Number(params.groupId))

  if (!group) throw notFound()

  return { product, group }
}

export type FaqDetailLoaderData = Awaited<ReturnType<typeof faqDetailLoader>>
export type FaqGroupLoaderData = Awaited<ReturnType<typeof faqGroupLoader>>
