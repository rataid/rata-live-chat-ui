import { ActionFunctionArgs } from 'react-router-dom'

import { queryClient } from '@libs/query-client'
import notify, { DeleteFailed, DeleteSuccess } from '@nui/hooks/use-notif'
import { listArgs } from '@utils'

import { SortOrder, UsersQueryVariables } from '@gql/graphql'
import { deleteUsers, userKey, usersQuery } from '@models/user/user'

export const usersArgs = () =>
  listArgs<UsersQueryVariables>({
    orderBy: {
      createdAt: SortOrder.Desc,
    },
  })

export async function userListLoader() {
  const query = usersQuery(usersArgs())

  return queryClient.ensureQueryData(query)
}

async function deleteAction(formData: FormData) {
  const stringIds = formData.get('ids') || []
  const ids = JSON.parse(stringIds as string)

  try {
    await deleteUsers({ ids })
    await queryClient.invalidateQueries({ queryKey: [userKey] })
    notify(DeleteSuccess)
  } catch (err) {
    notify(DeleteFailed)
  }

  return null
}

export async function userListAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get('intent')

  switch (intent) {
    case 'delete':
      return deleteAction(formData)
    default:
      return null
  }
}
