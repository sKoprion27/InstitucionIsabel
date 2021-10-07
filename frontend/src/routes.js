import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login } from './Pages/Login'
import { Dashboard } from './Pages/Dashboard'
import { PublicRoute } from './Components/Auth/PublicRoute'
import { PrivateRoute } from './Components/Auth/PrivateRoute'
import { Donadores } from './Pages/Donadores/Donadores'

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/donadores' component={Donadores} />
        <Route exact path='/' component={Login} />
      </Switch>
    </Router>
  )
}
