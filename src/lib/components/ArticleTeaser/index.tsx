import s from './articleTeaser.module.css'
import Image from 'next/image'
import Button from '@/lib/components/forms/inputs/Button'
import type { Article } from '@/payload-types'

type Props = {
  article: Article
}

export default function ({ article }: Props) {
  const image = article.teaser_image
  let url: string | null = null

  if (image && typeof image === 'object' && typeof image.url === 'string') {
    url = image.url
  }

  const date = new Date(article.updatedAt).toDateString()

  return (
    <article className={s.container}>
      {url && <Image className={s.image} src={url} alt={article.title} width={200} height={200} />}

      <div className={s.body}>
        <div>
          <p className={s.date}>{date}</p>

          {/* according to html spec I can use h1 inside article tag */}
          <h1 className={s.title}>{article.title}</h1>

          <p className={s.description}>{article.description}</p>
        </div>

        <Button
          appearance="link-accent"
          href={`/articles/${article.id}`}
          additionalClasses={[s.linkButton]}
        >
          Read
        </Button>
      </div>
    </article>
  )
}
