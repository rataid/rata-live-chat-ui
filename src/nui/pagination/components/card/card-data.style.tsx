import tw, { styled } from 'twin.macro'

type CardDataItemProps = {
  isSelected: boolean
}

export const CardDataItem = styled.div<CardDataItemProps>(({ isSelected }) => {
  return [isSelected && tw`bg-gray-50 bg-opacity-50`]
})

export const CardDataEmpty = tw.div`border border-gray-200 py-10 text-xs text-center rounded-lg`
