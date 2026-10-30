import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

// Above the page like the tour overlay; the backdrop doesn't close it, so
// only the two buttons can be clicked
export const TourIntroBackdrop = styled.div.attrs({
  className: tw`fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 px-4`,
})``

export const TourIntroCard = styled.div.attrs({
  className: tw`w-full max-w-[30rem] rounded-xl bg-white shadow-lg`,
})``

export const TourIntroBody = styled.div.attrs({
  className: tw`flex flex-col gap-2 p-5`,
})``

export const TourIntroTitle = styled.h2.attrs({
  className: tw`text-base font-semibold text-gray-900`,
})``

export const TourIntroText = styled.p.attrs({
  className: tw`text-sm text-gray-500`,
})``

export const TourIntroFooter = styled.div.attrs({
  className: tw`grid grid-cols-2 gap-3 border-t border-gray-200 p-5`,
})``
