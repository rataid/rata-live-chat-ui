import { jsonStringify } from '@utils'

import Syntax from '../syntax'
import { DumpProps } from './types'

export function Dump({ children }: DumpProps) {
  return <Syntax>{jsonStringify(children)}</Syntax>
}
