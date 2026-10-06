import { differenceInCalendarDays, format, subDays } from 'date-fns'
import { useState } from 'react'

import Button from '@nui/ui/button'
import { useDialog } from '@nui/ui/dialog'
import Tooltip from '@nui/ui/tooltip'

import { DUMMY_ALIGNER, DUMMY_ALIGNER_SET_HISTORY } from '../dummy'
import { AlignerSetHistory } from './aligner-set-history'
import {
  AlignerTrackerSettings,
  AlignerTrackerSettingsValues,
} from './aligner-tracker-settings'
import {
  Card,
  CardLabel,
  HistoryCollapse,
  HistoryCollapseInner,
  ProgressFill,
  ProgressTrack,
  TrackerActions,
  TrackerMeta,
  TrackerPercent,
  TrackerValue,
  TrackerValueRow,
  TrackerValueSuffix,
} from './home.style'

export function AlignerTracker() {
  // @todo: load and save the tracker (and its settings) through the backend
  const [aligner, setAligner] = useState(DUMMY_ALIGNER)
  const [history, setHistory] = useState(DUMMY_ALIGNER_SET_HISTORY)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  const { currentSet, totalSets, daysPerSet, currentDay } = aligner

  const percent = Math.round((currentSet / totalSets) * 100)
  const daysToGo = daysPerSet - currentDay + 1
  const isLastSet = currentSet >= totalSets

  const { openDialog } = useDialog()

  const saveSettings = (values: AlignerTrackerSettingsValues) => {
    // Day 1 is the start date; capped to the set duration
    const day =
      differenceInCalendarDays(new Date(), new Date(values.startDate)) + 1

    setAligner({
      currentSet: values.currentSet,
      totalSets: values.totalSets,
      daysPerSet: values.daysPerSet,
      currentDay: Math.min(Math.max(day, 1), values.daysPerSet),
    })

    if (values.currentSet !== currentSet) {
      setHistory((prev) => [
        { set: values.currentSet, changedAt: values.startDate },
        ...prev,
      ])
    }
  }

  const openSettings = () =>
    openDialog(
      <AlignerTrackerSettings
        defaultValues={{
          currentSet,
          totalSets,
          daysPerSet,
          startDate: format(subDays(new Date(), currentDay - 1), 'yyyy-MM-dd'),
        }}
        onSave={saveSettings}
      />,
      { size: 'md' }
    )

  return (
    <Card>
      <CardLabel>Aligner Tracker</CardLabel>
      <TrackerValueRow>
        <TrackerValue>
          Set {currentSet}
          <TrackerValueSuffix>of {totalSets}</TrackerValueSuffix>
        </TrackerValue>
        <TrackerPercent>{percent}%</TrackerPercent>
      </TrackerValueRow>
      <ProgressTrack>
        <ProgressFill style={{ width: `${percent}%` }} />
      </ProgressTrack>
      <TrackerMeta>
        <span>{daysToGo} days to go</span>
        <span>
          Day {currentDay}/{daysPerSet} · {totalSets - currentSet} left
        </span>
      </TrackerMeta>
      <TrackerActions>
        <Button
          wider="full"
          fontWeight="medium"
          disabled={isLastSet}
          onClick={() => {
            const nextSet = currentSet + 1
            setAligner((prev) => ({
              ...prev,
              currentSet: nextSet,
              currentDay: 1,
            }))
            // Dummy: record the change so the history panel shows it
            setHistory((prev) => [
              { set: nextSet, changedAt: new Date().toISOString() },
              ...prev,
            ])
          }}
        >
          {isLastSet ? 'Last set' : `Change to Set ${currentSet + 1}`}
        </Button>
        <Tooltip content="Setup Tracker Aligner">
          <Button
            variant="secondaryGray"
            icon="lucide-settings"
            aria-label="Setup Tracker Aligner"
            onClick={openSettings}
          />
        </Tooltip>
        <Tooltip content="History Aligner Sets">
          <Button
            variant={isHistoryOpen ? 'primary' : 'secondaryGray'}
            icon="lucide-history"
            aria-label="History Aligner Sets"
            aria-expanded={isHistoryOpen}
            aria-controls="aligner-set-history"
            onClick={() => setIsHistoryOpen((value) => !value)}
          />
        </Tooltip>
      </TrackerActions>
      {/* Kept mounted so it can animate; hidden from screen readers while closed */}
      <HistoryCollapse $open={isHistoryOpen} aria-hidden={!isHistoryOpen}>
        <HistoryCollapseInner>
          <AlignerSetHistory id="aligner-set-history" items={history} />
        </HistoryCollapseInner>
      </HistoryCollapse>
    </Card>
  )
}
