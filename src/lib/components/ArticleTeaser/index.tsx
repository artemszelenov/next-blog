import s from './articleTeaser.module.css'
import Image from 'next/image'
import Button from '@/lib/components/forms/inputs/Button'
import type { Article } from '@/payload-types'

type Props = {
  article: Article
}

type Image = {
  url?: string | null
  width?: number | null
  height?: number | null
}

export default function ({ article }: Props) {
  let imageToRender: Image | null = null

  if (
    article.teaser_image &&
    typeof article.teaser_image === 'object' &&
    typeof article.teaser_image.sizes === 'object' &&
    typeof article.teaser_image.sizes.teaser === 'object'
  ) {
    imageToRender = article.teaser_image.sizes.teaser
  }

  const date = new Date(article.updatedAt).toDateString()

  return (
    <article className={s.container}>
      {imageToRender && (
        <Image
          className={s.image}
          src={imageToRender.url!}
          alt={article.title}
          width={imageToRender.width!}
          height={imageToRender.height!}
          sizes="200px"
        />
      )}

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
