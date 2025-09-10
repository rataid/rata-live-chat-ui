import tw, { styled } from 'twin.macro'

type DialogHeadingProps = {
  inline?: boolean
}

export const DialogHeadingMain = styled.div<DialogHeadingProps>(
  ({ inline = false }) => [inline && tw`flex items-center justify-between`]
)

export const DialogHeadingWrapper = tw.div`sticky top-0 pt-4 xl:pt-8 pb-6 z-30 bg-white`

export const DialogHeadingTitle = tw.div`text-2xl text-gray-900 font-semibold tracking-tight`

export const DialogHeadingBody = styled.div<DialogHeadingProps>(
  ({ inline = false }) => [!inline && tw`pt-2`, tw`text-sm text-gray-500`]
)
