import { FormProvider } from 'react-hook-form'

import { Form } from '@nui/form'
import useFormHelper from '@nui/hooks/use-form-helper'
import Container from '@nui/ui/container'
import Pane from '@nui/ui/pane'
import Segment from '@nui/ui/segment'
import Side from '@nui/ui/side'

import { roleSchema } from '@models/role/role'

import RoleForm from '../components/form'
import RoleSide from '../components/side'

export * from './create.route'

export function RoleCreatePage() {
  const { methods, onSubmit } = useFormHelper({
    schema: roleSchema,
  })

  return (
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit}>
        <Segment>
          <Container>
            <Pane>
              <Segment>
                <RoleForm />
              </Segment>
              <Side>
                <RoleSide />
              </Side>
            </Pane>
          </Container>
        </Segment>
      </Form>
    </FormProvider>
  )
}
