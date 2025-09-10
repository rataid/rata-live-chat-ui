export type TreeContextState = {
  nodeHeight: number
  gap: number
}

export type TreeProps = Partial<TreeContextState> & React.PropsWithChildren

export type TreeNodeProps = {
  height?: number
} & React.PropsWithChildren

export type TreeChildrenProps = {
  isRoot?: boolean
} & React.PropsWithChildren
