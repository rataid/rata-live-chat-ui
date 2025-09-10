import { useResponsive } from 'ahooks'
import { Outlet, useNavigate } from 'react-router-dom'

import { Can } from '@/components/auth/components/can'
import { PaginationProvider } from '@nui/pagination'
import Button from '@nui/ui/button'
import ButtonStack from '@nui/ui/button-stack'
import Container from '@nui/ui/container'
import Section from '@nui/ui/section'
import Segment from '@nui/ui/segment'
import TopbarPortal from '@nui/ui/topbar-portal'

import UserList from '../components/list'

export * from './list.route'

export function UserListPage() {
  const { sm, xl } = useResponsive()

  const navigate = useNavigate()

  return (
    <>
      <TopbarPortal>
        <ButtonStack>
          <Can permissions={['user.user.create']}>
            <Button
              icon="lucide-plus"
              type="submit"
              size={xl ? 'sm' : 'xs'}
              onClick={() => navigate('create')}
            >
              {sm && 'Create'}
            </Button>
          </Can>
        </ButtonStack>
      </TopbarPortal>
      <PaginationProvider>
        <Segment>
          <Container>
            <Section>
              <UserList />
            </Section>
          </Container>
        </Segment>
      </PaginationProvider>
      <Outlet />
    </>
  )
}
