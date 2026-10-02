import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

const Wrapper = styled.div.attrs({ className: tw`w-full` })``

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
