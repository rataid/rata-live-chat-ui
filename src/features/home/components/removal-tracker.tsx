import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import {
  WearToday,
  startWearTimer,
  stopWearTimer,
  useWearToday,
  wearTodayKey,
} from '@/api/aligner/wear'
import { getApiErrorMessage } from '@/api/shared/error'
import Button from '@nui/ui/button'
import { showToast } from '@nui/ui/toast'

import {
  Card,
  CardLabel,
  ProgressFill,
  ProgressTrack,
  StatusBadge,
  TrackerMeta,
  TrackerPercent,
  TrackerValue,
  TrackerValueRow,
} from './home.style'

// 612 -> 00:10:12
function formatDuration(totalSeconds: number) {
  const seconds = Math.max(0, totalSeconds)
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':')
}

function useSecondTick(active: boolean) {
  const [, setTick] = useState(0)

  useEffect(() => {
    if (!active) return undefined

    const timer = setInterval(() => setTick((t) => t + 1), 1000)

    return () => clearInterval(timer)
  }, [active])
}

export function RemovalTracker() {
  const queryClient = useQueryClient()

  const {
    data: wear,
    dataUpdatedAt,
    isLoading,
    isError,
    refetch,
  } = useWearToday()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const isActive = !!wear?.active

  useSecondTick(isActive)

  const shownSec = wear
    ? wear.removedSec +
      (isActive ? Math.floor((Date.now() - dataUpdatedAt) / 1000) : 0)
    : 0

  const allowanceSec = wear?.allowanceSec ?? 0
  const remainingSec = allowanceSec - shownSec
  const isOver = remainingSec < 0

  const percent = !wear
    ? 0
    : isActive && allowanceSec > 0
    ? Math.min(100, Math.round((shownSec / allowanceSec) * 100))
    : wear.removalPercent

  const toggleTimer = async () => {
    setIsSubmitting(true)

    try {
      const next: WearToday = isActive
        ? await stopWearTimer()
        : await startWearTimer()

      queryClient.setQueryData(wearTodayKey, next)
    } catch (error) {
      // 400 "Removal timer is already running", 404 "Removal timer is not running"
      showToast({
        type: 'error',
        title: isActive ? 'Failed to Stop Timer' : 'Failed to Start Timer',
        message: getApiErrorMessage(error, 'Please try again in a moment.'),
      })
      // Bring the card back in line with the server
      await queryClient.invalidateQueries({ queryKey: wearTodayKey })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isError) {
    return (
      <Card>
        <CardLabel>Aligner Removal Tracker</CardLabel>
        <p className="text-sm text-gray-500">
          Couldn&apos;t load today&apos;s removal time. Please try again.
        </p>
        <Button variant="secondaryGray" onClick={() => refetch()}>
          Try again
        </Button>
      </Card>
    )
  }

  return (
    <Card aria-busy={isLoading}>
      <CardLabel>Aligner Removal Tracker</CardLabel>
      <TrackerValueRow>
        <TrackerValue>{formatDuration(shownSec)}</TrackerValue>
        <TrackerPercent>{percent}%</TrackerPercent>
      </TrackerValueRow>
      <ProgressTrack>
        <ProgressFill style={{ width: `${percent}%` }} />
      </ProgressTrack>
      <TrackerMeta>
        <span>
          {isOver
            ? `${formatDuration(-remainingSec)} over the limit`
            : `${formatDuration(remainingSec)} left today`}
        </span>
        {wear && (
          <StatusBadge $over={isOver}>
            {isOver ? 'Over limit' : 'On track'}
          </StatusBadge>
        )}
      </TrackerMeta>
      {/* Same copy as Figma in both states; it stops the timer while active */}
      <Button
        wider="full"
        fontWeight="medium"
        icon="lucide-play"
        disabled={isLoading || isSubmitting}
        aria-pressed={isActive}
        onClick={toggleTimer}
      >
        Start removal timer
      </Button>
    </Card>
  )
}
