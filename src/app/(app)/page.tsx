import s from './homePage.module.css'
import ArticleTeaser from '@/lib/components/ArticleTeaser'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import LoadMore from '@/lib/components/LoadMore'

const LIMIT = 2

export default async function HomePage({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const payload = await getPayload({
    config: configPromise,
  })

  const {
    docs: initialArticles,
    page,
    hasNextPage,
  } = await payload.find({
    collection: 'articles',
    limit: LIMIT,
  })

  if (initialArticles.length === 0) {
    return (
      <section className="container">
        <p>No articles is found</p>
      </section>
    )
  }

  return (
    <section className="container">
      <ul className={s.list}>
        {/* {initialArticles.map((doc) => (
          <li key={doc.id}>
            <ArticleTeaser article={doc} />
          </li>
        ))} */}

        <LoadMore
          initialArticles={initialArticles}
          pagination={{
            page,
            hasNextPage,
          }}
        />
      </ul>
    </section>
  )
}
