import { Link } from 'react-router-dom'

import Avatar from '@nui/ui/avatar'
import Stack from '@nui/ui/stack'
import StopPropagate from '@nui/ui/stop-propagate'
import Tooltip from '@nui/ui/tooltip'
import { prettyPhone } from '@utils'

import {
  CardContacContact,
  CardContactContent,
  CardContactMain,
  CardContactName,
  CardContactNameLink,
  CardContactWrapper,
} from './contact.style'
import { CardContactProps } from './types'

export function CardContact({
  name,
  phone,
  avatarSrc,
  avatarSize = '4xl',
  placeholder,
  caption,
  to,
}: CardContactProps) {
  const Name = to ? (
    <StopPropagate>
      <Link to={to}>
        <CardContactNameLink>{name}</CardContactNameLink>
      </Link>
    </StopPropagate>
  ) : (
    <CardContactName>{name}</CardContactName>
  )

  return (
    <CardContactWrapper padding="lg" flow="column">
      {caption}
      <CardContactMain>
        <Avatar src={avatarSrc} size={avatarSize} placeholder={placeholder} />
        <Stack flow="column" spacing="4px" align="center">
          <Tooltip content={name}>
            <CardContactContent>{Name} </CardContactContent>
          </Tooltip>

          <CardContacContact>{prettyPhone(phone)}</CardContacContact>
        </Stack>
      </CardContactMain>
    </CardContactWrapper>
  )
}
