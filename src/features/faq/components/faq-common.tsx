import { Brand } from '@/constants/brand'
import Button from '@nui/ui/button'
import Icon from '@nui/ui/icon'

import { AskMoreRow, FaqBackLink } from './faq.style'

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
      <Button to="/livechat" icon="lucide-messages-square" fontWeight="medium">
        Chat with us
      </Button>
    </AskMoreRow>
  )
}

export function FaqAnswer({ html }: { html: string }) {
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
