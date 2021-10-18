import { AuthProvider } from './contexts/authContext'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login } from './Pages/Login/Login'
import { Dashboard } from './Pages/Dashboard'
import { useAuth } from './hooks/useAuth'

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}
const App = () => {
  const auth = useAuth()
  console.log(auth.isAuthenticated)
  return (
    <BrowserRouter>
      {
        auth.isAuthenticated
          ? (<PrivateRoutes />)
          : (<PublicRoutes />)
      }
    </BrowserRouter>
  )
}
const PublicRoutes = () => {
  console.log('PUBLIC_ROUTES')
  return (
    <>
      <Switch>
        <Route exact path='/' render={(props) => (<Login {...props} />)} default />
        <Route path='*' >
          <Redirect push to='/' />
        </Route>
      </Switch>
    </>
  )
}

const PrivateRoutes = () => {
  console.log('PRIVATE_ROUTES')
  return (
    <>
      <Switch>
        <Route exact path='/' render={(props) => <Dashboard {...props} />} default />
        <Route path='/users' render={(props) => <Users {...props} />} />
      </Switch>
    </>
  )
}

const Users = () => {
  console.log('USERS')
  const auth = useAuth()
  return (
    <>
      <button className='btn btn-danger w-25' onClick={() => auth.logout()}>Logout</button>
      <h1>Users</h1>
    </>
  )
}
