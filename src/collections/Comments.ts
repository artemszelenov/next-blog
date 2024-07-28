import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/fields'

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    useAsTitle: 'text',
    hidden: () => false,
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
    },
    {
      label: 'Reply to',
      name: 'reply_to',
      type: 'relationship',
      relationTo: 'comments',
    },
    {
      name: 'article',
      type: 'relationship',
      relationTo: 'articles',
      required: true,
    },
  ],
}
