import { TipContext, useTip } from './hooks'
import { TipOptions } from './type'

export function Tooltip({
  children,
  ...options
}: { children: React.ReactNode } & TipOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTip(options)
  return <TipContext.Provider value={tooltip}>{children}</TipContext.Provider>
}
