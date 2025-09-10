import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom'

import { queryClient } from '@libs/query-client'
import notify, { UpdateSuccess, notifyError } from '@nui/hooks/use-notif'
import { idArgs } from '@utils'

import { RoleQueryVariables, UpdateRoleInput } from '@gql/graphql'
import { roleKey, roleQuery, roleSchema, updateRole } from '@models/role/role'

export const roleArgs = idArgs<RoleQueryVariables>()

export async function roleEditLoader({ params }: LoaderFunctionArgs) {
  const { id } = params
  const q = roleQuery(roleArgs(id))

  return queryClient.ensureQueryData(q)
}

export async function roleEditAction({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()
  const data = roleSchema.parse(Object.fromEntries(formData)) as UpdateRoleInput

  try {
    await updateRole({ data, where: { id: params.id } })
    await queryClient.invalidateQueries({ queryKey: [roleKey] })
    notify(UpdateSuccess)
  } catch (error: any) {
    const message = await error?.text()
    notifyError(message)
  }

  return null
}
