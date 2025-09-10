import { DialogContext, useDialog } from './hooks'
import { DialogProps } from './types'

export * from './components/content'
export * from './components/heading'
export * from './components/trigger'

export default function Dialog({
  children,
  ...options
}: {
  children: React.ReactNode
} & DialogProps) {
  const dialog = useDialog(options)
  return (
    <DialogContext.Provider value={dialog}>{children}</DialogContext.Provider>
  )
}
