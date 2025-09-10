import tw from 'twin.macro'

export const AppLayoutWrapper = tw.div`flex h-[calc(100vh-4.5rem)] justify-center w-full bg-gray-50 text-gray-500 xl:(h-screen bg-none)`

export const AppLayoutContainer = tw.div`flex-1 flex h-full flex-col max-w-3xl w-full xl:max-w-none overflow-y-scroll bg-white`
