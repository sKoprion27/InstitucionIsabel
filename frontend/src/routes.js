import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login } from './Pages/Login'
import { Dashboard } from './Pages/Dashboard'
import { PublicRoute } from './Components/Auth/PublicRoute'
import { PrivateRoute } from './Components/Auth/PrivateRoute'

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute>
          <Route path='/dashboard' component={Dashboard} />
        </PrivateRoute>
        <PublicRoute>
          <Route exact path='/' component={Login} />
        </PublicRoute>
      </Switch>
    </Router>
  )
}
