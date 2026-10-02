import Icon from '@nui/ui/icon'
import { formatChatDate } from '@utils'

import { ChatDateSeparatorPill, ChatDateSeparatorWrapper } from './chat.style'

// Ported from crboard message-date-separator
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
