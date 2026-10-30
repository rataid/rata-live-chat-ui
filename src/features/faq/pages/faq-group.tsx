import { useLoaderData } from 'react-router-dom'

import Icon from '@nui/ui/icon'

import { AskMore, BackToHomepage } from '../components/faq-common'
import {
  FaqAnswerEmpty,
  FaqGroupList,
  FaqGroupListItem,
  FaqGroupNumber,
  FaqGroupQuestion,
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
        <FaqPageSubtitle>{group.faqItems.length} pertanyaan</FaqPageSubtitle>
      </FaqPageHeading>

      {group.faqItems.length > 0 ? (
        <FaqGroupList>
          {group.faqItems.map((faq, index) => (
            <li key={faq.faqId}>
              <FaqGroupListItem to={`/faq/${product}/${faq.faqId}`}>
                <FaqGroupNumber>{index + 1}</FaqGroupNumber>
                <FaqGroupQuestion>{faq.question}</FaqGroupQuestion>
                <Icon
                  icon="lucide-chevron-right"
                  size="xs"
                  className="shrink-0 text-primary-600"
                />
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
