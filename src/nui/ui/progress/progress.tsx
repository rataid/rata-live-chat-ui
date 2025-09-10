import {
  ProgressBar,
  ProgressInfo,
  ProgressLabel,
  ProgressLoader,
  ProgressStatus,
  ProgressWrapper,
} from './progress.style'
import { ProgressProps } from './types'

export function Progress({ status, value, children }: ProgressProps) {
  return (
    <ProgressWrapper>
      <ProgressBar>
        <ProgressLoader value={value} />
      </ProgressBar>
      <ProgressInfo>
        <ProgressLabel>{children}</ProgressLabel>
        <ProgressStatus>{status}</ProgressStatus>
      </ProgressInfo>
    </ProgressWrapper>
  )
}
