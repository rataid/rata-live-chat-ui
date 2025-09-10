import { forwardRef } from 'react'

import { FabtipAvatar, FabtipMain, FabtipWrapper } from './fabtip.style'
import { FabtipProps } from './types'

export const Fabtip = forwardRef<HTMLDivElement, FabtipProps>(function Fabtip(
  {
    src = '/assets/img/smiledental-circle.png',
    alt = 'smiledental circle logo',
    children,
    ...props
  },
  forwarded
) {
  return (
    <FabtipWrapper>
      <FabtipAvatar>
        <img src={src} alt={alt} />
      </FabtipAvatar>
      <FabtipMain ref={forwarded} {...props}>
        {children}
      </FabtipMain>
    </FabtipWrapper>
  )
})
