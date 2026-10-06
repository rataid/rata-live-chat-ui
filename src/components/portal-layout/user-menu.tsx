import { useEffect, useRef, useState } from 'react'
import { Form } from 'react-router-dom'

import { AvatarPlaceholder } from '@/assets'
import Icon from '@nui/ui/icon'

import {
  UserMenuAvatar,
  UserMenuButton,
  UserMenuItem,
  UserMenuName,
  UserMenuPanel,
  UserMenuWrapper,
} from './portal-layout.style'

export function UserMenu({ name }: { name?: string }) {
  const [open, setOpen] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)

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
    <UserMenuWrapper ref={wrapperRef}>
      <UserMenuButton
        type="button"
        aria-label="Account menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <UserMenuAvatar>
          <AvatarPlaceholder className="h-full w-full" />
        </UserMenuAvatar>
        <Icon icon="lucide-chevron-down" size="xs" />
      </UserMenuButton>
      {open && (
        <UserMenuPanel>
          <Form method="post" action="/logout">
            <UserMenuItem type="submit">
              <Icon icon="lucide-log-out" size="xs" />
              Sign out
            </UserMenuItem>
          </Form>
        </UserMenuPanel>
      )}
    </UserMenuWrapper>
  )
}
