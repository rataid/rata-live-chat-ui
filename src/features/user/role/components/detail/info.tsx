import Field, { Fields } from '@nui/ui/field'
import Typo from '@nui/ui/typo'

type RoleDetailInfoProps = {
  title?: string
  abbr?: string
}

export default function RoleDetailInfo({ title, abbr }: RoleDetailInfoProps) {
  return (
    <div tw="pb-6 mb-6 border-b border-gray-200">
      <Fields inline>
        <Field
          inline
          label={
            <Typo color="gray-900" fontWeight="semibold">
              Name
            </Typo>
          }
        >
          {title}
        </Field>
        <Field
          inline
          label={
            <Typo color="gray-900" fontWeight="semibold">
              Abbr.
            </Typo>
          }
        >
          {abbr}
        </Field>
      </Fields>
    </div>
  )
}
