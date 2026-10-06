import { TourStep } from '@/components/tour'

// First-visit tour after login. Saved as `tour.home.done` in localStorage,
// which logout doesn't clear, so it shows once per browser.
export const HOME_TOUR_ID = 'home'

// Targets are marked with data-tour="..." in the home components
export const HOME_TOUR_STEPS: TourStep[] = [
  {
    element: '[data-tour="brand-tabs"]',
    popover: {
      title: 'Choose your treatment',
      description:
        'Switch between RATA Aligner, TANAM Implant and VINIR Veneer. Each has its own guides.',
      side: 'bottom',
      align: 'center',
    },
  },
  {
    element: '[data-tour="aligner-tracker"]',
    popover: {
      title: 'Aligner Tracker',
      description:
        'See which set you are on, how many days are left, and your overall progress.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    // Only there once the tracker is set up; skipped otherwise
    element: '[data-tour="change-set"]',
    popover: {
      title: 'Change to the next set',
      description:
        'Tap here on the day you switch. The countdown restarts and the change is saved to History.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '[data-tour="removal-tracker"]',
    popover: {
      title: 'Aligner Removal Tracker',
      description:
        'Start the timer whenever you take your aligner out. Keep it under 2 hours a day.',
      side: 'bottom',
      align: 'start',
    },
  },
  // @todo: steps 5–8
]
