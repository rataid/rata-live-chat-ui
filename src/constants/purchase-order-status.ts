import { slugify, snakeCase } from '@utils/common'

export const purchaseOrderStatusOptions = [
  { label: 'Manager Approval', value: snakeCase('WF APPROVAL') },
  { label: 'Sent', value: snakeCase('Sent') },
  { label: 'On Delivery', value: snakeCase('On Delivery') },
  { label: 'Done', value: snakeCase('Done') },
  { label: 'Rejected', value: snakeCase('Rejected') },
]
