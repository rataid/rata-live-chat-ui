import { Placement } from '@floating-ui/react'

export type TipOptions = {
  isMobile?: boolean
  portalId?: string
  initialOpen?: boolean
  placement?: Placement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}
