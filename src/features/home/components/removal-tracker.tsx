import { useEffect, useState } from 'react'

import Button from '@nui/ui/button'

import { DUMMY_REMOVAL } from '../dummy'
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

export function RemovalTracker() {
  const { dailyLimitSeconds } = DUMMY_REMOVAL

  // @todo: sync the timer with the backend so it survives a page reload
  const [removedSeconds, setRemovedSeconds] = useState(
    DUMMY_REMOVAL.removedSeconds
  )
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return undefined

    const timer = setInterval(() => setRemovedSeconds((s) => s + 1), 1000)

    return () => clearInterval(timer)
  }, [isRunning])

  const percent = Math.min(
    100,
    Math.round((removedSeconds / dailyLimitSeconds) * 100)
  )
  const leftSeconds = dailyLimitSeconds - removedSeconds
  const isOver = leftSeconds < 0

  return (
    <Card>
      <CardLabel>Aligner Removal Tracker</CardLabel>
      <TrackerValueRow>
        <TrackerValue>{formatDuration(removedSeconds)}</TrackerValue>
        <TrackerPercent>{percent}%</TrackerPercent>
      </TrackerValueRow>
      <ProgressTrack>
        <ProgressFill style={{ width: `${percent}%` }} />
      </ProgressTrack>
      <TrackerMeta>
        <span>
          {isOver
            ? `${formatDuration(-leftSeconds)} over the limit`
            : `${formatDuration(leftSeconds)} left today`}
        </span>
        <StatusBadge $over={isOver}>
          {isOver ? 'Over limit' : 'On track'}
        </StatusBadge>
      </TrackerMeta>
      <Button
        wider="full"
        fontWeight="medium"
        icon={isRunning ? 'lucide-square' : 'lucide-play'}
        onClick={() => setIsRunning((value) => !value)}
      >
        {isRunning ? 'Stop removal timer' : 'Start removal timer'}
      </Button>
    </Card>
  )
}
