import { Outlet, useSearchParams } from 'react-router-dom'

import { useAuth } from '@/components/auth'
import { useTour } from '@/components/tour'

import { HomeBrandTabs } from './components/brand-tabs'
import {
  HomeContainer,
  HomeIntro,
  HomeIntroTop,
  HomeSubtitle,
  HomeTitle,
  HomeWelcome,
} from './components/home.style'
import { InstallHomeScreen } from './components/install-home-screen'
import { HOME_TOUR_ID, HOME_TOUR_STEPS } from './tour'

export function HomeLayout() {
  const { userData } = useAuth()
  const [searchParams] = useSearchParams()
  const previewAndroid =
    import.meta.env.DEV && searchParams.get('previewInstall') === 'android'

  const { isTourActive } = useTour({
    id: HOME_TOUR_ID,
    steps: HOME_TOUR_STEPS,
    autoStart: !previewAndroid,
  })
  const firstName = (userData?.fullname || '').trim().split(/\s+/)[0]

  return (
    <HomeContainer>
      <HomeIntro>
        <div className="flex flex-col gap-2">
          <HomeWelcome>Welcome{firstName ? `, ${firstName}` : ''}</HomeWelcome>
          <HomeIntroTop>
            <HomeTitle>Patient Portal</HomeTitle>
          </HomeIntroTop>
          <HomeSubtitle>
            Track your treatment progress and find answers for your dental
            health needs.
          </HomeSubtitle>
        </div>
        <HomeBrandTabs />
      </HomeIntro>
      <Outlet />
      {previewAndroid ? (
        <InstallHomeScreen previewAndroid />
      ) : (
        !isTourActive && <InstallHomeScreen placement="dashboard" />
      )}
    </HomeContainer>
  )
}
