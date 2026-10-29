import { useEffect } from 'react'

import Button from '@nui/ui/button'

import {
  TourIntroBackdrop,
  TourIntroBody,
  TourIntroCard,
  TourIntroFooter,
  TourIntroText,
  TourIntroTitle,
} from './tour-intro.style'

type TourIntroProps = {
  open: boolean
  title: string
  description: string
  onStart: () => void
  onLater: () => void
}

// Welcome before the dashboard tour: "Mulai" starts it, "Nanti saja" skips
// it for today
export function TourIntro({
  open,
  title,
  description,
  onStart,
  onLater,
}: TourIntroProps) {
  // Same as the tour (driver.js allowScroll: false): the page stays put
  // behind the welcome
  useEffect(() => {
    if (!open) return undefined

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = overflow
    }
  }, [open])

  if (!open) return null

  return (
    <TourIntroBackdrop>
      <TourIntroCard
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-intro-title"
      >
        <TourIntroBody>
          <TourIntroTitle id="tour-intro-title">{title}</TourIntroTitle>
          <TourIntroText>{description}</TourIntroText>
        </TourIntroBody>
        <TourIntroFooter>
          <Button
            variant="secondaryGray"
            wider="full"
            fontWeight="medium"
            onClick={onLater}
          >
            Nanti saja
          </Button>
          <Button wider="full" fontWeight="medium" autoFocus onClick={onStart}>
            Mulai
          </Button>
        </TourIntroFooter>
      </TourIntroCard>
    </TourIntroBackdrop>
  )
}
