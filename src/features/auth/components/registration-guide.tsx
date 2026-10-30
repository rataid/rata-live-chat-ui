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

type GuideStep = {
  title: string
  descriptions: string[]
  fields?: string[]
  note?: string
  emailSubject?: string
}

const GUIDE_STEPS: GuideStep[] = [
  {
    title: 'Lengkapi Data Akun',
    descriptions: ['Isi data berikut:'],
    fields: [
      'Nama lengkap',
      'Kata sandi',
      'Nomor handphone',
      'Konfirmasi kata sandi',
      'Alamat email',
    ],
    note: 'Pastikan data sudah benar, lalu lanjutkan registrasi.',
  },
  {
    title: 'Verifikasi Alamat Email',
    descriptions: [
      'Silakan mengecek inbox email yang telah didaftarkan.',
      'Cari dan buka email dengan subjek “Aktivasi Akun Smile Hub Anda”, lalu klik tautan aktivasi yang tersedia.',
      'Setelah verifikasi email berhasil, Anda akan diarahkan kembali ke halaman Smile Hub.',
    ],
    emailSubject: `Aktivasi Akun ${PORTAL_NAME} Anda`,
  },
  {
    title: 'Verifikasi Nomor Handphone',
    descriptions: [
      'Kode OTP akan dikirimkan melalui WhatsApp ke nomor handphone yang telah didaftarkan.',
      'Masukkan kode OTP tersebut pada kolom verifikasi untuk menyelesaikan proses registrasi.',
    ],
  },
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
            Ikuti langkah berikut untuk mengaktifkan akun Smile Hub Anda.
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
            <p>
              Ikuti langkah berikut untuk mengaktifkan akun {PORTAL_NAME} Anda.
            </p>
            <AuthGuideSteps>
              {GUIDE_STEPS.map((step, index) => (
                <AuthGuideStep key={step.title}>
                  <AuthGuideStepNumber>{index + 1}</AuthGuideStepNumber>
                  <div className="min-w-0 flex-1">
                    <AuthGuideStepTitle>{step.title}</AuthGuideStepTitle>
                    <AuthGuideStepText>
                      {step.descriptions.map((text) => (
                        <p key={text}>{text}</p>
                      ))}
                      {step.fields && (
                        <AuthGuideFields>
                          {step.fields.map((field) => (
                            <li key={field}>- {field}</li>
                          ))}
                        </AuthGuideFields>
                      )}
                      {step.note && <p>{step.note}</p>}
                      {step.emailSubject && (
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
                              {step.emailSubject}
                            </div>
                          </div>
                        </AuthGuideEmailSubject>
                      )}
                    </AuthGuideStepText>
                  </div>
                </AuthGuideStep>
              ))}
            </AuthGuideSteps>
            <p>
              Setelah semua proses verifikasi berhasil, akun Anda siap digunakan
              untuk mengakses {PORTAL_NAME}.
            </p>
          </AuthGuideBody>
        </AuthGuideCollapseInner>
      </AuthGuideCollapse>
    </AuthGuide>
  )
}
