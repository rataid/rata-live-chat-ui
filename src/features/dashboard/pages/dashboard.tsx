import { useResponsive } from 'ahooks'

import Container from '@nui/ui/container'
import Page from '@nui/ui/page'
import Pane from '@nui/ui/pane'
import Section from '@nui/ui/section'
import Segment from '@nui/ui/segment'
import Side from '@nui/ui/side'
import Stack from '@nui/ui/stack'

import CustomerMetricItem from '../components/customer-metric-item'
import DashboardHeader from '../components/header'
import IteractionMetricItem from '../components/interaction-metric-item'
import SideLatestProducts from '../components/latest-products'
import PatientMetricItem from '../components/patient-metric-item'

export function DashboardPage() {
  const { lg } = useResponsive()

  return (
    <Page>
      <Segment>
        <Container>
          <DashboardHeader />
          <Pane>
            <div>
              <Section>
                <Section>
                  <Stack flow={lg ? 'row' : 'column'}>
                    <CustomerMetricItem />
                    <PatientMetricItem />
                    <IteractionMetricItem />
                  </Stack>
                </Section>
              </Section>
            </div>
            <Side>
              <SideLatestProducts />
            </Side>
          </Pane>
        </Container>
      </Segment>
    </Page>
  )
}
