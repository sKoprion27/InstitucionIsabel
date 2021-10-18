/* eslint-disable react/display-name */

import { AuthProvider } from './contexts/authContext'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { Dashboard } from './Pages/Dashboard'
import { Login } from './Pages/Login'
import { authAPI } from './services/auth.service'
import { UserEdit } from './Pages/Users/UserEdit'
import { UserList } from './Pages/Users/UserList'

authAPI.initInterceptors()
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
  console.log(auth.user, 'USSSSSERR')
  return (
    <BrowserRouter>
      {
        auth.isAuthenticated
          ? (<PrivateRoutes role={auth.user.role} />)
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

const PrivateRoutes = ({ role }) => {
  console.log(role)
  console.log('PRIVATE_ROUTES')
  return (
    <>
      <Switch>
        <Route exact path='/' >
          <Dashboard />
        </Route>
        <Route exact path='/usuarios'>
          <UserList />
        </Route>
        <Route exact path='/usuarios/:id'>
          <UserEdit />
        </Route>

        <Route exact path='/donadores/'>
          <UserEdit />
        </Route>
      </Switch>
    </>
  )
}
