import { Form } from 'react-router-dom'

import { LogoSmiledental } from '@/assets'
import Icon from '@nui/ui/icon'

import {
  ChatHeaderBrand,
  ChatHeaderLogo,
  ChatHeaderLogout,
  ChatHeaderSubtitle,
  ChatHeaderTitle,
  ChatHeaderWrapper,
} from './chat.style'

type ChatHeaderProps = {
  title: string
  subtitle?: string
}

export function ChatHeader({ title, subtitle }: ChatHeaderProps) {
  return (
    <ChatHeaderWrapper>
      <ChatHeaderBrand>
        <ChatHeaderLogo>
          <div tw="w-1/2">
            <LogoSmiledental />
          </div>
        </ChatHeaderLogo>
        <div tw="min-w-0">
          <ChatHeaderTitle>{title}</ChatHeaderTitle>
          {subtitle && <ChatHeaderSubtitle>{subtitle}</ChatHeaderSubtitle>}
        </div>
      </ChatHeaderBrand>
      <Form method="post" action="/logout">
        <ChatHeaderLogout type="submit">
          <Icon icon="lucide-log-out" size="xs" />
          Logout
        </ChatHeaderLogout>
      </Form>
    </ChatHeaderWrapper>
  )
}
