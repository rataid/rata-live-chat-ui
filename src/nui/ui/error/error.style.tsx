import tw from 'twin.macro'

export const ErrorWrapper = tw.div`grid place-content-center h-screen`

export const ErrorContainer = tw.div`flex flex-col items-center justify-center gap-y-10 px-20 py-24 text-center`

export const ErrorMain = tw.div`flex flex-col gap-y-1`

export const ErrorTitle = tw.div`text-3xl font-semibold text-gray-900`

export const ErrorBody = tw.div`text-sm text-gray-700 max-w-2xl`
