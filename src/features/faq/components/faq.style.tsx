import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

export const FaqPageContainer = styled.div.attrs({
  className: tw`flex w-full flex-col gap-6 py-6 sm:py-10`,
})``

export const FaqBackLink = styled(Link).attrs({
  className: tw`inline-flex w-fit items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700`,
})``

export const FaqPageHeading = styled.header.attrs({
  className: tw`flex flex-col gap-1`,
})``

export const FaqPageTitle = styled.h1.attrs({
  className: tw`text-2xl font-semibold text-gray-900 sm:text-3xl`,
})``

export const FaqPageSubtitle = styled.p.attrs({
  className: tw`text-sm text-gray-500`,
})``

// Detail page: answer + related questions side by side on desktop
export const FaqDetailGrid = styled.div.attrs({
  className: tw`grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_19.5rem] lg:gap-10`,
})``

export const FaqDetailMain = styled.div.attrs({
  className: tw`flex min-w-0 flex-col gap-6`,
})``

export const FaqAnswerBody = styled.div.attrs({
  className: tw`prose prose-sm max-w-none text-gray-700 sm:prose-base prose-p:my-0 sm:prose-p:my-0 lg:prose-img:my-0 lg:prose-img:max-h-[calc(100vh-13.5rem)] lg:prose-img:w-auto`,
})``

export const FaqAnswerEmpty = styled.p.attrs({
  className: tw`text-sm text-gray-500`,
})``

export const RelatedCard = styled.aside.attrs({
  className: tw`flex flex-col rounded-xl border border-gray-200 bg-white p-4`,
})``

export const RelatedTitle = styled.h2.attrs({
  className: tw`pb-2 text-sm font-semibold text-gray-900`,
})``

export const RelatedItem = styled(Link).attrs({
  className: tw`-mx-2 flex items-center gap-3 rounded-lg border-t border-gray-200 px-2 py-3 transition-colors first-of-type:border-t-0 hover:bg-gray-50`,
})``

export const RelatedQuestion = styled.span.attrs({
  className: tw`min-w-0 flex-1 text-xs font-medium text-gray-900`,
})``

// Group page list
export const FaqGroupList = styled.ol.attrs({
  className: tw`mt-2 divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white`,
})``

export const FaqGroupListItem = styled(Link).attrs({
  className: tw`flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-50`,
})``

export const FaqGroupNumber = styled.span.attrs({
  className: tw`w-4 shrink-0 text-xs font-medium tabular-nums text-primary-600`,
})``

export const FaqGroupQuestion = styled.span.attrs({
  className: tw`min-w-0 flex-1 text-sm font-medium text-gray-900`,
})``

export const AskMoreRow = styled.div.attrs({
  className: tw`flex flex-wrap items-center gap-3 text-sm font-medium text-gray-900`,
})``
