import { FormProvider } from 'react-hook-form'
import { z } from 'zod'

import { Form } from '@nui/form'
import useFormHelper from '@nui/hooks/use-form-helper'
import Container from '@nui/ui/container'
import Pane from '@nui/ui/pane'
import Segment from '@nui/ui/segment'
import Side from '@nui/ui/side'

import { profileSchema } from '@models/user/user'

import ProfileForm from '../components/form'
import ProfileSide from '../components/side'

export function ProfilePage() {
  const schema = profileSchema.superRefine(
    ({ retypePassword, password }, ctx) => {
      if (retypePassword !== password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'The passwords did not match',
          path: ['retypePassword'],
        })
      }
    }
  )

  const { methods, onSubmit } = useFormHelper({
    schema,
  })

  return (
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit}>
        <Segment>
          <Container>
            <Pane>
              <Segment>
                <ProfileForm />
              </Segment>
              <Side>
                <ProfileSide />
              </Side>
            </Pane>
          </Container>
        </Segment>
      </Form>
    </FormProvider>
  )
}
