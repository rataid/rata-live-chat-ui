import { useIsFetching } from '@tanstack/react-query'
import { Outlet, useSearchParams } from 'react-router-dom'

import { useAuth } from '@/components/auth'
import { TourIntro, useTour } from '@/components/tour'
import { PORTAL_NAME } from '@/constants'

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
import { HOME_TOUR_ID, HOME_TOUR_INTRO, HOME_TOUR_STEPS } from './tour'

export function HomeLayout() {
  const { userData } = useAuth()
  const [searchParams] = useSearchParams()
  const previewAndroid =
    import.meta.env.DEV && searchParams.get('previewInstall') === 'android'

  // The tour starts once every dashboard request (plan, removal time, ...)
  // has finished, so each step points at loaded content
  const isLoadingData = useIsFetching() > 0

  const { isTourActive, intro } = useTour({
    id: HOME_TOUR_ID,
    steps: HOME_TOUR_STEPS,
    withIntro: true,
    autoStart: !previewAndroid,
    ready: !isLoadingData,
  })
  const firstName = (userData?.fullname || '').trim().split(/\s+/)[0]

  return (
    <HomeContainer>
      <HomeIntro>
        <div className="flex flex-col gap-2">
          <HomeWelcome>
            Halo{firstName ? `, ${firstName}` : ''}, selamat datang di
          </HomeWelcome>
          <HomeIntroTop>
            <HomeTitle>{PORTAL_NAME}</HomeTitle>
          </HomeIntroTop>
          <HomeSubtitle>
            Pantau perkembangan perawatan Anda dan temukan jawaban atas
            kebutuhan kesehatan gigi Anda.
          </HomeSubtitle>
        </div>
        {/* <HomeBrandTabs /> */}
      </HomeIntro>
      <Outlet />
      <TourIntro {...HOME_TOUR_INTRO} {...intro} />
      {previewAndroid ? (
        <InstallHomeScreen previewAndroid />
      ) : (
        !isTourActive && <InstallHomeScreen placement="dashboard" />
      )}
    </HomeContainer>
  )
}
