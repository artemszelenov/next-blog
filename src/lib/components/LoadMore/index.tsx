'use client'
import { useActionState, useEffect, useState } from 'react'
import { loadMore } from './actions'
import { Submit } from '@/lib/components/forms/inputs'
import ArticleTeaser from '@/lib/components/ArticleTeaser'
import type { Article } from '@/payload-types'

type Props = {
  initialArticles: Article[]
  pagination: {
    page: number
    hasNextPage: boolean
  }
}

export default function ({ initialArticles, pagination }: Props) {
  const [articles, setArticles] = useState(initialArticles)
  const [formState, formAction] = useActionState(loadMore, {
    newArticles: [],
  })

  useEffect(() => {
    if (formState.newArticles.length > 0) {
      setArticles([...articles, ...formState.newArticles])
    }
  }, [formState])

  return (
    <>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleTeaser article={article} />
        </li>
      ))}

      <form action={formAction}>
        {pagination.hasNextPage && (
          <input type="hidden" name="next_page" value={pagination.page! + 1} />
        )}

        <Submit>Load more</Submit>
      </form>
    </>
  )
}
