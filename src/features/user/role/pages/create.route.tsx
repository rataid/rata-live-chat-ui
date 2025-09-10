import { ActionFunctionArgs, redirect } from 'react-router-dom'

import { queryClient } from '@libs/query-client'
import notify, { CreateSuccess, notifyError } from '@nui/hooks/use-notif'

import { CreateRoleInput } from '@gql/graphql'
import { createRole, roleKey, roleSchema } from '@models/role/role'

export async function roleCreateAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const data = roleSchema.parse(Object.fromEntries(formData)) as CreateRoleInput

  try {
    await createRole({ data })
    await queryClient.invalidateQueries({ queryKey: [roleKey] })
    notify(CreateSuccess)

    return redirect('../role')
  } catch (error: any) {
    const message = await error?.text()
    notifyError(message)
  }

  return null
}
