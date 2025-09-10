import { LoaderFunctionArgs } from 'react-router-dom'

import { queryClient } from '@libs/query-client'

import { UserQueryVariables } from '@gql/graphql'
import { userQuery } from '@models/user/user'

export const userArgs = (id?: string): UserQueryVariables => {
  return {
    id,
  }
}

export async function userListDetailLoader({ params }: LoaderFunctionArgs) {
  const { id } = params
  const queryUser = userQuery(userArgs(id))

  return queryClient.ensureQueryData(queryUser)
}
