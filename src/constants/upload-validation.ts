export const MAX_SIZE = {
  IMAGE: 5 * 1024 * 1024,
  FILE: 10 * 1024 * 1024,
}

export const ALLOWED_MIME: Record<'IMAGE' | 'FILE', string[]> = {
  IMAGE: ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'],
  FILE: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
}
