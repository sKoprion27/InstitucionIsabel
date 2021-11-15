import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { routesSidebar } from '../../../mock/routes.mock'

export const NavItems = ({ navbar }) => {
  const auth = useAuth()

  return (
    <>
      {
        routesSidebar.map(route => {
          if (auth.user.permisos.some(p => p.nombre === route.permission)) {
            return (
              <li key={route.name} className='waves-green'>
                <Link key={route.name} to={route.link} className={!navbar ? 'white-text' : 'black-text'}>
                  {route.icon}  {route.name}
                </Link>
              </li>
            )
          }
          return null
        })
      }
    </>
  )
}
