import { TreeChildrenProps } from '../types'
import { TreeChildrenWrapper } from './children.style'

export function TreeChildren({ isRoot, children }: TreeChildrenProps) {
  return <TreeChildrenWrapper isRoot={isRoot}>{children}</TreeChildrenWrapper>
}
