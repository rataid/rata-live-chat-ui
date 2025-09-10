import Section from '@nui/ui/section'
import WidgetHints from '@nui/widgets/widget-hints'

export default function RoleSide() {
  return (
    <Section>
      <WidgetHints title="Guidelines">
        <p>
          Ensure that the data entered is accurate and reliable, especially if
          the data will be used for critical purposes such as finance or
          security.
        </p>
      </WidgetHints>
    </Section>
  )
}
