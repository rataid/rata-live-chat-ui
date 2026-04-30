import { useUpload } from '../hooks'
import PreviewFile from './preview/file'
import { PreviewFiles } from './preview/file.style'
import PreviewImage from './preview/image'
import { PreviewImages } from './preview/image.style'

export default function UploadPreview() {
  const [fileType, items, removeItem] = useUpload((s) => [
    s.fileType,
    s.items,
    s.removeItem,
  ])

  if (items.length <= 0) return null

  if (['file', 'stl', 'icd'].includes(fileType)) {
    return (
      <PreviewFiles>
        {items.map((item) => (
          <PreviewFile
            // key={item?.id}
            title={item?.title ?? ''}
            size={item?.size}
            body={item?.name}
            onClick={() => removeItem(item?.id as string)}
          />
        ))}
      </PreviewFiles>
    )
  }

  return (
    <PreviewImages>
      {items.map((item) => (
        <PreviewImage
          // key={item?.id}
          src={item?.url}
          alt={item?.title ?? ''}
          onClick={() => removeItem(item?.id as string)}
        />
      ))}
    </PreviewImages>
  )
}
