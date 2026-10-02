import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'

import Dot from '@nui/ui/dot'

import { useTabs } from '../hooks'
import { TabsSelectorProps } from '../types'
import {
  TabsSelectorButton,
  TabsSelectorMain,
  TabsSelectorNavLink,
  TabsSelectorWrapper,
} from './selector.style'

export function TabsSelector({
  tabElementById = false,
  name,
  link,
  showIndicator = false,
  disabled = false,
  children,
}: TabsSelectorProps) {
  const [variant, linkPrefix, selectedTab, addTab, selectTab] = useTabs(
    (s) => [s.variant, s.linkPrefix, s.selectedTab, s.addTab, s.selectTab],
    shallow
  )

  const isActive = selectedTab === name

  const onClick = () => {
    if (disabled) return null

    if (tabElementById) {
      const element = document.getElementById(name)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    return selectTab(name)
  }

  useEffect(() => {
    addTab(name, disabled, showIndicator)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isEmpty(link)) {
    return (
      <TabsSelectorNavLink
        onClick={(e) => disabled && e.preventDefault()}
        variant={variant}
        to={`${linkPrefix}${link}`}
        end
      >
        {({ isActive: iaActiveNav }) => (
          <TabsSelectorWrapper
            variant={variant}
            isActive={iaActiveNav ?? isActive}
            disabled={disabled}
            onClick={onClick}
          >
            <TabsSelectorMain>
              <div className="whitespace-nowrap w-fit">{children}</div>
              {showIndicator && (
                <div>
                  <Dot
                    color={iaActiveNav ?? isActive ? 'primary' : 'disable'}
                  />
                </div>
              )}
            </TabsSelectorMain>
          </TabsSelectorWrapper>
        )}
      </TabsSelectorNavLink>
    )
  }

  return (
    <TabsSelectorButton type="button" variant={variant} disabled={disabled}>
      <TabsSelectorWrapper
        variant={variant}
        isActive={isActive}
        onClick={onClick}
        disabled={disabled}
      >
        <TabsSelectorMain>
          <div className="whitespace-nowrap w-fit">{children}</div>
          {showIndicator && (
            <div>
              <Dot color={isActive ? 'primary' : 'disable'} />
            </div>
          )}
        </TabsSelectorMain>
      </TabsSelectorWrapper>
    </TabsSelectorButton>
  )
}
