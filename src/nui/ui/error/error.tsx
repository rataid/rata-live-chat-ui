import {
  ErrorBody,
  ErrorContainer,
  ErrorMain,
  ErrorTitle,
  ErrorWrapper,
} from './error.style'
import { ErrorProps } from './types'

export function Error({ content, title, body, action, children }: ErrorProps) {
  return (
    <ErrorWrapper>
      <ErrorContainer>
        {content}
        <ErrorMain>
          {children && <ErrorBody>{children}</ErrorBody>}
          <ErrorTitle>{title}</ErrorTitle>
          <ErrorBody>{body}</ErrorBody>
        </ErrorMain>
        <div className="flex gap-6">{action}</div>
      </ErrorContainer>
    </ErrorWrapper>
  )
}
