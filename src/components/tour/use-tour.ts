import { DriveStep, driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { useCallback, useEffect, useRef, useState } from 'react'

import './tour.css'

// Kept per device (localStorage) and not cleared on logout
// Completed: never auto-starts again on this device
const doneKey = (id: string) => `tour.${id}.done`
// Closed before the last step: auto-starts again from the next day
const skippedOnKey = (id: string) => `tour.${id}.skippedOn`

// Local calendar day, e.g. 2026-10-29
const today = () => new Date().toLocaleDateString('en-CA')

function shouldAutoStart(id: string) {
  try {
    if (localStorage.getItem(doneKey(id)) === '1') return false

    return localStorage.getItem(skippedOnKey(id)) !== today()
  } catch {
    return false
  }
}

function markTourDone(id: string) {
  try {
    localStorage.setItem(doneKey(id), '1')
    localStorage.removeItem(skippedOnKey(id))
  } catch {}
}

function markTourSkipped(id: string) {
  try {
    localStorage.setItem(skippedOnKey(id), today())
  } catch {}
}

type UseTourOptions = {
  id: string
  steps: DriveStep[]
  // Auto start opens the welcome (TourIntro) first instead of the steps
  withIntro?: boolean
  autoStart?: boolean
  // Auto start waits for this, e.g. until the page's data has loaded
  ready?: boolean
}

export function useTour({
  id,
  steps,
  withIntro = false,
  autoStart = false,
  ready = true,
}: UseTourOptions) {
  // Also true while waiting to start, so other modals stay hidden until the
  // tour is finished or skipped
  const [isTourActive, setIsTourActive] = useState(
    () => autoStart && shouldAutoStart(id)
  )
  const [isIntroOpen, setIsIntroOpen] = useState(false)
  const driverRef = useRef<ReturnType<typeof driver>>()
  const hasAutoStarted = useRef(false)

  const start = useCallback(() => {
    const available = steps.filter(
      (step) =>
        !step.element ||
        typeof step.element !== 'string' ||
        // Present and visible (display: none has no client rects)
        !!document.querySelector(step.element)?.getClientRects().length
    )

    if (available.length === 0) {
      setIsTourActive(false)
      return
    }

    driverRef.current?.destroy()

    // e.g. the first step is "1 dari 7"
    const numbered = available.map((step, index) => ({
      ...step,
      popover: {
        ...step.popover,
        progressText: `${index + 1} dari ${available.length}`,
      },
    }))

    setIsTourActive(true)
    driverRef.current = driver({
      steps: numbered,
      popoverClass: 'app-tour',
      showProgress: available.length > 1,
      nextBtnText: 'Lanjut',
      prevBtnText: 'Kembali',
      doneBtnText: 'Selesai',
      allowClose: true,
      // Only the tour popover is clickable: not the overlay, not the
      // highlighted element
      overlayClickBehavior: 'none',
      disableActiveInteraction: true,
      // The page can't be scrolled during the tour; the tour itself still
      // scrolls each step into view
      allowScroll: false,
      overlayOpacity: 0.4,
      stagePadding: 6,
      stageRadius: 12,
      // Done on the last step completes the tour; closing earlier is a skip.
      // destroy() from here doesn't run this hook again.
      onDestroyStarted: (_element, _step, { driver: tour }) => {
        if (tour.isLastStep()) markTourDone(id)
        else markTourSkipped(id)

        tour.destroy()
      },
      onDestroyed: () => setIsTourActive(false),
    })

    driverRef.current.drive()
  }, [id, steps])

  useEffect(() => {
    if (!autoStart || !ready || hasAutoStarted.current) return undefined
    if (!shouldAutoStart(id)) return undefined

    // Restarted while loading goes on (ready flips back), so the tour starts
    // after the page has settled
    const timer = setTimeout(() => {
      hasAutoStarted.current = true
      if (withIntro) setIsIntroOpen(true)
      else start()
    }, 500)

    return () => clearTimeout(timer)
  }, [autoStart, ready, id, withIntro, start])

  useEffect(() => () => driverRef.current?.destroy(), [])

  // Props for <TourIntro />
  const intro = {
    open: isIntroOpen,
    onStart: () => {
      setIsIntroOpen(false)
      start()
    },
    // Same as skipping the tour: back the next day
    onLater: () => {
      setIsIntroOpen(false)
      markTourSkipped(id)
      setIsTourActive(false)
    },
  }

  return { start, isTourActive, intro }
}
