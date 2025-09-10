import tw from 'twin.macro'

export const PaneWrapper = tw.div`flex h-full flex-col xl:flex-row gap-12`

export const PaneMain = tw.div`flex-1 h-full xl:pt-6 pb-16 max-w-4xl`

export const PaneSecondary = tw.div`w-full pb-16 hidden xl:(block pt-6 w-[19rem])`
