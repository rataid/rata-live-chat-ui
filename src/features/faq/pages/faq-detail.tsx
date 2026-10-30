import { useLoaderData } from 'react-router-dom'

import Icon from '@nui/ui/icon'

import { AskMore, BackToHomepage, FaqAnswer } from '../components/faq-common'
import {
  FaqAnswerBody,
  FaqAnswerEmpty,
  FaqDetailGrid,
  FaqDetailMain,
  FaqGroupNumber,
  FaqPageContainer,
  FaqPageHeading,
  FaqPageTitle,
  RelatedCard,
  RelatedItem,
  RelatedQuestion,
  RelatedTitle,
} from '../components/faq.style'
import { FaqDetailLoaderData } from './faq.route'

export function FaqDetailPage() {
  const { product, item, related } = useLoaderData() as FaqDetailLoaderData

  return (
    <FaqPageContainer>
      <BackToHomepage brand={product} />
      <FaqPageHeading>
        <FaqPageTitle>{item.question}</FaqPageTitle>
      </FaqPageHeading>

      <FaqDetailGrid>
        <FaqDetailMain>
          {item.answer ? (
            <FaqAnswerBody>
              <FaqAnswer html={item.answer} />
            </FaqAnswerBody>
          ) : (
            <FaqAnswerEmpty>
              Jawaban untuk pertanyaan ini belum tersedia.
            </FaqAnswerEmpty>
          )}
          <AskMore />
        </FaqDetailMain>

        {related.length > 0 && (
          <RelatedCard>
            <RelatedTitle>Pertanyaan Terkait</RelatedTitle>
            {related.map((faq, index) => (
              <RelatedItem key={faq.faqId} to={`/faq/${product}/${faq.faqId}`}>
                <FaqGroupNumber>{index + 1}</FaqGroupNumber>
                <RelatedQuestion>{faq.question}</RelatedQuestion>
                <Icon
                  icon="lucide-chevron-right"
                  size="xs"
                  className="shrink-0 text-primary-600"
                />
              </RelatedItem>
            ))}
          </RelatedCard>
        )}
      </FaqDetailGrid>
    </FaqPageContainer>
  )
}
