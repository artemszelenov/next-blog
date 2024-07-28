import s from './button.module.css'
import Link from 'next/link'
import cn from 'classnames'

type Props =
  | {
      children: string
      appearance: 'accent'
      additionalClasses?: string[]
      [key: string]: any
    }
  | {
      children: string
      appearance: 'link-accent'
      href: string
      additionalClasses?: string[]
      [key: string]: any
    }

export default function Button({ children, appearance, href, additionalClasses, ...attrs }: Props) {
  if (appearance === 'link-accent') {
    return (
      <Link {...attrs} className={cn(s.linkAccent, additionalClasses)} href={href}>
        {children}
      </Link>
    )
  }

  return (
    <button {...attrs} className={cn(s[appearance], additionalClasses)}>
      {children}
    </button>
  )
}
