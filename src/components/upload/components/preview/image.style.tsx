import tw from 'twin.macro'

export const PreviewImages = tw.div`flex gap-4 flex-wrap`

// export const PreviewImageItem = tw.div`relative flex h-[5.5rem] w-[5.5rem] md:(w-[7.5rem] h-[7.5rem]) items-end`
export const PreviewImageItem = tw.div`relative flex h-[48px] w-[48px] items-end`

export const PreviewImageFile = tw.div`flex items-center gap-x-2 whitespace-nowrap px-3 py-1 text-xs`

export const PreviewImageDelete = tw.div`absolute -top-4 -right-4 visible md:invisible`
