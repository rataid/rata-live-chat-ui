import { Dispatch, SetStateAction } from 'react'

import { pathVariants } from './button.style'

type MenuMobileButtonProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function MenuMobileButton({
  open,
  setOpen,
}: MenuMobileButtonProps) {
  return (
    <button
      type="button"
      className="hover:bg-gray-100 p-2 rounded-lg text-gray-500"
      onClick={() => setOpen((e) => !e)}
    >
      <svg width="16" height="16" viewBox="0 0 20 20">
        <path
          fill="transparent"
          strokeWidth="2"
          stroke="currentColor"
          strokeLinecap="round"
          className="ease-in-out duration-200"
          d={open ? pathVariants.top.open : pathVariants.top.closed}
        />
        <path
          fill="transparent"
          strokeWidth="2"
          stroke="currentColor"
          strokeLinecap="round"
          d="M 2 9.423 L 16 9.423"
          className="ease-in-out duration-200"
          opacity={open ? pathVariants.middle.open : pathVariants.middle.closed}
        />
        <path
          fill="transparent"
          strokeWidth="2"
          stroke="currentColor"
          strokeLinecap="round"
          className="ease-in-out duration-200"
          d={open ? pathVariants.bottom.open : pathVariants.bottom.closed}
        />
      </svg>
    </button>
  )
}
