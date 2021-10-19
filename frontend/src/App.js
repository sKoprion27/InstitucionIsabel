import { AuthProvider } from './contexts/authContext'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { initInterceptors } from './services/auth.service'
import { routes } from './routes'

initInterceptors()

const AppRoutes = () => {
  const content = useRoutes(routes)

  return (
    <AuthProvider>
      {content}
    </AuthProvider>
  )
}
export const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}
