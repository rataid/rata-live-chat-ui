// Same values as the backend (and crboard's constants/message.ts)

export enum MessageType {
  TEXT = 1,
  IMAGE = 2,
  VIDEO = 3,
  AUDIO = 4,
  DOCUMENT = 5,
  LOCATION = 6,
  CONTACT = 7,
  STICKER = 8,
  REACTION = 9,
  TEMPLATE = 10,
  BUTTON = 11,
  NOTES = 23,
  EVENT = 21,
  SYSTEM = 22,
  UNKNOWN = 99,
}

// INCOMING = from the customer,
// OUTGOING = from the clinic (agent)
export enum MessageDirection {
  INCOMING = 1,
  OUTGOING = 2,
}

export enum MessageStatus {
  PENDING = 1,
  SENT = 2,
  DELIVERED = 3,
  READ = 4,
  DELETED = 5,
  FAILED = 6,
}
