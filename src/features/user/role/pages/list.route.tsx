import { ActionFunctionArgs } from 'react-router-dom'

import { queryClient } from '@libs/query-client'
import notify, { DeleteFailed, DeleteSuccess } from '@nui/hooks/use-notif'
import { listArgs } from '@utils'

import { RolesQueryVariables, SortOrder } from '@gql/graphql'
import { deleteRoles, roleKey, rolesQuery } from '@models/role/role'

export const rolesArgs = () =>
  listArgs<RolesQueryVariables>({
    orderBy: {
      createdAt: SortOrder.Desc,
    },
  })

export async function roleListLoader() {
  const query = rolesQuery(rolesArgs())

  return queryClient.ensureQueryData(query)
}

async function deleteAction(formData: FormData) {
  const stringIds = formData.get('ids') || []
  const ids = JSON.parse(stringIds as string)

  try {
    await deleteRoles({ ids })
    await queryClient.invalidateQueries({ queryKey: [roleKey] })
    notify(DeleteSuccess)
  } catch (err) {
    notify(DeleteFailed)
  }

  return null
}

export async function roleListAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get('intent')

  switch (intent) {
    case 'delete':
      return deleteAction(formData)
    default:
      return null
  }
}
