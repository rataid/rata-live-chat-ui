import { Link } from 'react-router-dom'

import { IconBookOpenText, IconHistory } from '@/assets'
import { FaqProduct, getFaq, getFeaturedFaqs } from '@/data/faq'
import Icon from '@nui/ui/icon'

import {
  FaqGroupCard,
  FaqGroupCount,
  FaqGroupDescription,
  FaqGroupGrid,
  FaqGroupTitle,
  FaqItem,
  FaqList,
  FaqNumber,
  Section,
  SectionTitle,
} from './home.style'

type FaqSectionProps = {
  product: FaqProduct
}

export function FrequentlyAskedQuestions({ product }: FaqSectionProps) {
  const faqs = getFeaturedFaqs(product)

  if (faqs.length === 0) return null

  return (
    <Section>
      <SectionTitle className="w-fit" data-tour="faq-title">
        <IconHistory className="h-4 w-4 shrink-0 text-primary-700" />
        Frequently Asked Questions
      </SectionTitle>
      <FaqList>
        {faqs.map((faq, index) => (
          <li key={faq.faqId}>
            <FaqItem as={Link} to={`/faq/${product}/${faq.faqId}`}>
              <FaqNumber>{index + 1}</FaqNumber>
              <span className="min-w-0 flex-1">{faq.question}</span>
              <Icon
                icon="lucide-chevron-right"
                size="xs"
                className="shrink-0 text-primary-600"
              />
            </FaqItem>
          </li>
        ))}
      </FaqList>
    </Section>
  )
}

export function FaqGroups({ product }: FaqSectionProps) {
  const { groups } = getFaq(product)

  if (groups.length === 0) return null

  return (
    <Section data-tour="faq-groups">
      <SectionTitle>
        <IconBookOpenText className="h-4 w-4 shrink-0 text-primary-700" />
        FAQ Groups
      </SectionTitle>
      <FaqGroupGrid>
        {groups.map((group) => (
          <FaqGroupCard
            key={group.groupId}
            as={Link}
            to={`/faq/${product}/group/${group.groupId}`}
          >
            <FaqGroupTitle>{group.groupName}</FaqGroupTitle>
            <FaqGroupDescription>{group.groupDescription}</FaqGroupDescription>
            <FaqGroupCount>{group.faqItems.length} pertanyaan</FaqGroupCount>
          </FaqGroupCard>
        ))}
      </FaqGroupGrid>
    </Section>
  )
}
