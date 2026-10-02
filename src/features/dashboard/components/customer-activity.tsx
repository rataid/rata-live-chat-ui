import { useState } from 'react'

import Dot from '@nui/ui/dot'
import Section from '@nui/ui/section'
import Typo from '@nui/ui/typo'

export default function SideCustomerActivity() {
  const [value, setValue] = useState(0)
  const hitung = 5.65 * value
  const controlPercent = 565 - hitung

  const consultation = 4.75 * value
  const consultationPercent = 475 - consultation

  const imprint = 3.65 * value
  const imprintPercent = 365 - imprint

  return (
    <Section margin="xs">
      <Typo fontWeight="bold" color="gray-900">
        CUSTOMERS ACTIVITY
      </Typo>

      <div className="flex flex-col px-2 justify-center items-center">
        <svg
          width="300"
          height="300"
          viewBox="-25 -25 250 250"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="rotate-[-90deg]"
        >
          <circle
            r="90"
            cx="100"
            cy="100"
            fill="transparent"
            className="stroke-gray-100 stroke-[12px]"
            style={{ strokeDasharray: '565.48px', strokeDashoffset: '0' }}
          />
          <circle
            r="90"
            cx="100"
            cy="100"
            className="stroke-primary-800 stroke-[12px] ease-in-out transition-all duration-300"
            style={{
              strokeDasharray: '565px',
              strokeDashoffset: `${controlPercent}`,
            }}
            strokeLinecap="round"
            fill="transparent"
          />
          <circle
            r="74"
            cx="100"
            cy="100"
            fill="transparent"
            className="stroke-gray-100 stroke-[12px]"
            style={{ strokeDasharray: '560px', strokeDashoffset: '0' }}
          />
          <circle
            r="74"
            cx="100"
            cy="100"
            className="stroke-primary-600 stroke-[12px] ease-in-out transition-all duration-300"
            strokeLinecap="round"
            fill="transparent"
            style={{
              strokeDasharray: '475px',
              strokeDashoffset: `${consultationPercent}`,
            }}
          />
          <circle
            r="58"
            cx="100"
            cy="100"
            fill="transparent"
            className="stroke-gray-100 stroke-[12px]"
            style={{ strokeDasharray: '560px', strokeDashoffset: '0' }}
          />
          <circle
            r="58"
            cx="100"
            cy="100"
            className="stroke-primary-400 stroke-[12px] ease-in-out transition-all duration-300"
            strokeLinecap="round"
            fill="transparent"
            style={{
              strokeDasharray: '365px',
              strokeDashoffset: `${imprintPercent}`,
            }}
          />
          <text
            x="71px"
            y="115px"
            className="text-gray-900 text-3xl font-semibold"
            style={{ transform: 'rotate(90deg) translate(-4px, -203px)' }}
          >
            102k
          </text>
        </svg>
        <div className="flex gap-x-4 -mt-5">
          <div className="flex items-center gap-x-1">
            <Dot />
            <Typo color="gray-500" size="xs">
              Control
            </Typo>
          </div>
          <div className="flex items-center gap-x-1">
            <Dot />
            <Typo color="gray-500" size="xs">
              Imprint
            </Typo>
          </div>
          <div className="flex items-center gap-x-1">
            <Dot />
            <Typo color="gray-500" size="xs">
              Consultation
            </Typo>
          </div>
        </div>
      </div>
    </Section>
  )
}
