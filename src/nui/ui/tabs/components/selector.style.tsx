import { NavLink } from 'react-router-dom'
import tw, { styled } from 'twin.macro'

import { VariantTabs } from '../types'

type TabsSelectorProps = {
  isActive?: boolean
  disabled?: boolean
  variant?: VariantTabs
}

export const TabsSelectorNavLink = styled(NavLink)<TabsSelectorProps>(
  ({ variant }) => {
    const variantMap = {
      tabs: tw`-mb-[.0625rem] w-fit xl:min-w-[4.5rem] flex items-center justify-center shrink-0 focus:outline-none`,
      bar: tw`border-r border-gray-200 min-w-max last:border-none`,
    }
    return [variant && variantMap[variant]]
  }
)

export const TabsSelectorButton = styled.button<TabsSelectorProps>(
  ({ variant }) => {
    const variantMap = {
      tabs: tw`-mb-[.0625rem] w-fit min-w-[4.5rem] flex items-center justify-center shrink-0 focus:outline-none`,
      bar: tw`border-r border-gray-200 min-w-max last:border-none`,
    }
    return [variant && variantMap[variant]]
  }
)

export const TabsSelectorWrapper = styled.div<TabsSelectorProps>(
  ({ variant, isActive, disabled = false }) => {
    const variantMap = {
      tabs: [
        tw`px-3 pb-4`,
        isActive && tw`text-primary-600 border-b-2 border-primary-700`,
        disabled && tw`text-gray-400 !cursor-not-allowed`,
      ],
      bar: [
        tw`px-4 py-2.5`,
        isActive
          ? tw`bg-gray-50 font-semibold text-gray-900`
          : tw`bg-white text-gray-700 font-medium`,
        disabled && tw`text-gray-400 !cursor-not-allowed`,
      ],
    }
    return [variant && variantMap[variant]]
  }
)

export const TabsSelectorMain = tw.div`h-full flex items-center justify-between gap-x-2`
