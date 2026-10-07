import { ChatMessage } from './types'

const CLINIC_NAME = 'Klinik TANAM Pakubuwono'

const at = (hour: number, minute: number) => {
  const date = new Date()
  date.setHours(hour, minute, 0, 0)
  return date.toISOString()
}

export const DUMMY_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    direction: 'incoming',
    senderName: CLINIC_NAME,
    body: 'Halo! Selamat datang di Live Chat. 👋\nSaya Ratih, asisten virtual untuk kebutuhan perawatan gigi Anda.',
    createdAt: at(14, 20),
  },
  {
    id: '2',
    direction: 'incoming',
    senderName: CLINIC_NAME,
    body: 'Saya dapat membantu informasi seputar Aligner (RATA), Implant (TANAM), Veneer (VINIR), jadwal konsultasi, dan biaya perawatan. Silakan pilih topik atau ketik pertanyaan Anda:',
    createdAt: at(14, 20),
    quickReplies: [
      { label: 'Aligner (RATA)', value: 'aligner' },
      { label: 'Implant (TANAM)', value: 'implant' },
      { label: 'Veneer (VINIR)', value: 'veneer' },
    ],
  },
  {
    id: '3',
    direction: 'outgoing',
    body: 'Implant (TANAM)',
    createdAt: at(14, 20),
    status: 'read',
  },
  {
    id: '4',
    direction: 'incoming',
    senderName: CLINIC_NAME,
    body: 'TANAM implant gigi adalah pengganti akar gigi yang ditanam pada tulang rahang untuk menopang mahkota gigi.',
    createdAt: at(14, 20),
  },
  {
    id: '5',
    direction: 'incoming',
    senderName: CLINIC_NAME,
    body: 'Selanjutnya ada yang bisa saya bantu lagi?',
    createdAt: at(14, 20),
    quickReplies: [
      { label: 'Online Reservation', value: 'reservation' },
      { label: 'Back to Menu', value: 'menu' },
    ],
  },
]
