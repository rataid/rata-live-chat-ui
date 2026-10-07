import { Brand } from '@/constants/brand'
import Button from '@nui/ui/button'
import Icon from '@nui/ui/icon'

import { AskMoreRow, FaqBackLink } from './faq.style'

// Back to the homepage of the brand the question belongs to
export function BackToHomepage({ brand }: { brand: Brand }) {
  return (
    <FaqBackLink to={`/home/${brand}`}>
      <Icon icon="lucide-arrow-left" size="xs" />
      Back to Homepage
    </FaqBackLink>
  )
}

export function AskMore() {
  return (
    <AskMoreRow>
      Masih punya pertanyaan?
      <Button to="/chat" icon="lucide-messages-square" fontWeight="medium">
        Chat with us
      </Button>
    </AskMoreRow>
  )
}

// Answers are HTML authored in src/data/faq/*.json (bundled with the app).
// @todo: sanitize with DOMPurify before rendering if answers ever come from
// the backend or a CMS, otherwise this is an XSS hole
export function FaqAnswer({ html }: { html: string }) {
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
