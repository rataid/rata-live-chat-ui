import { IconifyIcon } from '@iconify/react'
import React, { Dispatch, SetStateAction } from 'react'

export type AppContextValue = {
  navTop?: React.ReactElement
  navBottom?: React.ReactElement
  profile?: React.ReactElement
  isMobileNav?: boolean
  setIsMobileNav: Dispatch<SetStateAction<boolean>>
}

export type AppProviderProps = AppContextValue & React.PropsWithChildren

export type AppSubnavItem = {
  title: string
  to: string
  permissionName?: string
  icon?: React.ReactElement<IconifyIcon>
  total?: number
}

export type AppSubnavNavItemProps = {
  active?: boolean
}

export type AppSubnavProps = {
  id?: string
  items: AppSubnavItem[]
} & React.PropsWithChildren

export type AppLayoutProps = Omit<AppContextValue, 'setIsMobileNav'>
