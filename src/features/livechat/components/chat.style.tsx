import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ChatMessageDirection } from '@/model/livechat'
import { tw } from '@nui/utils/tw'

type DirectionProps = { $direction: ChatMessageDirection }

export const ChatPageWrapper = styled.div.attrs({
  className: tw`fixed inset-x-0 bottom-0 top-16 flex justify-center bg-[#E9EBEF] sm:p-4`,
})``

export const ChatPageContainer = styled.div.attrs({
  className: tw`flex h-full w-full max-w-[31.25rem] flex-col overflow-hidden bg-gray-50 sm:rounded-xl sm:border sm:border-gray-200`,
})``

export const ChatHeaderWrapper = styled.header.attrs({
  className: tw`flex shrink-0 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3`,
})``

export const ChatHeaderBrand = styled.div.attrs({
  className: tw`hidden min-w-0 items-center gap-2.5 sm:flex`,
})``

export const ChatHeaderMobile = styled.div.attrs({
  className: tw`flex min-w-0 items-center gap-2 sm:hidden`,
})``

export const ChatHeaderBack = styled(Link).attrs({
  className: tw`-ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700`,
})``

export const ChatHeaderLogo = styled.div.attrs({
  className: tw`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white`,
})``

export const ChatHeaderTitle = styled.div.attrs({
  className: tw`truncate text-sm font-semibold text-gray-900`,
})``

export const ChatHeaderSubtitle = styled.div.attrs({
  className: tw`truncate text-xs text-gray-500`,
})``

export const ChatMessageList = styled.main.attrs({
  className: tw`flex flex-1 flex-col overflow-y-auto px-4 pb-4`,
})``

export const ChatDateSeparatorWrapper = styled.div.attrs({
  className: tw`my-6 flex h-0 items-center justify-center border-b border-gray-200`,
})``

export const ChatDateSeparatorPill = styled.div.attrs({
  className: tw`flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-2xs font-medium text-gray-500`,
})``

export const ChatMessageSection = styled.section``

export const ChatMessageGroup = styled.div.attrs<DirectionProps>(
  ({ $direction }) => ({
    className: [
      tw`mt-4 flex flex-col gap-1.5`,
      $direction === 'outgoing' ? tw`items-end` : tw`items-start`,
    ].join(' '),
  })
)<DirectionProps>``

export const ChatMessageSender = styled.div.attrs({
  className: tw`text-2xs font-semibold text-gray-900`,
})``

export const ChatBubbleWrapper = styled.div.attrs({
  className: tw`flex max-w-[85%] flex-col sm:max-w-[75%]`,
})``

export const ChatBubbleMain = styled.div.attrs<DirectionProps>(
  ({ $direction }) => ({
    className: [
      tw`overflow-hidden rounded-lg`,
      $direction === 'outgoing'
        ? tw`rounded-tr-none bg-primary-600 text-white`
        : tw`rounded-tl-none border border-gray-100 bg-white text-gray-900`,
    ].join(' '),
  })
)<DirectionProps>``

export const ChatBubbleContent = styled.div.attrs({
  className: tw`whitespace-pre-line break-words px-3.5 pt-2.5 text-sm`,
})``

export const ChatBubbleMeta = styled.div.attrs<DirectionProps>(
  ({ $direction }) => ({
    className: [
      tw`flex items-center justify-end gap-1 px-3.5 pb-1.5 pt-1 text-2xs`,
      $direction === 'outgoing' ? tw`text-primary-100` : tw`text-gray-500`,
    ].join(' '),
  })
)<DirectionProps>``

export const ChatQuickReplyButton = styled.button.attrs({
  className: tw`w-full border-t border-gray-100 bg-white px-3.5 py-2 text-center text-xs font-medium text-primary-600 hover:bg-gray-50 disabled:cursor-default disabled:text-gray-400 disabled:hover:bg-white`,
})``

export const ChatEditorWrapper = styled.footer.attrs({
  className: tw`shrink-0 border-t border-gray-200 bg-white px-4 pb-4 pt-2`,
})``

export const ChatEditorToolbar = styled.div.attrs({
  className: tw`flex items-center justify-end gap-1 pb-2`,
})``

export const ChatEditorToolbarButton = styled.button.attrs({
  className: tw`flex h-6 w-6 items-center justify-center rounded text-gray-400 disabled:cursor-not-allowed`,
})``

export const ChatEditorBox = styled.div.attrs({
  className: tw`flex items-end gap-2 rounded-lg border border-gray-200 px-3 py-2 focus-within:border-primary-400`,
})``

export const ChatEditorTextarea = styled.textarea.attrs({
  className: tw`max-h-28 min-h-[1.5rem] flex-1 resize-none border-none bg-transparent p-0 text-sm leading-6 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0`,
})``

export const ChatEditorSend = styled.button.attrs({
  className: tw`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-primary-200`,
})``

export const ChatEmpty = styled.p.attrs({
  className: tw`m-auto max-w-xs px-4 text-center text-sm text-gray-500`,
})``

export const ChatStatusBar = styled.div.attrs({
  className: tw`shrink-0 border-b border-warning-200 bg-warning-50 px-4 py-2 text-xs text-warning-700`,
})``

export const ChatListNote = styled.p.attrs({
  className: tw`py-3 text-center text-xs text-gray-500`,
})``
