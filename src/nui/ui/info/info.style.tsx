import tw, { styled } from 'twin.macro'

type InfoWrapperProps = {
  noBorder?: boolean
  hideTitle?: boolean
  borderColor?: 'primary' | 'gray' | 'danger' | 'warning' | 'success'
  borderVariant?: 'dashed' | 'solid'
}

const borderColorMap = {
  primary: tw`border-primary-200`,
  gray: tw`border-gray-200`,
  danger: tw`border-danger-200`,
  warning: tw`border-warning-200`,
  success: tw`border-success-200`,
}

const borderVariantMap = {
  dashed: tw`border-dashed`,
  solid: tw`border-solid`,
}

export const InfoWrapper = styled.div<InfoWrapperProps>(
  ({ noBorder, hideTitle, borderColor, borderVariant }) => [
    !noBorder && borderColorMap[borderColor || 'gray'],
    !noBorder && borderVariant && borderVariantMap[borderVariant],
    !noBorder && tw`border p-3 rounded-lg`,
    hideTitle ? tw`flex items-center gap-2` : tw`flex items-start gap-2 `,
  ]
)

export const InfoMain = tw.div`text-start text-xs text-gray-700`

export const InfoTitle = tw.div`text-gray-900 font-semibold`

export const InfoDescription = tw.div`mt-1`
