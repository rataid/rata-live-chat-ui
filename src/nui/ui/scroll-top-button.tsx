import { PropsWithChildren, useCallback, useEffect, useState } from 'react'

import Button from './button'
import Tooltip from './tooltip'

type ScrollTopButtonProps = {
  elementScrollId?: string
  targetScrollId?: string
} & PropsWithChildren

export default function ScrollTopButton({
  elementScrollId = '',
  targetScrollId = '',
  children,
}: ScrollTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = useCallback(() => {
    const element = document.getElementById(elementScrollId)
    const { scrollTop } = element ?? { scrollTop: 0 }
    if (scrollTop > 400) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [elementScrollId])

  // Scroll to the top when the button is clicked
  const scrollToTop = () => {
    const element = document.getElementById(targetScrollId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('wheel', handleScroll, false)
    window.addEventListener('touchstart', handleScroll, false)

    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchstart', handleScroll)
    }
  }, [handleScroll])

  return (
    <div className="relative">
      {isVisible && (
        <div className="fixed z-[40] bottom-6 right-6">
          <Tooltip content="Back to top" placement="left">
            <Button
              icon="lucide:arrow-up"
              variant="secondaryGray"
              size="sm"
              onClick={scrollToTop}
            />
          </Tooltip>
        </div>
      )}
      {children}
    </div>
  )
}
