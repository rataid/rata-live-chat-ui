import tw, { styled } from 'twin.macro'

export type ContainerProps = {
  fluid?: boolean
}

const Container = styled('div')(({ fluid = false }: ContainerProps) => [
  !fluid && tw`mx-auto max-w-screen-2xl`,
  tw`flex flex-col gap-y-6 px-4 md:px-14`,
])

export default Container
