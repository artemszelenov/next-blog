import { useFormStatus } from 'react-dom'
import Button from '../Button'

type Props = {
  children: string
  [key: string]: any
}

export default function Submit({ children, ...attrs }: Props) {
  const { pending } = useFormStatus()

  return (
    <Button {...attrs} appearance="accent" type="submit" disabled={pending}>
      {pending ? '...' : children}
    </Button>
  )
}
