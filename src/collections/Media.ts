import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    imageSizes: [
      {
        name: 'teaser',
        width: 200,
        height: 200,
      },
      {
        name: 'full',
        width: 1000,
        height: undefined,
      },
    ],
  },
}
