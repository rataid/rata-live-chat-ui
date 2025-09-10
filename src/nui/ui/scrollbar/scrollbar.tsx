import { ScrollbarMain } from './scrollbar.style'
import { ScrollbarProps } from './type'

export function Scrollbar({
  scroll = true,
  maxHeight = 400,
  positionTrack,
  children,
}: ScrollbarProps) {
  if (!scroll) {
    return <div>{children}</div>
  }

  return (
    <ScrollbarMain
      $positionTrack={positionTrack}
      style={{ maxHeight, padding: '1px' }}
    >
      {children}
    </ScrollbarMain>
  )
}
