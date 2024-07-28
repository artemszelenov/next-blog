'use server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function loadMore(prevState: any, formData: FormData) {
  const nextPage = formData.get('next_page')

  if (!nextPage) return { newArticles: [] }

  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'articles',
    limit: 2,
    page: Number(nextPage),
  })

  console.log('dddd', docs)

  return { newArticles: docs }
}
