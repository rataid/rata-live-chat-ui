import {
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react'
import { useResponsive } from 'ahooks'

import { AppSidebarHeader } from '@nui/layouts/app/components/sidebar/header'
import { useAppContext } from '@nui/layouts/app/provider'
import Scrollbar from '@nui/ui/scrollbar'

import {
  AppMobileNavLogo,
  AppMobileNavMain,
  AppMobileNavNav,
  AppMobileNavNavDivide,
  AppMobileNavNavMain,
  AppMobileNavNavWrapper,
  AppMobileNavOverlay,
  AppMobileNavProfile,
  AppMobileNavSubNavMain,
  AppMobileNavSubNavWrapper,
  AppMobileNavWrapper,
} from './index.style'
import MenuMobileButton from './nav/components/button'
import AppMobileSubMenu from './nav/components/sub-menu'

export default function AppMobileNav() {
  const { navTop, navBottom, profile, isMobileNav, setIsMobileNav } =
    useAppContext()

  const { xl } = useResponsive()

  const { refs, context } = useFloating({
    open: isMobileNav ?? false,
    onOpenChange: setIsMobileNav,
  })

  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' })

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss])

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      opacity: 0,
      transform: 'translateX(5%)',
    },
  })

  if (xl) return null

  return (
    <AppMobileNavWrapper>
      <AppMobileNavLogo>
        <AppSidebarHeader />
      </AppMobileNavLogo>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        tw="relative z-[100]"
      >
        <MenuMobileButton
          open={isMobileNav ?? false}
          setOpen={setIsMobileNav}
        />
      </div>
      {isMounted ? (
        <FloatingPortal>
          <FloatingOverlay tw="z-[50]" lockScroll>
            <AppMobileNavOverlay id="appSidebarNav">
              <AppMobileNavMain
                ref={refs.setFloating}
                style={styles}
                {...getFloatingProps()}
              >
                <AppMobileNavNav>
                  <AppMobileNavNavWrapper>
                    <Scrollbar maxHeight="100%">
                      <AppMobileNavNavMain>
                        {navTop}
                        <AppMobileNavNavDivide />
                        {navBottom}
                      </AppMobileNavNavMain>
                    </Scrollbar>
                  </AppMobileNavNavWrapper>
                  <AppMobileNavSubNavWrapper>
                    <Scrollbar maxHeight="100%" positionTrack="0rem">
                      <AppMobileNavSubNavMain>
                        <AppMobileSubMenu />
                      </AppMobileNavSubNavMain>
                    </Scrollbar>
                  </AppMobileNavSubNavWrapper>
                </AppMobileNavNav>
                <AppMobileNavProfile>{profile}</AppMobileNavProfile>
              </AppMobileNavMain>
            </AppMobileNavOverlay>
          </FloatingOverlay>
        </FloatingPortal>
      ) : null}
    </AppMobileNavWrapper>
  )
}
