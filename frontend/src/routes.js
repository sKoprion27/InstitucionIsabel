import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Login } from './Pages/Login'
import { Dashboard } from './Pages/Dashboard'

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/dashboard' component={Dashboard} />
      </Switch>
    </BrowserRouter>
  )
}
