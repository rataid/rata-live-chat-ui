import tw, { css, styled } from 'twin.macro'

import { ChatMessageDirection } from '../types'

type DirectionProps = { direction: ChatMessageDirection }

// Page

export const ChatPageWrapper = styled.div(() => [
  tw`flex w-full justify-center bg-gray-100`,
  css`
    height: 100vh;
    height: 100dvh;
  `,
])

export const ChatPageContainer = tw.div`flex h-full w-full max-w-[36rem] flex-col bg-gray-50 sm:(border-x border-gray-200)`

// Header

export const ChatHeaderWrapper = tw.header`flex shrink-0 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3`

export const ChatHeaderBrand = tw.div`flex min-w-0 items-center gap-2.5`

export const ChatHeaderLogo = tw.div`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white`

export const ChatHeaderTitle = tw.div`truncate text-sm font-semibold text-gray-900`

export const ChatHeaderSubtitle = tw.div`truncate text-xs text-gray-500`

export const ChatHeaderLogout = tw.button`flex shrink-0 items-center gap-1 text-xs font-medium text-danger-600 hover:text-danger-700`

// Message list

export const ChatMessageList = tw.main`flex flex-1 flex-col overflow-y-auto px-4 pb-4`

export const ChatDateSeparatorWrapper = tw.div`my-6 flex h-0 items-center justify-center border-b border-gray-200`

export const ChatDateSeparatorPill = tw.div`flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-2xs font-medium text-gray-500`

export const ChatMessageSection = tw.section``

export const ChatMessageGroup = styled.div<DirectionProps>(({ direction }) => [
  tw`mt-4 flex flex-col gap-1.5`,
  direction === 'outgoing' ? tw`items-end` : tw`items-start`,
])

export const ChatMessageSender = tw.div`text-2xs font-semibold text-gray-900`

// Bubble, ported from crboard message-bubble.var

export const ChatBubbleWrapper = tw.div`flex max-w-[85%] flex-col sm:max-w-[75%]`

export const ChatBubbleMain = styled.div<DirectionProps>(({ direction }) => [
  tw`overflow-hidden rounded-lg`,
  direction === 'outgoing'
    ? tw`rounded-tr-none bg-primary-600 text-white`
    : tw`rounded-tl-none border border-gray-100 bg-white text-gray-900`,
])

export const ChatBubbleContent = tw.div`whitespace-pre-line break-words px-3.5 pt-2.5 text-sm`

export const ChatBubbleMeta = styled.div<DirectionProps>(({ direction }) => [
  tw`flex items-center justify-end gap-1 px-3.5 pt-1 pb-1.5 text-2xs`,
  direction === 'outgoing' ? tw`text-primary-100` : tw`text-gray-500`,
])

export const ChatQuickReplyButton = tw.button`w-full border-t border-gray-100 bg-white px-3.5 py-2 text-center text-xs font-medium text-primary-600 hover:bg-gray-50 disabled:(cursor-default text-gray-400 hover:bg-white)`

// Editor

export const ChatEditorWrapper = tw.footer`shrink-0 border-t border-gray-200 bg-white px-4 pt-2 pb-4`

export const ChatEditorToolbar = tw.div`flex items-center justify-end gap-1 pb-2`

export const ChatEditorToolbarButton = tw.button`flex h-6 w-6 items-center justify-center rounded text-gray-400 disabled:cursor-not-allowed`

export const ChatEditorBox = tw.div`flex items-end gap-2 rounded-lg border border-gray-200 px-3 py-2 focus-within:border-primary-400`

export const ChatEditorTextarea = tw.textarea`max-h-28 min-h-[1.5rem] flex-1 resize-none border-none bg-transparent p-0 text-sm leading-6 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0`

export const ChatEditorSend = tw.button`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white hover:bg-primary-700 disabled:(cursor-not-allowed bg-primary-200)`
