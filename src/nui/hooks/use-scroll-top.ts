import { useEffect } from 'react'
import { useNavigation } from 'react-router-dom'

export default function useScrollTop(elementId?: string) {
  const status = useNavigation().state

  useEffect(() => {
    if (status !== 'loading') {
      // If no id is passed, scroll to the top of the page
      if (!elementId) {
        window.scrollTo(0, 0) // Scroll to top of the page
      } else {
        // Otherwise, scroll to the element with the specified ID
        const element = document.getElementById(elementId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }, [elementId, status])
}
