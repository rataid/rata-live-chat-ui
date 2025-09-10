import { useResponsive } from 'ahooks'

import { SideMain, SideWrapper } from './side.style'

export function Side({ children }: React.PropsWithChildren) {
  const { xl } = useResponsive()

  if (!xl) return null

  return (
    <SideWrapper>
      <SideMain>{children}</SideMain>
    </SideWrapper>
  )
}
