import { useLoaderData } from 'react-router-dom'

import { AskMore, BackToHomepage } from '../components/faq-common'
import {
  FaqAnswerEmpty,
  FaqGroupList,
  FaqGroupListItem,
  FaqGroupQuestion,
  FaqGroupShortAnswer,
  FaqPageContainer,
  FaqPageHeading,
  FaqPageSubtitle,
  FaqPageTitle,
} from '../components/faq.style'
import { FaqGroupLoaderData } from './faq.route'

export function FaqGroupPage() {
  const { product, group } = useLoaderData() as FaqGroupLoaderData

  return (
    <FaqPageContainer>
      <BackToHomepage brand={product} />
      <FaqPageHeading>
        <FaqPageTitle>{group.groupName}</FaqPageTitle>
        <FaqPageSubtitle>
          {group.groupDescription} · {group.faqItems.length} pertanyaan
        </FaqPageSubtitle>
      </FaqPageHeading>

      {group.faqItems.length > 0 ? (
        <FaqGroupList>
          {group.faqItems.map((faq) => (
            <li key={faq.faqId} className="first:[&>a]:border-t-0">
              <FaqGroupListItem to={`/faq/${product}/${faq.faqId}`}>
                <FaqGroupQuestion>{faq.question}</FaqGroupQuestion>
                {faq.shortAnswer && (
                  <FaqGroupShortAnswer>{faq.shortAnswer}</FaqGroupShortAnswer>
                )}
              </FaqGroupListItem>
            </li>
          ))}
        </FaqGroupList>
      ) : (
        <FaqAnswerEmpty>Belum ada pertanyaan di grup ini.</FaqAnswerEmpty>
      )}

      <AskMore />
    </FaqPageContainer>
  )
}
