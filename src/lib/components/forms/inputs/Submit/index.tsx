import { useFormStatus } from 'react-dom'
import Button from '../Button'

type Props = {
  children: string
  appearance?: 'accent' | 'secondary'
  additionalClasses?: string[]
  [key: string]: any
}

export default function Submit({
  children,
  appearance = 'accent',
  additionalClasses,
  ...attrs
}: Props) {
  const { pending } = useFormStatus()

  return (
    <Button
      {...attrs}
      appearance={appearance}
      type="submit"
      disabled={pending}
      additionalClasses={additionalClasses}
    >
      {pending ? '...' : children}
    </Button>
  )
}
