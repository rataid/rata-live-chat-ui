import Box from '@nui/ui/box'
import Button from '@nui/ui/button'
import Image from '@nui/ui/image'
import Section from '@nui/ui/section'
import Typo from '@nui/ui/typo'

export default function SideLatestProducts() {
  return (
    <Section
      spacing="sm"
      caption={
        <Typo fontWeight="bold" color="gray-900">
          LATEST PRODUCTS
        </Typo>
      }
    >
      <Box flow="column" padding="none">
        <div className="p-4 border-b last:border-none border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-x-4">
            <Image src="" alt="" width="48px" height="48px" />
            <div>
              <Typo fontWeight="semibold" color="gray-900">
                Product Name
              </Typo>
              <Typo size="xs" color="gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi
                incidunt.
              </Typo>
            </div>
          </div>
          <Button noPadding variant="linkGray" icon="lucide-more-vertical" />
        </div>
      </Box>
    </Section>
  )
}
