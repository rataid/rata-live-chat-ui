import { LoaderFunctionArgs } from 'react-router-dom'

import { queryClient } from '@libs/query-client'

export const userArgs = (id?: string) => {
  return {
    id,
  }
}

export async function userListDetailLoader({ params }: LoaderFunctionArgs) {
  const { id } = params
  // const queryUser = userQuery(userArgs(id))

  // return queryClient.ensureQueryData(queryUser)
  return null
}
