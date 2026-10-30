import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useState } from 'react'

import { alignerHistoryKey, useAlignerHistory } from '@/api/aligner/history'
import {
  alignerPlanKey,
  changeToNextAlignerSet,
  saveAlignerPlan,
  useAlignerPlan,
} from '@/api/aligner/plan'
import { getApiErrorMessage } from '@/api/shared/error'
import { AlignerPlan, AlignerTrackerSettingsValues } from '@/model/aligner'
import Button from '@nui/ui/button'
import { useDialog } from '@nui/ui/dialog'
import { showToast } from '@nui/ui/toast'
import Tooltip from '@nui/ui/tooltip'

import { AlignerSetHistory } from './aligner-set-history'
import { AlignerTrackerSettings } from './aligner-tracker-settings'
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

const ALIGNER_HISTORY_LIMIT = 3

export function AlignerTracker() {
  const queryClient = useQueryClient()

  const { data: plan, isLoading, isError, refetch } = useAlignerPlan()

  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  const historyQuery = useAlignerHistory(isHistoryOpen, ALIGNER_HISTORY_LIMIT)

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
                currentSet: 1,
                totalSets: 1,
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
        <CardLabel>Pantau Progres Aligner</CardLabel>
        <p className="text-sm text-gray-500">
          Tidak dapat memuat progres Aligner. Silakan coba lagi.
        </p>
        <Button variant="secondaryGray" onClick={() => refetch()}>
          Coba Lagi
        </Button>
      </Card>
    )
  }

  const hasPlan = !!plan
  const isLastSet = hasPlan && plan.currentSet >= plan.totalSets
  const percent = plan?.completionPercent ?? 0

  return (
    <Card aria-busy={isLoading} data-tour="aligner-tracker">
      <CardLabel>Pantau Progres Aligner</CardLabel>
      <TrackerValueRow>
        <TrackerValue>
          Set {plan?.currentSet ?? '??'}
          <TrackerValueSuffix>
            dari {plan?.totalSets ?? '??'}
          </TrackerValueSuffix>
        </TrackerValue>
        <TrackerPercent>{hasPlan ? `${percent}%` : '??%'}</TrackerPercent>
      </TrackerValueRow>
      <ProgressTrack>
        <ProgressFill style={{ width: `${percent}%` }} />
      </ProgressTrack>
      <TrackerMeta>
        <span>{plan?.daysLeft ?? '??'} hari lagi</span>
        <span>
          Hari ke {plan?.dayIndex ? `-${plan.dayIndex}` : '?'}/
          {plan?.durationDays ?? '?'} · tersisa{' '}
          {hasPlan ? plan.totalSets - plan.currentSet : '?'} set
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
            Atur progres Aligner
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
              ? 'Semua Set Selesai'
              : isChangingSet
              ? 'Ganti ke Set...'
              : `Ganti ke Set ${plan.currentSet + 1}`}
          </Button>
        )}
        <>
          <Tooltip content="Setup Tracker Aligner">
            <Button
              variant="secondaryGray"
              icon="lucide-settings"
              aria-label="Atur progres Aligner"
              onClick={openSettings}
              disabled={!hasPlan || isLoading}
            />
          </Tooltip>
          <Tooltip content="History Aligner Sets">
            <Button
              variant={isHistoryOpen ? 'primary' : 'secondaryGray'}
              icon="lucide-history"
              aria-label="Riwayat"
              aria-expanded={isHistoryOpen}
              aria-controls="aligner-set-history"
              onClick={() => setIsHistoryOpen((value) => !value)}
              disabled={!hasPlan || isLoading}
            />
          </Tooltip>
        </>
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
