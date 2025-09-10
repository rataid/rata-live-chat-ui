import tw from 'twin.macro'

export const AuthFormLoginWrapper = tw.div`grid px-6 lg:(grid-cols-2 px-0) rounded-lg overflow-hidden bg-white`

export const AuthFormLoginImage = tw.div`w-[26.5625rem] h-[36.25rem] lg:(flex items-center justify-center) bg-primary-600 m-1 rounded-lg hidden`

export const AuthFormLoginMain = tw.div`w-full h-screen lg:(w-[26.5625rem] h-full) flex items-center justify-center bg-white`

export const AuthFormLoginMainInner = tw.div`w-80 flex flex-col gap-y-8`

export const AuthFormLoginMainImage = tw.div`flex h-24 w-full items-center justify-center text-primary-600 lg:hidden`

export const AuthFormLoginHeading = tw.header`text-center`

export const AuthFormLoginTitle = tw.h1`text-3xl font-semibold text-gray-900`

export const AuthFormLoginSubtitle = tw.p`leading-6 text-sm text-gray-500`

export const AuthFormLoginForm = tw.div``

export const AuthFormLoginMore = tw.div`flex items-center justify-between text-sm`
