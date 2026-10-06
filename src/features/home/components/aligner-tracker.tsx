import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useState } from 'react'

import { alignerHistoryKey, useAlignerHistory } from '@/api/aligner/history'
import {
  AlignerPlan,
  alignerPlanKey,
  changeToNextAlignerSet,
  saveAlignerPlan,
  useAlignerPlan,
} from '@/api/aligner/plan'
import { getApiErrorMessage } from '@/api/shared/error'
import Button from '@nui/ui/button'
import { useDialog } from '@nui/ui/dialog'
import { showToast } from '@nui/ui/toast'
import Tooltip from '@nui/ui/tooltip'

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
  const queryClient = useQueryClient()

  const { data: plan, isLoading, isError, refetch } = useAlignerPlan()

  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  const historyQuery = useAlignerHistory(isHistoryOpen)

  // The server adds a history row when the set changes
  const refreshHistory = () =>
    queryClient.invalidateQueries({ queryKey: alignerHistoryKey })

  const { openDialog } = useDialog()

  const updatePlan = (next: AlignerPlan) => {
    queryClient.setQueryData(alignerPlanKey, next)
  }

  const saveSettings = async (values: AlignerTrackerSettingsValues) => {
    let saved: AlignerPlan | null

    try {
      saved = await saveAlignerPlan({
        currentSet: values.currentSet,
        totalSets: values.totalSets,
        durationDays: values.daysPerSet,
        startedOn: format(new Date(values.startDate), 'yyyy-MM-dd'),
      })
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Failed to Save Tracker',
        message: getApiErrorMessage(error, 'Please try again in a moment.'),
      })
      throw error
    }

    if (saved) {
      updatePlan(saved)
    } else {
      await queryClient.invalidateQueries({ queryKey: alignerPlanKey })
    }

    if (values.currentSet !== plan?.currentSet) refreshHistory()
  }

  const [isChangingSet, setIsChangingSet] = useState(false)

  const changeToNextSet = async () => {
    if (!plan) return

    setIsChangingSet(true)

    try {
      const next = await changeToNextAlignerSet()

      if (next) {
        updatePlan(next)
        refreshHistory()
      } else {
        await queryClient.invalidateQueries({ queryKey: alignerPlanKey })
      }
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Failed to Change Set',
        message: getApiErrorMessage(error, 'Please try again in a moment.'),
      })
      await queryClient.invalidateQueries({ queryKey: alignerPlanKey })
    } finally {
      setIsChangingSet(false)
    }
  }

  const openSettings = () =>
    openDialog(
      <AlignerTrackerSettings
        defaultValues={
          plan
            ? {
                currentSet: plan.currentSet,
                totalSets: plan.totalSets,
                daysPerSet: plan.durationDays,
                startDate: plan.startedOn,
              }
            : {
                currentSet: 0,
                totalSets: 0,
                daysPerSet: 14,
                startDate: format(new Date(), 'yyyy-MM-dd'),
              }
        }
        onSave={saveSettings}
      />,
      { size: 'md' }
    )

  if (isError) {
    return (
      <Card data-tour="aligner-tracker">
        <CardLabel>Aligner Tracker</CardLabel>
        <p className="text-sm text-gray-500">
          Couldn&apos;t load your tracker. Please try again.
        </p>
        <Button variant="secondaryGray" onClick={() => refetch()}>
          Try again
        </Button>
      </Card>
    )
  }

  const hasPlan = !!plan
  const isLastSet = hasPlan && plan.currentSet >= plan.totalSets
  const percent = plan?.completionPercent ?? 0

  return (
    <Card aria-busy={isLoading} data-tour="aligner-tracker">
      <CardLabel>Aligner Tracker</CardLabel>
      <TrackerValueRow>
        <TrackerValue>
          Set {plan?.currentSet ?? '??'}
          <TrackerValueSuffix>of {plan?.totalSets ?? '??'}</TrackerValueSuffix>
        </TrackerValue>
        <TrackerPercent>{hasPlan ? `${percent}%` : '???%'}</TrackerPercent>
      </TrackerValueRow>
      <ProgressTrack>
        <ProgressFill style={{ width: `${percent}%` }} />
      </ProgressTrack>
      <TrackerMeta>
        <span>{plan?.daysLeft ?? '--'} days to go</span>
        <span>
          Day {plan?.dayIndex ?? '-'}/{plan?.durationDays ?? '-'}
          {hasPlan && ` · ${plan.totalSets - plan.currentSet} left`}
        </span>
      </TrackerMeta>
      <TrackerActions>
        {!hasPlan && (
          <Button
            wider="full"
            fontWeight="medium"
            disabled={isLoading}
            onClick={openSettings}
          >
            Set up tracker
          </Button>
        )}
        {hasPlan && (
          <Button
            wider="full"
            fontWeight="medium"
            disabled={isLastSet || isChangingSet}
            data-tour="change-set"
            onClick={changeToNextSet}
          >
            {isLastSet
              ? 'All sets completed'
              : isChangingSet
              ? 'Changing set...'
              : `Change to Set ${plan.currentSet + 1}`}
          </Button>
        )}
        {hasPlan && (
          <>
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
          </>
        )}
      </TrackerActions>
      {hasPlan && (
        <HistoryCollapse $open={isHistoryOpen} aria-hidden={!isHistoryOpen}>
          <HistoryCollapseInner>
            <AlignerSetHistory
              id="aligner-set-history"
              items={historyQuery.data}
              isLoading={
                historyQuery.isLoading && historyQuery.fetchStatus !== 'idle'
              }
              isError={historyQuery.isError}
            />
          </HistoryCollapseInner>
        </HistoryCollapse>
      )}
    </Card>
  )
}
