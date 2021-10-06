import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Login } from './Pages/Login'
import { Dashboard } from './Pages/Dashboard'
import { PublicRoute } from './Components/Auth/PublicRoute'
import { PrivateRoute } from './Components/Auth/PrivateRoute'

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute>
          <Route exact path='/dashboard' component={Dashboard} />
        </PrivateRoute>
        <PublicRoute>
          <Route exact path='/' component={Login} />
        </PublicRoute>
      </Switch>
    </BrowserRouter>
  )
}
