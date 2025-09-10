import { LoaderFunctionArgs } from 'react-router-dom'

import { queryClient } from '@libs/query-client'

import { RoleQueryVariables } from '@gql/graphql'
import { roleQuery } from '@models/role/role'

export const roleArgs = (id?: string): RoleQueryVariables => {
  return {
    id,
  }
}

export async function roleListDetailLoader({ params }: LoaderFunctionArgs) {
  const { id } = params
  const queryRole = roleQuery(roleArgs(id))

  return queryClient.ensureQueryData(queryRole)
}
