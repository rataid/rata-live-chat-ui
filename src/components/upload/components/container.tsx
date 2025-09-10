import { useFocusWithin } from 'ahooks'
import { useRef } from 'react'
import { shallow } from 'zustand/shallow'

import { useUpload } from '../hooks'
import { UploadContainerMain, UploadContainerWrapper } from './container.style'
import { UploadDropzone } from './dropzone'
import UploadPreview from './preview'
import UploadQueue from './queue'

export default function UploadContainer() {
  const [currentTab, hidePreview, setIsFocused] = useUpload(
    (s) => [s.currentTab, s.hidePreview, s.setIsFocused],
    shallow
  )

  const focusRef = useRef(null)

  useFocusWithin(focusRef, {
    onFocus: () => {
      setIsFocused(true)
    },
    onBlur: () => {
      setIsFocused(false)
    },
  })

  return (
    <UploadContainerWrapper>
      <UploadContainerMain ref={focusRef}>
        {currentTab === 'dropzone' && <UploadDropzone />}
        {currentTab === 'queue' && <UploadQueue />}
      </UploadContainerMain>
      {!hidePreview && <UploadPreview />}
    </UploadContainerWrapper>
  )
}
