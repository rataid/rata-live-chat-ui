import {
  Content,
  Image,
  ImageStyle,
  Main,
  Title,
  Wrapper,
} from './widget-hints.style'

export type WidgetHintsProps = {
  title: React.ReactNode
} & React.PropsWithChildren

export default function WidgetHints({ title, children }: WidgetHintsProps) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>
        <Image>
          <img
            css={ImageStyle}
            src="https://i.ibb.co/Vx0DRGK/cobas.png"
            alt="smiledental"
          />
        </Image>
        <Main>{children}</Main>
      </Content>
    </Wrapper>
  )
}
