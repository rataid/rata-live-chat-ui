import { useResponsive } from 'ahooks'
import { Controller } from 'react-hook-form'

import useFormHelper from '@nui/hooks/use-form-helper'
import Section from '@nui/ui/section'
import WidgetHints from '@nui/widgets/widget-hints'
import WidgetUserPicture from '@nui/widgets/widget-user-picture'

import { User } from '@gql/graphql'
import { meQuery, profileSchema } from '@models/user/user'

export default function ProfileSide() {
  const { xl } = useResponsive()

  const { data, formContext } = useFormHelper<User>({
    args: {},
    query: meQuery,
    schema: profileSchema,
  })

  const { control } = formContext

  if (!xl) return null

  return (
    <>
      <Section>
        <Controller
          name="avatarAssetId"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <WidgetUserPicture resourceKey="user|avatar_asset_id" {...field} />
          )}
        />
      </Section>
      <Section>
        <WidgetHints title="Guidelines">
          <p>
            Ensure that the data entered is accurate and reliable, especially if
            the data will be used for critical purposes such as finance or
            security.
          </p>
        </WidgetHints>
      </Section>
    </>
  )
}
