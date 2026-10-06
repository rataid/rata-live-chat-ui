// @todo: replace with data from the backend
export const DUMMY_ALIGNER = {
  currentSet: 0,
  totalSets: 0,
  daysPerSet: 14,
  currentDay: 1,
}

// Aligners can be out of the mouth for 2 hours a day
export const DUMMY_REMOVAL = {
  dailyLimitSeconds: 2 * 60 * 60,
  removedSeconds: 0 * 0 + 0,
}

// Newest first
export const DUMMY_ALIGNER_SET_HISTORY = [
  { set: 12, changedAt: '2026-09-30' },
  { set: 11, changedAt: '2026-09-20' },
  { set: 10, changedAt: '2026-09-10' },
]
