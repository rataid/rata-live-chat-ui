import { DriveStep, driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { useCallback, useEffect, useRef, useState } from 'react'

import './tour.css'

const storageKey = (id: string) => `tour.${id}.done`

function isTourDone(id: string) {
  try {
    return localStorage.getItem(storageKey(id)) === '1'
  } catch {
    return false
  }
}

function markTourDone(id: string) {
  try {
    localStorage.setItem(storageKey(id), '1')
  } catch {}
}

type UseTourOptions = {
  id: string
  steps: DriveStep[]
  autoStart?: boolean
}

export function useTour({ id, steps, autoStart = false }: UseTourOptions) {
  const [isTourActive, setIsTourActive] = useState(
    () => autoStart && !isTourDone(id)
  )
  const driverRef = useRef<ReturnType<typeof driver>>()

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

    setIsTourActive(true)
    driverRef.current = driver({
      steps: available,
      popoverClass: 'app-tour',
      showProgress: available.length > 1,
      progressText: '{{current}} of {{total}}',
      nextBtnText: 'Next',
      prevBtnText: 'Back',
      doneBtnText: 'Done',
      allowClose: true,
      overlayOpacity: 0.4,
      stagePadding: 6,
      stageRadius: 12,
      onDestroyed: () => {
        markTourDone(id)
        setIsTourActive(false)
      },
    })

    driverRef.current.drive()
  }, [id, steps])

  useEffect(() => {
    if (!autoStart || isTourDone(id)) return undefined

    const timer = setTimeout(start, 500)

    return () => clearTimeout(timer)
  }, [autoStart, id, start])

  useEffect(() => () => driverRef.current?.destroy(), [])

  return { start, isTourActive }
}
