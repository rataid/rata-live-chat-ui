import { NavLink } from 'react-router-dom'

import { BRANDS, BRAND_INFO, Brand } from '@/constants/brand'
import { tw } from '@nui/utils/tw'

import { BrandTabs } from './home.style'

// Active tab takes the brand's own color
const activeStyles: Record<Brand, { tab: string; caption: string }> = {
  rata: {
    tab: tw`border-[#BE0D1E] bg-[#BE0D1E]/5`,
    caption: tw`text-[#BE0D1E]`,
  },
  tanam: {
    tab: tw`border-teal-500 bg-teal-50`,
    caption: tw`text-teal-700`,
  },
  vinir: {
    tab: tw`border-blue-500 bg-blue-50`,
    caption: tw`text-blue-700`,
  },
}

export function HomeBrandTabs() {
  return (
    <BrandTabs aria-label="Products" data-tour="brand-tabs">
      {BRANDS.map((brand) => {
        const { label, logo } = BRAND_INFO[brand]

        return (
          <NavLink
            key={brand}
            to={`/home/${brand}`}
            className={({ isActive }) =>
              [
                tw`flex flex-col items-center justify-center gap-1.5 rounded-lg border px-2 py-4 text-center transition-colors`,
                isActive
                  ? activeStyles[brand].tab
                  : tw`border-gray-200 bg-white hover:bg-gray-50`,
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={logo}
                  alt={label}
                  className={[
                    tw`h-6 w-auto transition-opacity duration-200 sm:h-10`,
                    isActive ? tw`opacity-100` : tw`opacity-75`,
                  ].join(' ')}
                />
              </>
            )}
          </NavLink>
        )
      })}
    </BrandTabs>
  )
}
