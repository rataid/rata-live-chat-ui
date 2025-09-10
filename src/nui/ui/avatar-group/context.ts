import { createContext } from '@/utils/context'

import { AvatarGroupProviderProps } from './types'

export const [AvatarGroupProvider, useAvatarGroupContext] =
  createContext<AvatarGroupProviderProps>({
    name: 'AvatarContext',
    strict: false,
  })
