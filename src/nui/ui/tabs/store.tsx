import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { TabsAction, TabsState, TabsStoreProps } from './types'

export type TabsStore = ReturnType<typeof tabsStore>

const tabsStore = ({ defaultTab }: TabsStoreProps) => {
  const DEFAULT_PROPS: TabsState = {
    defaultTab,
    tabs: [],
    linkPrefix: '',
    selectedTab: defaultTab ?? null,
  }

  return createStore<TabsState & TabsAction>()(
    immer<TabsState & TabsAction>((set, get) => ({
      defaultTab: DEFAULT_PROPS.defaultTab,
      tabs: DEFAULT_PROPS.tabs,
      selectedTab: DEFAULT_PROPS.selectedTab,

      setLinkPrefix: (linkPrefix) => {
        set((s) => {
          s.linkPrefix = linkPrefix
        })
      },

      setVariant: (variant) => {
        set((s) => {
          s.variant = variant
        })
      },

      getTab: (name) => {
        return get().tabs.find((tab) => tab.name === name)
      },

      addTab: (name, disabled = false, showIndicator = false) => {
        set((s) => {
          s.tabs = [
            ...s.tabs,
            {
              name,
              disabled,
              showIndicator,
            },
          ]
        })

        if (!get().selectedTab) {
          get().selectTab(get().tabs[0].name)
        }
      },

      selectTab: (name) => {
        set((s) => {
          s.selectedTab = name
        })
      },
    }))
  )
}

export default tabsStore
