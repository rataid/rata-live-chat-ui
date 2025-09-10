import {
  useClick,
  useFloating,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react'

import Icon from '@nui/ui/icon'

import { useDisclosureContext } from './context'
import {
  DisclosureButton,
  DisclosureButtonMain,
  DisclosureIcon,
  DisclosureMain,
  DisclosureWrapper,
} from './disclosure.style'
import { DisclosureProps } from './types'

export default function Disclosure({
  id,
  label,
  disabled,
  children,
}: DisclosureProps) {
  const groupContext = useDisclosureContext()

  const open = groupContext.isOpen === id

  const { refs, context } = useFloating({
    open,
    onOpenChange: () => groupContext.setIsOpen(!open ? id : ''),
  })

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: {
      open: 200,
      close: 100,
    },
    initial: {
      opacity: 0,
      transform: 'translateY(-100px)',
      height: '0%',
    },
    open: {
      opacity: 1,
      transform: 'translateY(0px)',
      height: '100%',
    },
  })

  const click = useClick(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([click])

  return (
    <DisclosureWrapper>
      <DisclosureButton
        className="group"
        disabled={disabled}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <DisclosureButtonMain>{label}</DisclosureButtonMain>
        <DisclosureIcon
          isOpen={isMounted && groupContext.isOpen === id}
          disabled={disabled}
        >
          <Icon stroke="md" size="sm" icon="lucide:chevron-down" />
        </DisclosureIcon>
      </DisclosureButton>
      {isMounted && groupContext.isOpen === id && (
        <DisclosureMain>
          <div
            ref={refs.setFloating}
            style={{ ...styles }}
            {...getFloatingProps()}
          >
            {children}
          </div>
        </DisclosureMain>
      )}
    </DisclosureWrapper>
  )
}
