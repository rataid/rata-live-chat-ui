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

// Purple Smile Dental mark, 32px (same as the portal header)
export const AuthBrandLogo = styled.div.attrs({
  className: tw`mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white`,
})``

export const AuthBrandTitle = styled.h2.attrs({
  className: tw`font-semibold text-gray-900 text-xl`,
})``

export const AuthBrandSubtitle = styled.p.attrs({
  className: tw`text-gray-500`,
})``

export const AuthCard = styled.main.attrs({
  className: tw`w-full rounded-2xl border border-[#E9EBEF] bg-white p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sm:p-8`,
})``

export const AuthHeading = styled.div.attrs({ className: tw`mb-6` })``

export const AuthTitle = styled.h1.attrs({
  className: tw`text-xl font-semibold text-gray-900 sm:text-2xl`,
})``

export const AuthSubtitle = styled.p.attrs({
  className: tw`mt-1 text-sm text-gray-500`,
})``

export const AuthError = styled.div.attrs({
  className: tw`mb-4 rounded-lg bg-danger-50 px-3 py-2 text-sm text-danger-700`,
})``

export const AuthMore = styled.div.attrs({
  className: tw`flex justify-end pt-4`,
})``

export const AuthFooter = styled.p.attrs({
  className: tw`mt-3 text-center text-sm text-gray-500`,
})``

export const AuthBackLink = styled(Link).attrs({
  className: tw`mb-3 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700`,
})``

export const AuthLink = styled(Link).attrs({
  className: tw`text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline`,
})``

// "Belum menerima email? Kirim Ulang"
export const AuthResendRow = styled.p.attrs({
  className: tw`mt-4 text-center text-sm text-gray-500`,
})``

export const AuthResendButton = styled.button.attrs({
  className: tw`font-medium text-primary-600 hover:text-primary-700 hover:underline disabled:cursor-not-allowed disabled:text-gray-400 disabled:no-underline`,
})``

// Registration & activation guide, collapsible (under every auth page)
export const AuthGuide = styled.section.attrs({
  className: tw`w-full rounded-2xl bg-primary-50 px-4 py-3.5`,
})``

export const AuthGuideToggle = styled.button.attrs({
  className: tw`flex w-full items-center gap-3 text-left`,
})``

export const AuthGuideIcon = styled.span.attrs({
  className: tw`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white`,
})``

export const AuthGuideTitle = styled.span.attrs({
  className: tw`block text-sm font-semibold text-gray-900`,
})``

export const AuthGuideCaption = styled.span.attrs({
  className: tw`block text-sm text-gray-500`,
})``

// Height animates from 0 to auto (grid rows 0fr → 1fr), like the aligner
// tracker history
export const AuthGuideCollapse = styled.div.attrs<{ $open: boolean }>(
  ({ $open }) => ({
    className: [
      tw`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none`,
      $open ? tw`grid-rows-[1fr] opacity-100` : tw`grid-rows-[0fr] opacity-0`,
    ].join(' '),
  })
)<{ $open: boolean }>``

export const AuthGuideCollapseInner = styled.div.attrs({
  className: tw`min-h-0 overflow-hidden`,
})``

// Padding, not margin, so the closed panel is fully 0px tall
export const AuthGuideBody = styled.div.attrs({
  className: tw`pt-4 text-sm text-gray-700`,
})``

export const AuthGuideSteps = styled.ol.attrs({
  className: tw`mt-4 flex flex-col gap-4`,
})``

export const AuthGuideStep = styled.li.attrs({
  className: tw`flex gap-3`,
})``

export const AuthGuideStepNumber = styled.span.attrs({
  className: tw`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-primary-600`,
})``

export const AuthGuideStepTitle = styled.h3.attrs({
  className: tw`text-sm font-semibold text-gray-900`,
})``

export const AuthGuideStepText = styled.div.attrs({
  className: tw`mt-1.5 flex flex-col gap-1.5 text-sm text-gray-600`,
})``

export const AuthGuideFields = styled.ul.attrs({
  className: tw`grid grid-cols-2 gap-x-4 gap-y-1`,
})``

export const AuthGuideEmailSubject = styled.div.attrs({
  className: tw`mt-1 flex items-center gap-3 rounded-lg bg-white px-3 py-2.5`,
})``
