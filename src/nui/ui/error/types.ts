export type GeneralErrorProps = {
  title?: string
  body?: string
  status?: number
  icon: React.ReactNode
}

export type ErrorProps = {
  content?: React.ReactNode
  title?: React.ReactNode
  body?: React.ReactNode
  action?: React.ReactNode
} & React.PropsWithChildren
