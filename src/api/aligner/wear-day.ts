const DAY_MS = 24 * 60 * 60 * 1000
const WIB_OFFSET_MS = 7 * 60 * 60 * 1000

export function wearDay(now = Date.now()) {
  return new Date(now + WIB_OFFSET_MS).toISOString().slice(0, 10)
}

export function msUntilNextWearDay(now = Date.now()) {
  return DAY_MS - ((now + WIB_OFFSET_MS) % DAY_MS)
}
