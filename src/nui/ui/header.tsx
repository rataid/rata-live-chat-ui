import Container from './container'
import {
  HeaderAction,
  HeaderInner,
  HeaderMain,
  HeaderTitle,
  HeaderWrapper,
} from './header.style'

type HeaderProps = {
  subtitle?: React.ReactNode
  action?: React.ReactNode
} & React.PropsWithChildren

export default function Header({ subtitle, action, children }: HeaderProps) {
  return (
    <HeaderWrapper>
      <Container>
        <HeaderInner>
          <HeaderMain>
            <HeaderTitle>{children}</HeaderTitle>
            {subtitle && <div>{subtitle}</div>}
          </HeaderMain>
          {action && <HeaderAction>{action}</HeaderAction>}
        </HeaderInner>
      </Container>
    </HeaderWrapper>
  )
}
