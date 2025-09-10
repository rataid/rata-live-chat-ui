import { useEffect, useRef } from 'react'
import { useNavigation } from 'react-router-dom'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'

export default function LayoutUiLoader() {
  const loadingRef = useRef<LoadingBarRef>(null)

  const status = useNavigation().state

  useEffect(() => {
    if (loadingRef.current) {
      switch (true) {
        case status === 'loading':
          loadingRef.current.continuousStart()
          break
        case status === 'submitting':
          loadingRef.current.continuousStart()
          break
        default:
          loadingRef.current.complete()
          break
      }
    }
  }, [status])

  return (
    <LoadingBar
      style={{ height: '1.5px' }}
      shadow={false}
      color="#9E77ED"
      ref={loadingRef}
    />
  )
}
