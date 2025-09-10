import { createContext, useContext, useMemo } from 'react'

import { AppContextValue, AppProviderProps } from './types'

const AppContext = createContext<AppContextValue>({
  setIsMobileNav: (e) => !e,
})

export function useAppContext() {
  return useContext(AppContext)
}

export default function AppProvider({
  navTop,
  navBottom,
  profile,
  isMobileNav,
  setIsMobileNav,
  children,
}: AppProviderProps) {
  const value = useMemo(
    () => ({ navTop, navBottom, profile, isMobileNav, setIsMobileNav }),
    [navTop, navBottom, profile, isMobileNav, setIsMobileNav]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
