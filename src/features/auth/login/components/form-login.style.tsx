import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

// 100dvh follows the visible area on iOS Safari (100vh includes the space behind the toolbars)
export const AuthLayoutWrapper = styled.div.attrs({
  className: tw`flex w-full items-center justify-center bg-white px-4 py-5 sm:px-6 sm:py-10`,
})`
  min-height: 100vh;
  min-height: 100dvh;
`

export const AuthLayoutContainer = styled.div.attrs({
  className: tw`flex w-full max-w-[28rem] flex-col gap-y-6 sm:gap-y-8`,
})``

export const AuthBrand = styled.header.attrs({
  className: tw`flex flex-col items-center text-center`,
})``

export const AuthBrandLogo = styled.div.attrs({
  className: tw`mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white sm:h-14 sm:w-14`,
})``

export const AuthBrandTitle = styled.h2.attrs({
  className: tw`text-base font-semibold text-gray-900 sm:text-lg`,
})``

export const AuthBrandSubtitle = styled.p.attrs({
  className: tw`text-xs text-gray-500`,
})``

export const AuthFormLoginMain = styled.main.attrs({
  className: tw`w-full rounded-2xl border border-[#E9EBEF] bg-white p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sm:p-8`,
})``

export const AuthFormLoginHeading = styled.div.attrs({ className: tw`mb-6` })``

export const AuthFormLoginTitle = styled.h1.attrs({
  className: tw`text-xl font-semibold text-gray-900 sm:text-2xl`,
})``

export const AuthFormLoginSubtitle = styled.p.attrs({
  className: tw`mt-1 text-sm text-gray-500`,
})``

export const AuthFormLoginError = styled.div.attrs({
  className: tw`mb-4 rounded-lg bg-danger-50 px-3 py-2 text-sm text-danger-700`,
})``

export const AuthFormLoginMore = styled.div.attrs({
  className: tw`flex justify-end pt-4`,
})``

export const AuthFormLoginFooter = styled.p.attrs({
  className: tw`mt-3 text-center text-sm text-gray-500`,
})``

export const AuthBackLink = styled(Link).attrs({
  className: tw`mb-3 inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700`,
})``

export const AuthLink = styled(Link).attrs({
  className: tw`text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline`,
})``
