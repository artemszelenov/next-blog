'use server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function createComment(prevState: any, formData: FormData) {
  let text = formData.get('text')?.toString()?.trim()
  const articleId = formData.get('article_id')

  if (!text || !articleId) {
    return { newComment: null, success: false }
  }

  const payload = await getPayload({ config: configPromise })

  const newComment = await payload.create({
    collection: 'comments',
    data: {
      text,
      article: Number(articleId),
    },
  })

  return { newComment, success: true }
}
