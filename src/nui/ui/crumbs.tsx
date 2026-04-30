import { isArray } from 'lodash'
import { Fragment } from 'react'
import { useMatches } from 'react-router-dom'

import { key } from '@utils'

import { CrumbItem, CrumbItemSeparator, CrumbWrapper } from './crumbs.style'
import Icon from './icon'

function CrumbSeparator() {
  return (
    <CrumbItemSeparator>
      <Icon icon="lucide:chevron-right" size="xs" />
    </CrumbItemSeparator>
  )
}

export default function Crumbs() {
  const matches = useMatches()

  const crumbs = matches
    .filter((match: any) => Boolean(match.handle?.crumb))
    .map((match: any) => match.handle.crumb(match.data, match.params))

  return (
    <CrumbWrapper>
      {crumbs.map((crumb, index) => (
        <Fragment
        // key={key(index)}
        >
          {/* Don't add separator on last crumb */}
          {index > 0 && index <= crumbs.length - 1 && <CrumbSeparator />}

          {/* If crumb is Array, render each item in the array with a separator */}
          {isArray(crumb) ? (
            crumb.map((item, subIndex) => (
              <Fragment
              // key={`${key(subIndex)}-subkey`}
              >
                {subIndex > 0 && <CrumbSeparator />}
                <CrumbItem className={index === 0 ? 'active' : ''}>
                  {item}
                </CrumbItem>
              </Fragment>
            ))
          ) : (
            <CrumbItem className={index === 0 ? 'active' : ''}>
              {crumb}
            </CrumbItem>
          )}
        </Fragment>
      ))}
    </CrumbWrapper>
  )
}
