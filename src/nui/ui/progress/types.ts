import { PropsWithChildren } from 'react'

export type ProgressProps = {
  status?: string
  value?: number
} & PropsWithChildren
