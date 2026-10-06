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
  // @todo: steps 2–8
]
