import Icon from '../icon'
import {
  NotifIconEdge,
  NotifMain,
  NotifMessage,
  NotifTitle,
  NotifWrapper,
} from './notif.style'
import { NotifProps } from './types'

export function Notif({
  message = '',
  type = 'info',
  title,
  icon,
}: NotifProps) {
  return (
    <NotifWrapper>
      {icon && (
        <NotifIconEdge type={type}>
          <Icon icon={icon as string} size="2xs" />
        </NotifIconEdge>
      )}
      <NotifMain>
        {title && <NotifTitle>{title}</NotifTitle>}
        <NotifMessage>{message}</NotifMessage>
      </NotifMain>
    </NotifWrapper>
  )
}
