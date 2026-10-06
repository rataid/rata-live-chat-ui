import { BRAND_INFO, Brand } from '@/constants/brand'
import { getFaq } from '@/data/faq'

import { FaqGroups, FrequentlyAskedQuestions } from './faq'
import { EmptyContent } from './home.style'

// FAQ sections of a brand homepage, or a note while its FAQ is still empty
export function BrandFaq({ brand }: { brand: Brand }) {
  if (getFaq(brand).groups.length === 0) {
    return (
      <EmptyContent>
        Informasi {BRAND_INFO[brand].caption} akan segera tersedia.
      </EmptyContent>
    )
  }

  return (
    <>
      <FrequentlyAskedQuestions product={brand} />
      <FaqGroups product={brand} />
    </>
  )
}
