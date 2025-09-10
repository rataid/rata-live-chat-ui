import tw, { css, styled } from 'twin.macro'

export const PaginationHeaderWrapper = tw.div`pb-6 flex flex-wrap items-center gap-y-3 justify-end xl:(justify-between flex-nowrap) gap-x-6`

export const PaginationHeaderTitle = tw.div`text-sm text-gray-700 w-full font-semibold`

export const PaginationHeaderSelect = styled.div(() => [
  css`
    :not(:has(div)) {
      ${tw`hidden`}
    }
  `,
])

export const PaginationHeaderFilter = tw.div`flex flex-1 flex-wrap xl:flex-nowrap gap-4 items-center justify-end`

export const PaginationHeaderSearch = tw.div`flex-1 w-full min-w-[12.5rem] xl:(min-w-[20rem] max-w-xs) h-10 leading-10`

export const PaginationHeaderSelected = tw.div`w-fit h-10 leading-10 absolute xl:relative`
