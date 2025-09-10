// @todo: handle title prop
import Tip, { TipContent, TipTrigger } from '../tip'
import { TooltipContent, TooltipMain, TooltipWrapper } from './tooltip.style'
import { TooltipProps } from './types'

export function Tooltip({
  portalId,
  title,
  content,
  variant = 'light',
  size = 'sm',
  rounded = 'lg',
  padding = 'sm',
  children,
  placement = 'top',
  isMobile,
  ...floatinTooltipOptions
}: TooltipProps) {
  return (
    <Tip placement={placement} isMobile={isMobile} {...floatinTooltipOptions}>
      <TipTrigger>{children}</TipTrigger>
      {content && (
        <TipContent id={portalId}>
          <TooltipWrapper
            isMobile={isMobile}
            variant={variant}
            rounded={rounded}
            size={size}
            padding={padding}
          >
            {content}
            {!isMobile && (
              <TooltipContent>
                <TooltipMain variant={variant} />
              </TooltipContent>
            )}
          </TooltipWrapper>
        </TipContent>
      )}
    </Tip>
  )
}
