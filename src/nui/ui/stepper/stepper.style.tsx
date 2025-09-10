import tw, { styled } from 'twin.macro'

import { StepperProps } from './types'

export const StepperWrapper = tw.div`relative w-fit min-h-full`

export const StepperContent = styled.div<Pick<StepperProps, 'position'>>(
  ({ position }) => {
    const positionMap = {
      top: tw`items-start pt-4`,
      middle: tw`items-center`,
      bottom: tw`items-end pb-4`,
    }

    return [
      position && positionMap[position],
      tw`flex h-full w-full  justify-center`,
    ]
  }
)

export const StepperMain = styled.div<Pick<StepperProps, 'phase'>>(
  ({ phase: status }) => {
    const statusMap = {
      default: tw`border border-primary-500 bg-white h-6 w-6 rounded-full`,
      current: tw`border border-primary-500 bg-white h-6 w-6 p-1 rounded-full`,
      done: tw`border bg-primary-500 border-primary-500 h-6 w-6 rounded-full`,
    }

    return [
      tw`relative flex justify-center items-center`,
      status && statusMap[status],
    ]
  }
)

export const BoxIcon = styled.div<Pick<StepperProps, 'phase'>>(
  ({ phase: status }) => {
    const statusMap = {
      default: tw``,
      current: tw`bg-primary-500 h-full w-full rounded-full `,
      done: tw`text-white`,
    }

    return [
      tw`flex justify-center items-center scale-75`,
      status && statusMap[status],
    ]
  }
)

export const LineTop = styled.div<Pick<StepperProps, 'phase' | 'position'>>(
  ({ phase: status, position }) => {
    const statusMap = {
      default: tw`bg-gray-200`,
      current: tw`bg-primary-500`,
      done: tw`bg-primary-500`,
    }

    const positionMap = {
      top: tw`bottom-0 h-[80%]`,
      middle: tw`top-0 h-[65%]`,
      bottom: tw`top-0 h-[80%]`,
    }

    return [
      tw`absolute bottom-0 left-1/2 top-0 h-full w-[1px] rounded-full`,
      status && statusMap[status],
      position && positionMap[position],
    ]
  }
)

export const LineBottom = styled.div<Pick<StepperProps, 'phase' | 'position'>>(
  ({ phase: status, position }) => {
    const statusMap = {
      default: tw`bg-primary-500`,
      current: tw`bg-primary-500`,
      done: tw`bg-primary-500`,
    }

    const positionMap = {
      top: tw`bottom-0 h-[80%]`,
      middle: tw`bottom-0 h-[65%]`,
      bottom: tw`top-0 h-[80%]`,
    }

    return [
      tw`absolute left-1/2 w-[1px] rounded-full`,
      status && statusMap[status],
      position && positionMap[position],
    ]
  }
)
