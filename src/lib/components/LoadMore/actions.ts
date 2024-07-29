'use server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function loadMore(prevState: any, formData: FormData) {
  const nextPage = formData.get('next_page')
  const limit = Number(formData.get('limit'))

  if (!nextPage || !limit) return { newArticles: [] }

  const payload = await getPayload({ config: configPromise })

  const { docs, page, hasNextPage } = await payload.find({
    collection: 'articles',
    page: Number(nextPage),
    limit,
  })

  return { newArticles: docs, pagination: { page, hasNextPage, limit } }
}
