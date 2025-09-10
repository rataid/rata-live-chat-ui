import { createContext } from '@/utils/context'

import { DisclosureProviderProps } from './types'

export const [DisclosureProvider, useDisclosureContext] =
  createContext<DisclosureProviderProps>({
    name: 'DisclosureContext',
    strict: false,
  })
