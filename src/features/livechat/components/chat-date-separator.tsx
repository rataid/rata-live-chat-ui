import Icon from '@nui/ui/icon'
import { formatChatDate } from '@utils'

import { ChatDateSeparatorPill, ChatDateSeparatorWrapper } from './chat.style'

export function ChatDateSeparator({ date }: { date: string }) {
  return (
    <ChatDateSeparatorWrapper>
      <ChatDateSeparatorPill>
        {formatChatDate(date, true)}
        <Icon icon="lucide-chevron-down" size="2xs" />
      </ChatDateSeparatorPill>
    </ChatDateSeparatorWrapper>
  )
}
