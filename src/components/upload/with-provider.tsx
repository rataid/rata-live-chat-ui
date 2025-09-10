import { forwardRef } from 'react'

// eslint-disable-next-line import/no-cycle
import Upload, { UploadProvider } from './index'
import { UploadWithProviderProps } from './types'

export const UploadWithProvider = forwardRef<
  HTMLInputElement,
  UploadWithProviderProps
>(function UploadWithProvider(
  {
    defaultItems,
    currentTab,
    fileType,
    maxFiles,
    maxSize,
    fileNamingRules,
    hidePreview,
    autoCloseTab,
    clearItemOnUploadDone,
    onUploadDone,
    ...props
  },
  forwardedRef
) {
  return (
    <UploadProvider
      defaultItems={defaultItems}
      fileType={fileType}
      maxFiles={maxFiles}
      maxSize={maxSize}
      currentTab={currentTab}
      hidePreview={hidePreview}
      autoCloseTab={autoCloseTab}
      fileNamingRules={fileNamingRules}
      clearItemOnUploadDone={clearItemOnUploadDone}
      onUploadDone={onUploadDone}
    >
      <Upload ref={forwardedRef} {...props} />
    </UploadProvider>
  )
})
