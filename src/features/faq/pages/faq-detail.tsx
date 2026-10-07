import { useLoaderData } from 'react-router-dom'

import { BRAND_INFO } from '@/constants/brand'
import Icon from '@nui/ui/icon'

import { AskMore, BackToHomepage, FaqAnswer } from '../components/faq-common'
import {
  FaqAnswerBody,
  FaqAnswerEmpty,
  FaqBreadcrumb,
  FaqBreadcrumbLink,
  FaqBreadcrumbProduct,
  FaqDetailGrid,
  FaqDetailMain,
  FaqPageContainer,
  FaqPageHeading,
  FaqPageTitle,
  RelatedCard,
  RelatedGroup,
  RelatedItem,
  RelatedQuestion,
  RelatedTitle,
} from '../components/faq.style'
import { FaqDetailLoaderData } from './faq.route'

export function FaqDetailPage() {
  const { product, item, group, related } =
    useLoaderData() as FaqDetailLoaderData

  return (
    <FaqPageContainer>
      <BackToHomepage brand={product} />
      <FaqPageHeading>
        <FaqPageTitle>{item.question}</FaqPageTitle>
        <FaqBreadcrumb aria-label="Breadcrumb">
          <FaqBreadcrumbProduct>
            {BRAND_INFO[product].label}
          </FaqBreadcrumbProduct>
          <Icon
            icon="lucide-chevron-right"
            size="xs"
            className="text-gray-400"
          />
          <FaqBreadcrumbLink to={`/faq/${product}/group/${group.groupId}`}>
            {group.groupName}
          </FaqBreadcrumbLink>
        </FaqBreadcrumb>
      </FaqPageHeading>

      <FaqDetailGrid>
        <FaqDetailMain>
          {item.answer ? (
            <FaqAnswerBody>
              <FaqAnswer html={item.answer} />
            </FaqAnswerBody>
          ) : (
            // No full answer yet: show the short one, or say it's coming
            <FaqAnswerEmpty>
              {item.shortAnswer ||
                'Jawaban untuk pertanyaan ini belum tersedia.'}
            </FaqAnswerEmpty>
          )}
          <AskMore />
        </FaqDetailMain>

        {related.length > 0 && (
          <RelatedCard>
            <RelatedTitle>Pertanyaan Terkait</RelatedTitle>
            {related.map((faq) => (
              <RelatedItem key={faq.faqId} to={`/faq/${product}/${faq.faqId}`}>
                <RelatedQuestion>{faq.question}</RelatedQuestion>
                <RelatedGroup>{group.groupName}</RelatedGroup>
              </RelatedItem>
            ))}
          </RelatedCard>
        )}
      </FaqDetailGrid>
    </FaqPageContainer>
  )
}
