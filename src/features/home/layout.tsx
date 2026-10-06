import { Outlet } from 'react-router-dom'

import { useAuth } from '@/components/auth'
import { useTour } from '@/components/tour'
import Button from '@nui/ui/button'

import { HomeBrandTabs } from './components/brand-tabs'
import {
  HomeContainer,
  HomeIntro,
  HomeIntroTop,
  HomeSubtitle,
  HomeTitle,
  HomeWelcome,
} from './components/home.style'
import { HOME_TOUR_ID, HOME_TOUR_STEPS } from './tour'

// Shared by the 3 brand homepages: greeting + brand tabs, then the brand page
export function HomeLayout() {
  const { userData } = useAuth()

  useTour({ id: HOME_TOUR_ID, steps: HOME_TOUR_STEPS, autoStart: true })

  // "Siti Rahma" -> "Siti"
  const firstName = (userData?.fullname || '').trim().split(/\s+/)[0]

  return (
    <HomeContainer>
      <HomeIntro>
        <div className="flex flex-col gap-2">
          <HomeWelcome>Welcome{firstName ? `, ${firstName}` : ''}</HomeWelcome>
          <HomeIntroTop>
            <HomeTitle>Patient Portal</HomeTitle>
            <Button to="/chat" size="sm" icon="lucide-messages-square">
              Chat with us
            </Button>
          </HomeIntroTop>
          <HomeSubtitle>
            Track your treatment progress and find answers for your dental
            health needs.
          </HomeSubtitle>
        </div>
        <HomeBrandTabs />
      </HomeIntro>
      <Outlet />
    </HomeContainer>
  )
}
