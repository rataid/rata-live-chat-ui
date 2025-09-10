import { useTabs } from '../hooks'
import { TabsPanelProps } from '../types'
import { TabsPanelWrapper } from './panel.style'

export function TabsPanel({ name, children }: TabsPanelProps) {
  const [selectedTab] = useTabs((s) => [s.selectedTab])

  if (selectedTab !== name) {
    return null
  }

  return <TabsPanelWrapper>{children}</TabsPanelWrapper>
}
