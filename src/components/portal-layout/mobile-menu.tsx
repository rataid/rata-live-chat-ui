import { useEffect, useRef, useState } from 'react'
import { Form, useLocation } from 'react-router-dom'

import Icon from '@nui/ui/icon'

import {
  MobileMenuButton,
  MobileMenuDivider,
  MobileMenuPanel,
  MobileMenuSignOut,
  MobileMenuWrapper,
  PortalNavLabel,
  PortalNavLink,
} from './portal-layout.style'

export function MobileMenu({ name }: { name?: string }) {
  const [open, setOpen] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)

  const { pathname } = useLocation()

  // Close after navigating
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <MobileMenuWrapper ref={wrapperRef}>
      <MobileMenuButton
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="portal-mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <Icon icon={open ? 'lucide-x' : 'lucide-menu'} size="sm" />
      </MobileMenuButton>
      {open && (
        <MobileMenuPanel id="portal-mobile-menu">
          <PortalNavLink to="/home" activePaths={['/faq']}>
            <Icon icon="lucide-home" size="xs" />
            <PortalNavLabel $always>Home</PortalNavLabel>
          </PortalNavLink>
          <PortalNavLink to="/livechat">
            <Icon icon="lucide-messages-square" size="xs" />
            <PortalNavLabel $always>Live Chat</PortalNavLabel>
          </PortalNavLink>
          <MobileMenuDivider />
          <Form method="post" action="/logout">
            <MobileMenuSignOut type="submit">
              <Icon icon="lucide-log-out" size="xs" />
              Sign out
            </MobileMenuSignOut>
          </Form>
        </MobileMenuPanel>
      )}
    </MobileMenuWrapper>
  )
}
