import { LogoSmiledental } from '@/assets'
import { PORTAL_NAME } from '@/constants'
import Button from '@nui/ui/button'

import {
  AuthBrandSubtitle,
  AuthBrandTitle,
} from '@features/auth/components/auth.style'

import {
  NotFoundAction,
  NotFoundCard,
  NotFoundContainer,
  NotFoundLogo,
  NotFoundText,
  NotFoundTitle,
  NotFoundWrapper,
} from './not-found.style'

// Any URL that matches no route
export function NotFoundPage() {
  return (
    <NotFoundWrapper>
      <NotFoundContainer>
        <NotFoundLogo>
          <div className="w-1/2">
            <LogoSmiledental />
          </div>
        </NotFoundLogo>
        <AuthBrandTitle>{PORTAL_NAME}</AuthBrandTitle>
        <AuthBrandSubtitle>
          Selamat datang di {PORTAL_NAME} untuk <br /> memenuhi kebutuhan
          perawatan gigi Anda.
        </AuthBrandSubtitle>
        <NotFoundCard>
          <NotFoundTitle>Halaman Tidak Ditemukan</NotFoundTitle>
          <NotFoundText>
            Kami tidak bisa menemukan halaman yang Anda cari. Sepertinya tautan
            tidak benar atau telah kedaluwarsa.
          </NotFoundText>
          <NotFoundAction>
            <Button to="/" fontWeight="medium" wider="full">
              Kembali ke Beranda
            </Button>
          </NotFoundAction>
        </NotFoundCard>
      </NotFoundContainer>
    </NotFoundWrapper>
  )
}
