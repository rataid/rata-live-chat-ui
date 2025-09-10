import tw from 'twin.macro'

const Wrapper = tw.div`w-full`

export default function WidgetActiveMember() {
  return (
    <Wrapper>
      <img
        src="/img/nui/widgets/active-member.png"
        alt="widget - active member"
      />
    </Wrapper>
  )
}
