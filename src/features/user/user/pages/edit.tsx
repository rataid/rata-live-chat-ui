import { FormProvider } from 'react-hook-form'
import { z } from 'zod'

import { Form } from '@nui/form'
import useFormHelper from '@nui/hooks/use-form-helper'
import Container from '@nui/ui/container'
import Pane from '@nui/ui/pane'
import Segment from '@nui/ui/segment'
import Side from '@nui/ui/side'

import UserForm from '../components/form'
import UserSide from '../components/side'

export function UserEditPage() {
  // const schema = editUserSchema.superRefine(
  //   ({ retypePassword, password }, ctx) => {
  //     if (retypePassword !== password) {
  //       ctx.addIssue({
  //         code: z.ZodIssueCode.custom,
  //         message: 'The passwords did not match',
  //         path: ['retypePassword'],
  //       })
  //     }
  //   }
  // )

  // const { methods, onSubmit } = useFormHelper({
  //   schema,
  // })

  return (
    // <FormProvider {...methods}>
      <Form onSubmit={()=> {}}>
        <Segment>
          <Container>
            <Pane>
              <Segment>
                <UserForm />
              </Segment>
              <Side>
                <UserSide />
              </Side>
            </Pane>
          </Container>
        </Segment>
      </Form>
    // </FormProvider>
  )
}
