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
  // @todo: steps 3–8
]
