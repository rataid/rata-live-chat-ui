import Stack from '@nui/ui/stack'

type FormColumnProps = {
  fit?: boolean
  flow?: 'row' | 'column'
  width?: number
} & React.PropsWithChildren

export function FormColumn({ flow, fit, width, children }: FormColumnProps) {
  return (
    <Stack width={width} flow={flow} fit={fit} spacing="2rem">
      {children}
    </Stack>
  )
}
