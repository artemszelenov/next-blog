import type { FieldAccess } from 'payload'

export const isAdmin: FieldAccess = ({ req: { user } }) => {
  if (user && user.role === 'admin') {
    return true
  }
  return false
}

export const isAdminOrEditor: FieldAccess = ({ req: { user } }) => {
  if ((user && user.role === 'admin') || (user && user.role === 'editor')) {
    return true
  }
  return false
}
