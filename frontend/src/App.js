import { AuthProvider } from './contexts/authContext'
import { Routes } from './routes'

export const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}
