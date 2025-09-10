import tw, { styled } from 'twin.macro'

// todo single
export const DualToneColumSingle = tw.div`flex items-center gap-x-4 w-full rounded-lg overflow-hidden`

export const DualToneColumWrapper = tw.div`w-full grid sm:grid-cols-2 place-items-start gap-8 rounded-lg`

type DualToneColumMainProps = {
  fit?: boolean
  noBackground?: boolean
}

export const DualToneColumMain = styled.div<DualToneColumMainProps>(
  ({ fit, noBackground }) => [
    noBackground ? tw`h-full` : tw`bg-gray-50 p-4`,
    fit ? tw`w-fit place-self-end` : tw`w-full`,
    tw`flex flex-col gap-6 rounded-lg`,
  ]
)
