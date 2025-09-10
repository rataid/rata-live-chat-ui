import { useNavigate, useRouteError } from 'react-router-dom'

import NotfoundSvg from '@/assets/svg/not-found'
import Dump from '@nui/ui/dump'
import { errorStatusMap } from '@nui/ui/error/error-status-map'
import GeneralError from '@nui/ui/error/general'

import { removeToken } from './components/auth'
import { key } from './utils/common'

export default function ErrorBoundary() {
  const error = useRouteError() as any
  const navigate = useNavigate()

  if (
    error &&
    error?.message?.includes('error loading dynamically imported module')
  ) {
    window.location.reload()
    return null
  }

  if (
    typeof error === 'object' &&
    (error?.name === 'Die and dump' || error?.name === 'ZodError')
  ) {
    return (
      <div tw="grid place-content-center h-screen">
        <Dump>{JSON.parse(error?.message)}</Dump>
      </div>
    )
  }

  const data = errorStatusMap.find((item) =>
    item.statuses.includes(error?.status ?? 0)
  )

  const errorBody =
    (error && !error.internal && error.data ? error.data : null) || data?.body

  if (errorBody?.includes('invalid signature')) {
    removeToken()
    navigate('/login')

    return null
  }

  return (
    <GeneralError
      key={key(data)}
      status={error?.status}
      title={data?.title}
      icon={data?.icon ?? <NotfoundSvg />}
      body={errorBody}
    />
  )
}
