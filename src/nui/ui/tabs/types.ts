export type VariantTabs = 'tabs' | 'bar'

export type TabsItem = {
  name: string
  showIndicator: boolean
  disabled: boolean
}

export type TabsState =
  | {
      defaultTab?: string
      variant?: VariantTabs
      linkPrefix?: string
      tabs: TabsItem[]
      selectedTab?: string | null
    }
  | null
  | undefined

export type TabsAction = {
  setVariant: (linkPrefix: VariantTabs) => void
  setLinkPrefix: (linkPrefix: string) => void
  addTab: (name: string, showIndicator?: boolean, disabled?: boolean) => void
  selectTab: (name: string) => void
  getTab: (name: string) => TabsItem | undefined
}

export type TabsStoreProps = {
  defaultTab?: string
}

export type TabsProviderProps = TabsStoreProps & React.PropsWithChildren

export type TabsProps = TabsProviderProps

export type TabsSelectorsProps = {
  variant?: VariantTabs
  linkPrefix?: string
} & React.PropsWithChildren

export type TabsSelectorProps = {
  tabElementById?: boolean
  name: string
  link?: string
  showIndicator?: boolean
  disabled?: boolean
} & React.PropsWithChildren

export type TabsPanelProps = {
  name: string
} & React.PropsWithChildren
