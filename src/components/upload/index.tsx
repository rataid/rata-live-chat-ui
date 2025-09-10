import { useFocusWithin } from 'ahooks'
import { forwardRef, useEffect, useRef } from 'react'

import UploadContainer from './components/container'
import { UploadValue } from './components/value'
import { useUpload } from './hooks'
import { UploadProps } from './types'

export * from './components/dropzone'
export * from './components/value'
export * from './hooks'
export * from './provider'
export * from './store'
// eslint-disable-next-line import/no-cycle
export * from './with-provider'

const Upload = forwardRef<HTMLInputElement, UploadProps>(function Upload(
  { name, onFocus, onBlur, resourceKey, ...props },
  forwardedRef
) {
  const [setResourceKey] = useUpload((s) => [s.setResourceKey])

  const focusRef = useRef(null)

  useFocusWithin(focusRef, {
    onFocus: () => {
      onFocus?.({} as any)
    },
    onBlur: () => {
      onBlur?.({} as any)
    },
  })

  useEffect(
    () => {
      setResourceKey(resourceKey)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <div ref={focusRef}>
      <UploadValue ref={forwardedRef} name={name} {...props} />
      <UploadContainer />
    </div>
  )
})

export default Upload
