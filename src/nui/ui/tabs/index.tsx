import { TabsProvider } from './provider'
import { TabsProps } from './types'

export * from './components/panel'
export * from './components/selector'
export * from './components/selectors'
export * from './components/tab-id'
export * from './hooks'

export function Tabs({ defaultTab, children }: TabsProps) {
  return (
    <nav className="flex border-b border-gray-300">
      <TabsProvider defaultTab={defaultTab}>{children}</TabsProvider>
    </nav>
  )
}
