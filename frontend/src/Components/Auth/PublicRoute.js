import { Redirect } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export const PublicRoute = (props) => {
  const { children } = props
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return <>{children}</>
}
