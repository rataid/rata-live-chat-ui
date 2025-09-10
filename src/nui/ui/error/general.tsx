import { useNavigate } from 'react-router-dom'

import { Form } from '@nui/form'

import Badge from '../badge'
import Button from '../button'
import { Error } from './error'
import { GeneralErrorProps } from './types'

export default function GeneralError({
  title,
  body,
  status,
  icon,
}: GeneralErrorProps) {
  const navigate = useNavigate()

  const isAuthError = [401, 403].includes((status ?? 500) as number)

  return (
    <Error
      content={icon}
      title={title}
      body={body}
      action={
        <>
          {isAuthError && (
            <Form action="/logout">
              <Button type="submit" size="xs" icon="lucide:log-out">
                Sign in as different user
              </Button>
            </Form>
          )}
          <Button
            size="xs"
            variant="secondaryGray"
            onClick={() => navigate('/dashboard')}
          >
            Back Home
          </Button>
        </>
      }
    >
      {status && <Badge color="gray">{status} ERROR</Badge>}
    </Error>
  )
}
