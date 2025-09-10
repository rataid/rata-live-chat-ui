import tw, { styled } from 'twin.macro'

export const AppSidebarNavWrapper = tw.div`pb-6 flex-1 flex flex-col items-center justify-between text-gray-400`

export const AppSidebarNavTop = tw.div`flex flex-col gap-y-2`

export const AppSidebarNavBottom = tw.div`flex flex-col gap-y-2`

export const AppLayoutSidebarNavButton = styled.div(
  ({ isActive = false }: { isActive?: boolean }) => [
    isActive
      ? tw`bg-primary-100 text-primary-600`
      : tw`text-gray-500 hover:(bg-primary-100 text-primary-600)`,
    tw`flex items-center justify-center w-10 h-10 gap-y-2 cursor-pointer rounded-[6px]`,
  ]
)
