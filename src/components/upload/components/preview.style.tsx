import tw, { styled } from 'twin.macro'

export const UploadPreviewWrapper = tw.div`flex gap-6 flex-wrap`

type UploadPreviewItemProps = {
  isFile?: boolean
}
export const UploadPreviewItem = styled.div<UploadPreviewItemProps>(
  ({ isFile }) => [
    isFile ? tw`w-fit h-fit` : tw`w-[7.5rem] h-[7.5rem]`,
    tw`relative flex items-end`,
  ]
)

// Item with random background color
export const UploadPreviewThumbnail = tw.div`w-[6.375rem] h-[6.375rem] rounded-md overflow-hidden`

export const UploadPreviewFile = tw.div`flex items-center gap-x-2 whitespace-nowrap px-3 py-1 text-xs`

export const UploadPreviewDelete = tw.div`absolute top-0 right-0 invisible`
