import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

export const InstallOverlay = styled.div.attrs({
  className: tw`fixed inset-0 z-50 bg-black/20 duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`,
})``

export const InstallSheet = styled.div.attrs({
  className: tw`fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[90dvh] max-w-md overflow-y-auto rounded-t-3xl bg-white px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-2 shadow-xl outline-none duration-300 ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom motion-reduce:animate-none sm:bottom-6 sm:rounded-3xl`,
})``

export const InstallHandle = styled.div.attrs({
  className: tw`mx-auto mb-3 h-1 w-10 rounded-full bg-gray-200`,
})``

export const InstallHeader = styled.div.attrs({
  className: tw`mb-6 flex items-center gap-3`,
})``

export const InstallAppName = styled.p.attrs({
  className: tw`text-sm font-semibold text-gray-900`,
})``

export const InstallAppHost = styled.p.attrs({
  className: tw`text-sm text-gray-500`,
})``

export const InstallTitle = styled.h2.attrs({
  className: tw`text-xl font-semibold leading-7 text-gray-900`,
})``

export const InstallDescription = styled.p.attrs({
  className: tw`mt-2 text-sm leading-5 text-gray-500`,
})``

export const InstallSteps = styled.ol.attrs({
  className: tw`my-5 flex flex-col gap-3`,
})``

export const InstallStepItem = styled.li.attrs({
  className: tw`flex items-center gap-3`,
})``

export const InstallStepNumber = styled.span.attrs({
  className: tw`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-medium text-primary-600`,
})``

export const InstallStepText = styled.span.attrs({
  className: tw`min-w-0 flex-1 text-sm leading-5 text-gray-700 [&_strong]:font-semibold [&_strong]:text-gray-900`,
})``

export const InstallStepImage = styled.img.attrs({
  className: tw`h-[72px] w-[150px] shrink-0 rounded-lg bg-gray-100 object-cover`,
})``

export const InstallError = styled.p.attrs({
  className: tw`mb-3 text-sm text-red-600`,
})``

export const InstallButton = styled.button.attrs({
  className: tw`w-full rounded-lg bg-[#6941c6] px-4 py-3 text-sm font-medium text-white hover:bg-[#53389e] disabled:opacity-50`,
})``

export const InstallLater = styled.button.attrs({
  className: tw`mt-3 w-full py-2 text-sm text-gray-500`,
})``
