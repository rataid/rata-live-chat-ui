import { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from 'react'

export type DisclosureProps = {
  label: string | ReactNode
  id: string
  disabled?: boolean
} & PropsWithChildren

export type DisclosureGroupProps = {
  defaultOpenId?: string
} & PropsWithChildren

export type DisclosureProviderProps = {
  isOpen?: string
  setIsOpen: Dispatch<SetStateAction<string>>
}
