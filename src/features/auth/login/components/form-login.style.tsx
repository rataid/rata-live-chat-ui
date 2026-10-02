import { Link } from 'react-router-dom'
import tw, { css, styled } from 'twin.macro'

// 100dvh follows the visible area on iOS Safari (100vh includes the space behind the toolbars)
export const AuthLayoutWrapper = styled.div(() => [
  tw`flex w-full items-center justify-center bg-white px-4 py-5 sm:(px-6 py-10)`,
  css`
    min-height: 100vh;
    min-height: 100dvh;
  `,
])

export const AuthLayoutContainer = tw.div`flex w-full max-w-[28rem] flex-col gap-y-6 sm:gap-y-8`

export const AuthBrand = tw.header`flex flex-col items-center text-center`

export const AuthBrandLogo = tw.div`mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white sm:(h-14 w-14)`

export const AuthBrandTitle = tw.h2`text-base font-semibold text-gray-900 sm:text-lg`

export const AuthBrandSubtitle = tw.p`text-xs text-gray-500`

export const AuthFormLoginMain = tw.main`w-full rounded-2xl border border-[#E9EBEF] bg-white p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sm:p-8`

export const AuthFormLoginHeading = tw.div`mb-6`

export const AuthFormLoginTitle = tw.h1`text-xl font-semibold text-gray-900 sm:text-2xl`

export const AuthFormLoginSubtitle = tw.p`mt-1 text-sm text-gray-500`

export const AuthFormLoginError = tw.div`mb-4 rounded-lg bg-danger-50 px-3 py-2 text-sm text-danger-700`

export const AuthFormLoginMore = tw.div`flex justify-end pt-4`

export const AuthFormLoginFooter = tw.p`mt-3 text-center text-sm text-gray-500`

export const AuthBackLink = tw(
  Link
)`mb-3 inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700`

export const AuthLink = tw(
  Link
)`text-sm font-medium text-primary-600 hover:(text-primary-700 underline)`
