import * as React from 'react'

import { TipContext, useTip } from './hooks'
import { TipOptions } from './type'

export * from './components/content'
export * from './components/trigger'

export default function Tip({
  children,
  ...options
}: { children: React.ReactNode } & TipOptions) {
  // This can accept any props as options, e.g. `placement`,
  // or other positioning options.
  const tooltip = useTip(options)
  return <TipContext.Provider value={tooltip}>{children}</TipContext.Provider>
}
