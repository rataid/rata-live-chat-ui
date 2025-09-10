import tw, { css, styled } from 'twin.macro'

export const CrumbWrapper = styled.ol(() => [
  tw`flex items-center gap-x-2 text-xs text-gray-900 xl:(text-sm pt-1 leading-10)`,
  css`
    .active {
      font-weight: 700;
      ${tw`text-primary-600`}
    }
  `,
])

export const CrumbItem = tw.li`flex gap-x-2`

export const CrumbItemSeparator = tw.li`text-gray-400`
