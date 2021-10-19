import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const GuestGuard = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />
  }

  return <>{children}</>
}
