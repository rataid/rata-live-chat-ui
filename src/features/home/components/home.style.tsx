import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

export const HomeContainer = styled.div.attrs({
  className: tw`flex w-full flex-col gap-6 py-6`,
})``

// Intro

export const HomeIntro = styled.section.attrs({
  className: tw`flex flex-col gap-4`,
})``

export const HomeIntroTop = styled.div.attrs({
  className: tw`flex flex-wrap items-end justify-between gap-3`,
})``

export const HomeWelcome = styled.p.attrs({
  className: tw`text-sm text-gray-500`,
})``

export const HomeTitle = styled.h1.attrs({
  className: tw`text-2xl font-bold text-gray-900 sm:text-3xl`,
})``

export const HomeSubtitle = styled.p.attrs({
  className: tw`text-sm text-gray-500`,
})``

// Brand tabs

export const BrandTabs = styled.nav.attrs({
  className: tw`grid grid-cols-3 gap-2 sm:gap-3`,
})``

// Cards

export const TrackerGrid = styled.div.attrs({
  className: tw`grid items-start gap-5 sm:grid-cols-2`,
})``

export const Card = styled.div.attrs({
  className: tw`flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4`,
})``

export const CardLabel = styled.div.attrs({
  className: tw`text-sm text-gray-700`,
})``

export const TrackerValueRow = styled.div.attrs({
  className: tw`flex items-baseline justify-between gap-2`,
})``

export const TrackerValue = styled.div.attrs({
  className: tw`text-3xl font-bold tabular-nums text-gray-900`,
})``

export const TrackerValueSuffix = styled.span.attrs({
  className: tw`ml-1 text-sm font-normal text-gray-500`,
})``

export const TrackerPercent = styled.div.attrs({
  className: tw`text-lg font-semibold tabular-nums text-primary-600`,
})``

export const ProgressTrack = styled.div.attrs({
  className: tw`h-1.5 w-full overflow-hidden rounded-full bg-gray-200`,
})``

export const ProgressFill = styled.div.attrs({
  className: tw`h-full rounded-full bg-primary-600 transition-[width] duration-300`,
})``

export const TrackerMeta = styled.div.attrs({
  className: tw`flex items-center justify-between gap-2 text-xs tabular-nums text-gray-500`,
})``

export const TrackerActions = styled.div.attrs({
  className: tw`flex gap-2`,
})``

export const StatusBadge = styled.span.attrs<{ $over: boolean }>(
  ({ $over }) => ({
    className: [
      tw`rounded-full px-2 py-0.5 text-2xs font-medium`,
      $over
        ? tw`bg-danger-50 text-danger-600`
        : tw`bg-success-50 text-success-600`,
    ].join(' '),
  })
)<{ $over: boolean }>``

export const EmptyContent = styled.div.attrs({
  className: tw`rounded-xl border border-dashed border-gray-200 px-4 py-8 text-center text-sm text-gray-500`,
})``

// Sections

export const Section = styled.section.attrs({
  className: tw`flex flex-col gap-3`,
})``

export const SectionTitle = styled.h2.attrs({
  className: tw`flex items-center gap-2 text-base font-semibold text-gray-900`,
})``

export const FaqList = styled.ol.attrs({
  className: tw`divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 bg-white`,
})``

export const FaqItem = styled.button.attrs({
  className: tw`flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50`,
})``

export const FaqNumber = styled.span.attrs({
  className: tw`w-4 shrink-0 text-xs font-medium tabular-nums text-primary-600`,
})``

export const FaqGroupGrid = styled.div.attrs({
  className: tw`grid gap-3 sm:grid-cols-2 lg:grid-cols-3`,
})``

export const FaqGroupCard = styled.button.attrs({
  className: tw`flex flex-col items-start gap-1.5 rounded-xl border border-gray-200 bg-white p-4 text-left hover:border-gray-300`,
})``

export const FaqGroupTitle = styled.div.attrs({
  className: tw`text-sm font-semibold text-gray-900`,
})``

export const FaqGroupDescription = styled.div.attrs({
  className: tw`text-xs text-gray-500`,
})``

export const FaqGroupCount = styled.span.attrs({
  className: tw`mt-1 rounded-full bg-blue-50 px-2 py-0.5 text-2xs font-medium text-blue-600`,
})``

// Aligner set history

export const HistoryWrapper = styled.div.attrs({
  className: tw`flex flex-col gap-1.5 pt-1`,
})``

export const HistoryTitle = styled.div.attrs({
  className: tw`text-xs font-medium text-gray-500`,
})``

export const HistoryList = styled.ul.attrs({
  className: tw`flex flex-col gap-1`,
})``

export const HistoryRow = styled.li.attrs({
  className: tw`flex items-center justify-between gap-2 text-xs text-gray-900`,
})``

export const HistoryRowDate = styled.span.attrs({
  className: tw`shrink-0 tabular-nums text-gray-500`,
})``

export const HistoryMessage = styled.p.attrs({
  className: tw`text-xs text-gray-500`,
})``

// Brand intro banner

const brandIntroTones = {
  rata: tw`border-[#BE0D1E]/40 bg-[#BE0D1E]/5`,
  tanam: tw`border-teal-300 bg-teal-50`,
  vinir: tw`border-blue-400 bg-blue-50`,
}

export type BrandIntroTone = keyof typeof brandIntroTones

export const BrandIntroWrapper = styled.div.attrs<{ $tone: BrandIntroTone }>(
  ({ $tone }) => ({
    className: [
      tw`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm text-gray-700`,
      brandIntroTones[$tone],
    ].join(' '),
  })
)<{ $tone: BrandIntroTone }>``

// Tips

export const TipsCard = styled.section.attrs({
  className: tw`flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:p-5`,
})``

export const TipsTitle = styled.h2.attrs({
  className: tw`text-base font-semibold text-gray-900`,
})``

export const TipsDescription = styled.p.attrs({
  className: tw`mt-1 text-sm text-gray-500`,
})``

export const TipsColumns = styled.div.attrs({
  className: tw`grid gap-3 sm:grid-cols-2`,
})``

export const TipsColumn = styled.div.attrs({
  className: tw`flex flex-col gap-3 rounded-lg border border-gray-200 p-4`,
})``

export const TipsColumnLabel = styled.h3.attrs<{ $tone: 'do' | 'dont' }>(
  ({ $tone }) => ({
    className: [
      tw`text-sm font-semibold`,
      $tone === 'do' ? tw`text-success-600` : tw`text-danger-600`,
    ].join(' '),
  })
)<{ $tone: 'do' | 'dont' }>``

export const TipsList = styled.ul.attrs({
  className: tw`flex flex-col gap-2`,
})``

export const TipsItem = styled.li.attrs({
  className: tw`flex items-start gap-2 text-sm text-gray-700`,
})``

export const TipsNote = styled.p.attrs({
  className: tw`text-xs text-gray-500`,
})``

// Animates the history panel open/closed. Grid rows 0fr -> 1fr follows the
// content height; -mt-3 cancels the card's gap while collapsed.
export const HistoryCollapse = styled.div.attrs<{ $open: boolean }>(
  ({ $open }) => ({
    className: [
      tw`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out motion-reduce:transition-none`,
      $open
        ? tw`mt-0 grid-rows-[1fr] opacity-100`
        : tw`-mt-3 grid-rows-[0fr] opacity-0`,
    ].join(' '),
  })
)<{ $open: boolean }>``

export const HistoryCollapseInner = styled.div.attrs({
  className: tw`min-h-0 overflow-hidden`,
})``
