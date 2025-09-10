import {
  TopbarStatusIcon,
  TopbarStatusMessage,
  TopbarStatusWrapper,
} from './status.style'

export type TopbarStatusProps = {
  icon: React.ReactElement
  message: string
}

export default function TopbarStatus({ icon, message }: TopbarStatusProps) {
  return (
    <TopbarStatusWrapper>
      <TopbarStatusIcon>{icon}</TopbarStatusIcon>
      <TopbarStatusMessage>{message}</TopbarStatusMessage>
    </TopbarStatusWrapper>
  )
}
