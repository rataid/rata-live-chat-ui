import { TourStep } from '@/components/tour'
import { PORTAL_NAME } from '@/constants'

export const HOME_TOUR_ID = 'home'

export const HOME_TOUR_INTRO = {
  title: `Selamat Datang di ${PORTAL_NAME} 👋🏻`,
  description: `Semua yang Anda butuhkan ada di sini. Mari kita lihat fitur apa saja yang ada di ${PORTAL_NAME}.`,
}

export const HOME_TOUR_STEPS: TourStep[] = [
  {
    element: '[data-tour="brand-tabs"]',
    popover: {
      title: 'Choose your treatment',
      description:
        'Switch between RATA Aligner, TANAM Implant and VINIR Veneer. Each has its own guides.',
      side: 'bottom',
      align: 'center',
    },
  },
  {
    element: '[data-tour="aligner-tracker"]',
    popover: {
      title: 'Pantau Progres Aligner',
      description:
        'Pantau tahapan perawatan aligner gigi Anda, jumlah hari yang tersisa, dan ketahui perkembangan perawatan Anda',
      side: 'right',
      align: 'start',
    },
  },
  {
    element: '[data-tour="removal-tracker"]',
    popover: {
      title: 'Pemantauan Waktu Lepas Aligner',
      description:
        'Mulai timer setiap kali Anda melepas aligner. Pastikan total waktu tanpa aligner tidak lebih dari 2 jam sehari.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '[data-tour="faq-title"]',
    popover: {
      title: 'Pertanyaan yang sering diajukan (FAQ)',
      description:
        'Pertanyaan yang paling sering diajukan, dijawab langsung oleh Tim Klinik kami.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '[data-tour="faq-groups"]',
    popover: {
      title: 'Cari Topik Pilihanmu',
      description:
        'Jelajahi semua jawaban berdasarkan topik, mulai dari perawatan sehari-hari hingga pengiriman.',
      side: 'bottom',
      align: 'start',
    },
  },
  {
    element: '[data-tour="chat-with-us"]',
    popover: {
      title: 'Hubungi kami',
      description:
        'Masih memiliki pertanyaan? Anda dapat langsung menghubungi tim klinik melalui fitur chat dari halaman mana pun.',
      side: 'top',
      align: 'end',
    },
  },
]
