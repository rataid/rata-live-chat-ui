import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const CrumbWrapper = styled.ol.attrs({
  className: tw`flex items-center gap-x-2 text-xs text-gray-900 xl:text-sm xl:pt-1 xl:leading-10`,
})`
  .active {
    font-weight: 700;
    color: var(--nui-color-primary-600);
  }
`

export const CrumbItem = styled.li.attrs({
  className: tw`flex gap-x-2`,
})``

export const CrumbItemSeparator = styled.li.attrs({
  className: tw`text-gray-400`,
})``
