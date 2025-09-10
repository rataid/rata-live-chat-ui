import { omit } from 'lodash'
import { ActionFunctionArgs, redirect } from 'react-router-dom'

import { queryClient } from '@libs/query-client'
import notify, { CreateSuccess, notifyError } from '@nui/hooks/use-notif'

import { CreateUserInput } from '@gql/graphql'
import { createUser, createUserSchema, userKey } from '@models/user/user'

export async function userCreateAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const data = createUserSchema.parse(Object.fromEntries(formData))

  try {
    await createUser({
      data: omit(data, ['retypePassword']) as CreateUserInput,
    })
    await queryClient.invalidateQueries({ queryKey: [userKey] })
    notify(CreateSuccess)

    return redirect('..')
  } catch (error: any) {
    const message = await error?.text()
    notifyError(message)
  }

  return null
}
