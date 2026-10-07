import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

const Wrapper = styled.div.attrs({ className: tw`w-full` })``

export default function WidgetMember() {
  return (
    <Wrapper>
      <img src="/img/nui/widgets/member.png" alt="widget - member" />
    </Wrapper>
  )
}
