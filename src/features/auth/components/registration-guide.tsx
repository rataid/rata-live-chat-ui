import { useState } from 'react'

import { PORTAL_NAME } from '@/constants/portal'
import Icon from '@nui/ui/icon'

import {
  AuthGuide,
  AuthGuideBody,
  AuthGuideCaption,
  AuthGuideCollapse,
  AuthGuideCollapseInner,
  AuthGuideEmailSubject,
  AuthGuideFields,
  AuthGuideIcon,
  AuthGuideStep,
  AuthGuideStepNumber,
  AuthGuideStepText,
  AuthGuideStepTitle,
  AuthGuideSteps,
  AuthGuideTitle,
  AuthGuideToggle,
} from './auth.style'

const GUIDE_ID = 'registration-guide'

const accountFields = [
  'Nama lengkap',
  'Kata sandi',
  'Nomor handphone',
  'Konfirmasi kata sandi',
  'Alamat email',
]

// Shown under every auth page (auth layout)
export function RegistrationGuide() {
  const [open, setOpen] = useState(false)

  return (
    <AuthGuide>
      <AuthGuideToggle
        type="button"
        aria-expanded={open}
        aria-controls={GUIDE_ID}
        onClick={() => setOpen((value) => !value)}
      >
        <AuthGuideIcon>
          <Icon icon="lucide-circle-help" size="xs" />
        </AuthGuideIcon>
        <span className="min-w-0 flex-1">
          <AuthGuideTitle>Panduan Registrasi &amp; Aktivasi</AuthGuideTitle>
          <AuthGuideCaption>
            Belum punya akun? Lihat langkah aktivasi.
          </AuthGuideCaption>
        </span>
        <Icon
          icon="lucide-chevron-down"
          size="xs"
          className={[
            'shrink-0 text-primary-600 transition-transform duration-300',
            open ? 'rotate-180' : '',
          ].join(' ')}
        />
      </AuthGuideToggle>

      <AuthGuideCollapse id={GUIDE_ID} $open={open} aria-hidden={!open}>
        <AuthGuideCollapseInner>
          <AuthGuideBody>
            <p>Ikuti langkah membuat dan aktifkan akun {PORTAL_NAME}.</p>
            <AuthGuideSteps>
              <AuthGuideStep>
                <AuthGuideStepNumber>1</AuthGuideStepNumber>
                <div className="min-w-0 flex-1">
                  <AuthGuideStepTitle>Lengkapi Data Akun</AuthGuideStepTitle>
                  <AuthGuideStepText>
                    <p>Isi data berikut:</p>
                    <AuthGuideFields>
                      {accountFields.map((field) => (
                        <li key={field}>- {field}</li>
                      ))}
                    </AuthGuideFields>
                    <p>Pastikan data sudah benar, lalu lanjutkan registrasi.</p>
                  </AuthGuideStepText>
                </div>
              </AuthGuideStep>

              <AuthGuideStep>
                <AuthGuideStepNumber>2</AuthGuideStepNumber>
                <div className="min-w-0 flex-1">
                  <AuthGuideStepTitle>
                    Verifikasi Nomor Handphone
                  </AuthGuideStepTitle>
                  <AuthGuideStepText>
                    <p>
                      Kode OTP dikirim ke nomor handphone terdaftar lewat
                      WhatsApp.
                    </p>
                    <p>
                      Masukkan kode OTP di kolom verifikasi portal untuk
                      melanjutkan registrasi.
                    </p>
                  </AuthGuideStepText>
                </div>
              </AuthGuideStep>

              <AuthGuideStep>
                <AuthGuideStepNumber>3</AuthGuideStepNumber>
                <div className="min-w-0 flex-1">
                  <AuthGuideStepTitle>
                    Verifikasi Alamat Email
                  </AuthGuideStepTitle>
                  <AuthGuideStepText>
                    <p>
                      Setelah verifikasi OTP, buka inbox email terdaftar. Cari
                      email dengan subjek, buka, dan klik tautan aktivasi.
                    </p>
                    <AuthGuideEmailSubject>
                      <Icon
                        icon="lucide-mail"
                        size="xs"
                        className="shrink-0 text-primary-600"
                      />
                      <div className="min-w-0">
                        <div className="text-xs text-gray-500">
                          Subjek email
                        </div>
                        <div className="font-semibold text-gray-900">
                          Aktivasi Akun {PORTAL_NAME}
                        </div>
                      </div>
                    </AuthGuideEmailSubject>
                  </AuthGuideStepText>
                </div>
              </AuthGuideStep>
            </AuthGuideSteps>
          </AuthGuideBody>
        </AuthGuideCollapseInner>
      </AuthGuideCollapse>
    </AuthGuide>
  )
}
