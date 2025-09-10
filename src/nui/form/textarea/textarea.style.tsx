import tw, { css, styled } from 'twin.macro'

export const TextareaWrapper = tw.div`w-full flex flex-col gap-[6px]`

type TextareaMainProps = {
  isDanger?: boolean
}

// export const TextareaMain = styled.div(({ isDanger }: TextareaMainProps) => {
//   const destructive = [
//     !isDanger
//       ? tw`rounded-border focus:( outline-none text-gray-900 border-primary-400 )`
//       : tw`rounded-border border-danger-200 focus:( outline-none border-danger-400 )`,
//   ]
//   return [
//     destructive,
//     tw`relative pt-2 px-3 w-full text-sm bg-white border rounded-lg`,
//   ]
// })

export const TextareaMain = styled.div(({ isDanger }: TextareaMainProps) => {
  const destructive = [
    !isDanger
      ? tw`rounded-border focus:( outline-none text-gray-900 border-primary-400 )`
      : tw`rounded-border border-danger-200 focus:( outline-none border-danger-400 )`,
  ]

  return [
    css`
      > textarea {
        ${destructive}
        ${tw`relative py-2 px-3 w-full text-sm bg-white border rounded-lg disabled:bg-gray-50`}
      }
    `,
  ]
})
