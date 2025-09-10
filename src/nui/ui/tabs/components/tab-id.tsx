import tw, { css, styled } from 'twin.macro'

type TabsIdProps = {
  marginTop?: string
}

export const TabsId = styled.div<TabsIdProps>(({ marginTop }) => [
  css`
    margin-top: ${marginTop};
  `,
  tw`absolute`,
])
