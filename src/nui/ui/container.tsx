import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export type ContainerProps = {
  fluid?: boolean
}

const Container = styled('div').attrs<ContainerProps>(({ fluid = false }: ContainerProps) => ({ className: [!fluid && tw`mx-auto max-w-screen-2xl`, tw`flex flex-col gap-y-6 px-4 md:px-14`].filter(Boolean).join(' ') }))<ContainerProps>``

export default Container
