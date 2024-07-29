'use client'
import s from './loadMore.module.css'
import { useActionState, useEffect, useState } from 'react'
import { loadMore } from './actions'
import { Submit } from '@/lib/components/forms/inputs'
import ArticleTeaser from '@/lib/components/ArticleTeaser'
import type { Article } from '@/payload-types'

type Props = {
  initialPagination: {
    page?: number
    limit: number
    hasNextPage: boolean
  }
}

export default function ({ initialPagination }: Props) {
  const [articles, setArticles] = useState<Article[]>([])
  const [pagination, setPagination] = useState(initialPagination)
  const [formState, formAction] = useActionState(loadMore, {
    newArticles: [],
  })

  useEffect(() => {
    if (formState.newArticles.length > 0) {
      setArticles([...articles, ...formState.newArticles])
    }

    if (formState.pagination) {
      setPagination(formState.pagination)
    }
  }, [formState])

  return (
    <>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleTeaser article={article} />
        </li>
      ))}

      {pagination.hasNextPage && pagination.page && (
        <form action={formAction}>
          <input type="hidden" name="next_page" value={pagination.page + 1} />
          <input type="hidden" name="limit" value={pagination.limit} />

          <Submit appearance="secondary" additionalClasses={[s.button]}>
            Load more
          </Submit>
        </form>
      )}
    </>
  )
}
