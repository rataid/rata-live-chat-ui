import { DrawerContext, useDrawer } from './hooks'
import { DrawerProps } from './types'

export * from './components/content'
export * from './components/heading'
export * from './components/trigger'

export default function Drawer({
  children,
  ...options
}: {
  children: React.ReactNode
} & DrawerProps) {
  const dialog = useDrawer(options)
  return (
    <DrawerContext.Provider value={dialog}>{children}</DrawerContext.Provider>
  )
}
