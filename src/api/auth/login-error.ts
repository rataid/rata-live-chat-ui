import { isAxiosError } from 'axios'

export function getLoginErrorMessage(error: unknown): string {
  if (!isAxiosError(error)) {
    return 'Tidak dapat masuk. Silakan coba lagi.'
  }

  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return 'Waktu permintaan masuk habis. Silakan coba beberapa saat lagi.'
  }

  if (!error.response) {
    return 'Tidak dapat terhubung ke layanan. Periksa koneksi internet Anda dan coba lagi.'
  }

  const { status } = error.response

  if (status === 401) {
    return 'Data email, nomor telepon, atau kata sandi Anda ada yang salah. Silakan periksa dan coba lagi.'
  }

  if (status >= 500) {
    return 'Layanan masuk sedang tidak tersedia. Silakan coba beberapa saat lagi.'
  }

  if (status === 400 || status === 422) {
    return 'Periksa format email, nomor telepon, dan kata sandi Anda, lalu coba lagi.'
  }

  if (status === 403) {
    return 'Akun ini belum dapat masuk. Silakan hubungi layanan pelanggan.'
  }

  return 'Tidak dapat masuk. Silakan coba lagi atau hubungi layanan pelanggan.'
}
