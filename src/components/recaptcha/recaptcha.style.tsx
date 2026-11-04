import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

// The checkbox widget is 304×78px; keep its space while the script loads
export const RecaptchaWrapper = styled.div.attrs({
  className: tw`my-3 flex min-h-[78px] justify-center`,
})``

export const RecaptchaError = styled.p.attrs({
  className: tw`my-3 text-center text-sm text-danger-600`,
})``
