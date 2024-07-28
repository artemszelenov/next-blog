'use client'
import s from './commentForm.module.css'
import { useActionState, useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { createComment } from './actions'
import { Submit } from '@/lib/components/forms/inputs'
import type { Comment } from '@/payload-types'

type Props = {
  articleId: string
  initialComments: Comment[]
}

export default function ({ articleId, initialComments }: Props) {
  const [comments, setComments] = useState(initialComments)
  const [formState, formAction] = useActionState(createComment, {
    newComment: null,
    success: false,
  })

  useEffect(() => {
    if (formState.newComment) {
      setComments([...comments, formState.newComment])
    }
  }, [formState])

  return (
    <>
      <hr className={s.hr} />

      <h2 className={s.commentsTitle}>Comments</h2>

      {comments.length > 0 && (
        <ul className={s.comments}>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p className={s.comment}>{comment.text}</p>
            </li>
          ))}
        </ul>
      )}

      <form action={formAction} className={s.form}>
        <input type="hidden" name="article_id" value={articleId} />

        <TextareaAutosize className={s.input} name="text" placeholder="Your comment" />

        <Submit className={s.submit}>Send</Submit>
      </form>
    </>
  )
}
