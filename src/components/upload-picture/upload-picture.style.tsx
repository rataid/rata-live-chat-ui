import tw from 'twin.macro'

export const UploadPictureWrapper = tw.div`w-fit flex mt-1 flex-col gap-y-4 items-start`

export const UploadPictureImageStyle = tw.img`h-full w-full object-cover`

export const UploadPictureContent = tw.div`grid place-content-center gap-2`

export const UploadPictureInfo = tw.div`text-xs text-gray-500`

export const UploadPictureFormUpload = tw.label`cursor-pointer`
