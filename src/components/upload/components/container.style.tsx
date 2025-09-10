import tw, { styled } from 'twin.macro'
import { shallow } from 'zustand/shallow'

import { useUpload } from '../hooks'

export const UploadContainerWrapper = tw.div`relative w-full text-sm text-gray-500 flex flex-col gap-y-6`

export const UploadContainerMain = styled.div(() => {
  const [isFocused] = useUpload((s) => [s.isFocused], shallow)
  return [
    tw`w-full border border-gray-200 border-dashed rounded-lg p-3`,
    isFocused && tw`border-primary-400`,
  ]
})
