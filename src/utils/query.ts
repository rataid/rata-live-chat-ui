import { Variables } from 'graphql-request'

import {
  PAGINATION_CARD_PERPAGE,
  PAGINATION_TABLE_PERPAGE,
} from '@nui/pagination/config'

export const idArgs =
  <T>() =>
  (id?: string): T =>
    ({
      ...(id ? { id } : {}),
    } as T)

type ListArgsMode = 'table' | 'card'

export const listArgs = <T>(
  args?: T extends Variables ? T : never,
  mode = 'table' as ListArgsMode
): T => {
  const first =
    mode === 'table' ? PAGINATION_TABLE_PERPAGE : PAGINATION_CARD_PERPAGE

  return {
    ...(args || {}),
    ...{ first },
  } as T
}
