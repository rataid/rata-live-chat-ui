export interface uploadAcceptType {
    name: string,
    fileType: string
}
const uploadAccept: uploadAcceptType[] = [
  {
    name: 'IMAGE',
    fileType: 'image/*',
  },
  {
    name: 'FILE',
    fileType: '.pdf,.doc,.docx',
  },
]

export default uploadAccept
