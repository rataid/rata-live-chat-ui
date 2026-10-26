import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

// 100dvh follows the visible area on iOS Safari
export const NotFoundWrapper = styled.main.attrs({
  className: tw`flex w-full items-center justify-center bg-white px-4 py-10`,
})`
  min-height: 100vh;
  min-height: 100dvh;
`

export const NotFoundContainer = styled.div.attrs({
  className: tw`flex w-full max-w-[28rem] flex-col items-center text-center`,
})``

export const NotFoundLogo = styled.div.attrs({
  className: tw`flex mb-4 h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white`,
})``

export const NotFoundCard = styled.div.attrs({
  className: tw`w-full text-left mt-5 rounded-2xl border border-[#E9EBEF] bg-white p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sm:p-8`,
})``

export const NotFoundTitle = styled.h1.attrs({
  className: tw`text-xl font-semibold text-gray-900 sm:text-2xl`,
})``

export const NotFoundText = styled.p.attrs({
  className: tw`mt-1 text-sm text-gray-500`,
})``

export const NotFoundAction = styled.div.attrs({
  className: tw`mt-3`,
})``
