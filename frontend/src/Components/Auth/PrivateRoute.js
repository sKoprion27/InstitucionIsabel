import { Redirect, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Login } from './../../Pages/Login'
import { useState } from 'react'

export const PrivateRoute = (props) => {
  const { children } = props
  const auth = useAuth()
  console.log(auth.isAuthenticated)
  const location = useLocation()
  const [requestedLocation, setRequestedLocation] = useState(null)
  if (!auth.isAuthenticated) {
    // if (location.pathname !== requestedLocation) {
    //   setRequestedLocation(location.pathname)
    // }
    return <Redirect to='/' />
  }

  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  // if (requestedLocation && location.pathname !== requestedLocation) {
  //   setRequestedLocation(null)
  //   return <Redirect to={requestedLocation} />
  // }
  return <>{children}</>
}
