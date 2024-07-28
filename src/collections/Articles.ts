import { lexicalHTML, lexicalEditor, HTMLConverterFeature } from '@payloadcms/richtext-lexical'
import { isAdminOrEditor } from '../access/fields'
import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Teaser',
          fields: [
            {
              label: 'Image',
              name: 'teaser_image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              label: 'Title',
              name: 'title',
              type: 'text',
              required: true,
              maxLength: 100,
            },
            {
              label: 'Description',
              name: 'description',
              type: 'textarea',
              maxLength: 300,
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
              }),
            },
            lexicalHTML('content', { name: 'content_html' }),
          ],
        },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
      },
      filterOptions: () => {
        return {
          role: { equals: 'editor' },
        }
      },
    },
  ],
}
