import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'

import { useTabs } from '../hooks'
import { TabsSelectorsProps } from '../types'
import { TabsSelectorsWrapper } from './selectors.style'

export function TabsSelectors({
  variant: variantTabs,
  linkPrefix,
  children,
}: TabsSelectorsProps) {
  const [variant, setVariant, setLinkPrefix] = useTabs(
    (s) => [s.variant, s.setVariant, s.setLinkPrefix],
    shallow
  )
  useEffect(() => {
    setLinkPrefix(linkPrefix ?? '')
    setVariant(variantTabs ?? 'tabs')
  }, [setLinkPrefix, setVariant, linkPrefix, variantTabs])

  return (
    <TabsSelectorsWrapper variant={variant}>{children}</TabsSelectorsWrapper>
  )
}
