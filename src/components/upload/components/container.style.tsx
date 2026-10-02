import styled from 'styled-components'
import { tw } from '@nui/utils/tw'
import { shallow } from 'zustand/shallow'

import { useUpload } from '../hooks'

export const UploadContainerWrapper = styled.div.attrs({ className: tw`relative w-full text-sm text-gray-500 flex flex-col gap-y-6` })``

export const UploadContainerMain = styled.div.attrs(() =>  {
  const [isFocused] = useUpload((s) => [s.isFocused], shallow)
  return { className: [tw`w-full border border-gray-200 border-dashed rounded-lg p-3`, isFocused && tw`border-primary-400`].filter(Boolean).join(' ') }
})``
