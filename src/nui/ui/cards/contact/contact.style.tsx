import tw from 'twin.macro'

import Box from '@nui/ui/box'

export const CardContactWrapper = tw(Box)`relative h-full`

export const CardContactMain = tw.button`w-full flex flex-col items-center gap-y-4 text-sm`

export const CardContactContent = tw.div`line-clamp-1 w-full`

export const CardContactName = tw.div`text-base font-semibold text-gray-900`

export const CardContactNameLink = tw(CardContactName)` hover:text-primary-700`

export const CardContacContact = tw.div`text-gray-700`
