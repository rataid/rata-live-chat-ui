import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

export const FaqPageContainer = styled.div.attrs({
  className: tw`flex w-full flex-col gap-4 py-6 sm:py-10`,
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

export const FaqBreadcrumb = styled.nav.attrs({
  className: tw`flex flex-wrap items-center gap-1.5 text-sm`,
})``

export const FaqBreadcrumbProduct = styled.span.attrs({
  className: tw`font-semibold text-primary-600`,
})``

export const FaqBreadcrumbLink = styled(Link).attrs({
  className: tw`text-gray-500 hover:text-gray-700 hover:underline`,
})``

// Detail page: answer + related questions side by side on desktop
export const FaqDetailGrid = styled.div.attrs({
  className: tw`grid items-start gap-6 pt-2 lg:grid-cols-[minmax(0,1fr)_19.5rem] lg:gap-10`,
})``

export const FaqDetailMain = styled.div.attrs({
  className: tw`flex min-w-0 flex-col gap-6`,
})``

export const FaqAnswerBody = styled.div.attrs({
  className: tw`prose prose-sm max-w-none text-gray-700 sm:prose-base`,
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
  className: tw`flex flex-col gap-1 border-t border-gray-200 py-3 first-of-type:border-t-0 last:pb-0`,
})``

export const RelatedQuestion = styled.span.attrs({
  className: tw`text-sm font-medium text-gray-900`,
})``

export const RelatedGroup = styled.span.attrs({
  className: tw`text-xs text-gray-400`,
})``

// Group page list
export const FaqGroupList = styled.ul.attrs({
  className: tw`mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white`,
})``

export const FaqGroupListItem = styled(Link).attrs({
  className: tw`flex flex-col gap-1 border-t border-gray-200 px-4 py-4 hover:bg-gray-50`,
})``

export const FaqGroupQuestion = styled.span.attrs({
  className: tw`text-sm font-semibold text-gray-900 sm:text-base`,
})``

export const FaqGroupShortAnswer = styled.span.attrs({
  className: tw`text-sm text-gray-500`,
})``

export const AskMoreRow = styled.div.attrs({
  className: tw`flex flex-wrap items-center gap-3 text-sm font-medium text-gray-900`,
})``
