import s from './articlePage.module.css'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Image from 'next/image'
import Comments from '@/lib/components/Comments'
import type { Metadata } from 'next'

export default async function ArticlePage({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: {
    articleId: string
  }
}>) {
  const payload = await getPayload({
    config: configPromise,
  })

  const article = await payload.findByID({
    collection: 'articles',
    id: params.articleId,
  })

  const { docs: initialComments } = await payload.find({
    collection: 'comments',
    sort: 'createdAt',
    where: {
      article: {
        equals: params.articleId,
      },
    },
  })

  const image = article.teaser_image
  let url: string | null = null

  if (image && typeof image === 'object' && typeof image.url === 'string') {
    url = image.url
  }

  const date = new Date(article.updatedAt).toDateString()

  return (
    <article className="container">
      {url && (
        <Image
          className={s.image}
          src={url}
          alt={article.title}
          width={768}
          height={768}
          sizes="100vw"
        />
      )}

      <h1 className={s.title}>{article.title}</h1>

      {article.content_html && (
        <div className={s.prose} dangerouslySetInnerHTML={{ __html: article.content_html }}></div>
      )}

      <p className={s.date}>{date}</p>

      <Comments articleId={params.articleId} initialComments={initialComments} />
    </article>
  )
}

export async function generateMetadata({
  params,
}: {
  params: {
    articleId: string
  }
}): Promise<Metadata> {
  const payload = await getPayload({
    config: configPromise,
  })

  const article = await payload.findByID({
    collection: 'articles',
    id: params.articleId,
  })

  return {
    title: article.title,
  }
}
