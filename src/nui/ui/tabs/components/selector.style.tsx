import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

import { VariantTabs } from '../types'

type TabsSelectorStyleProps = {
  isActive?: boolean
  disabled?: boolean
  variant?: VariantTabs
}

const navLinkVariantMap: Record<VariantTabs, string> = {
  tabs: '-mb-[.0625rem] w-fit xl:min-w-[4.5rem] flex items-center justify-center shrink-0 focus:outline-none',
  bar: 'border-r border-gray-200 min-w-max last:border-none',
}

const buttonVariantMap: Record<VariantTabs, string> = {
  tabs: '-mb-[.0625rem] w-fit min-w-[4.5rem] flex items-center justify-center shrink-0 focus:outline-none',
  bar: 'border-r border-gray-200 min-w-max last:border-none',
}

export const TabsSelectorNavLink = styled(NavLink).attrs<TabsSelectorStyleProps>(
  ({ variant }) => ({
    className: (variant && navLinkVariantMap[variant]) || '',
  })
)<TabsSelectorStyleProps>``

export const TabsSelectorButton = styled.button.attrs<TabsSelectorStyleProps>(
  ({ variant }) => ({
    className: (variant && buttonVariantMap[variant]) || '',
  })
)<TabsSelectorStyleProps>``

export const TabsSelectorWrapper = styled.div.attrs<TabsSelectorStyleProps>(
  ({ variant, isActive, disabled = false }) => {
    const wrapperMap: Record<VariantTabs, string[]> = {
      tabs: [
        tw`px-3 pb-4`,
        isActive ? tw`text-primary-600 border-b-2 border-primary-700` : '',
        disabled ? tw`text-gray-400 !cursor-not-allowed` : '',
      ],
      bar: [
        tw`px-4 py-2.5`,
        isActive
          ? tw`bg-gray-50 font-semibold text-gray-900`
          : tw`bg-white text-gray-700 font-medium`,
        disabled ? tw`text-gray-400 !cursor-not-allowed` : '',
      ],
    }

    return {
      className: variant
        ? wrapperMap[variant].filter(Boolean).join(' ')
        : '',
    }
  }
)<TabsSelectorStyleProps>``

export const TabsSelectorMain = styled.div.attrs({
  className: tw`h-full flex items-center justify-between gap-x-2`,
})``
