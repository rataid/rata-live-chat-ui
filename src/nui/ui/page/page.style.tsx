import tw, { styled } from 'twin.macro'

export const PageWrapper = tw.div`relative flex justify-between`

export const PageAside = tw.aside`hidden fixed w-[15.5rem] h-screen py-9 bg-white border-r border-gray-200 xl:block`

export const PageAsideMain = tw.div`flex flex-col gap-y-7`

type PageInnerProps = {
  hasSidenav: boolean
}

export const PageInner = styled.main<PageInnerProps>(({ hasSidenav }) => [
  tw`flex-1 flex flex-col w-full`,
  hasSidenav && tw`xl:pl-[15.5rem]`,
])

export const PageTop = tw.main`shrink-0 sticky top-0 z-[50]`

export const PageMain = tw.main`py-4 xl:py-10 flex flex-col gap-y-10`
