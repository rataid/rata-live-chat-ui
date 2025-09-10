import { DEFAULT_HEIGHT } from '../config'
import { TreeNodeProps } from '../types'
import { TreeNodeWrapper } from './node.style'

export function TreeNode({ height = DEFAULT_HEIGHT, children }: TreeNodeProps) {
  return <TreeNodeWrapper height={height}>{children}</TreeNodeWrapper>
}
