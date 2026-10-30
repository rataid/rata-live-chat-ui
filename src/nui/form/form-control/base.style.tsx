import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

import { FormHelperWrapper } from '../form-helper/form-helper.style'

// Height animates from 0 to auto (grid rows 0fr → 1fr), so the fields below
// move down smoothly. -mt-1.5 cancels the wrapper's gap while it's closed;
// the message adds it back as padding.
export const FormControlBaseErrorCollapse = styled.div.attrs<{
  $open: boolean
}>(({ $open }) => ({
  className: [
    tw`-mt-1.5 grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none`,
    $open ? tw`grid-rows-[1fr] opacity-100` : tw`grid-rows-[0fr] opacity-0`,
  ].join(' '),
}))<{ $open: boolean }>``

export const FormControlBaseErrorInner = styled.div.attrs({
  className: tw`min-h-0 overflow-hidden`,
})``

// In the flow (not absolute) and not clamped, so a long message wraps to
// the next line instead of ending in an ellipsis
export const FormControlBaseError = styled(FormHelperWrapper)`
  position: static;
  display: block;
  height: auto;
  padding-top: 0.375rem;
  overflow: visible;
  -webkit-line-clamp: unset;
  color: var(--nui-color-danger-500);
`
