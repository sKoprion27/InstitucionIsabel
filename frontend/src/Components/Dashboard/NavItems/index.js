import { Link } from 'react-router-dom'
import { routesSidebar } from '../../../mock/routes.mock'

export const NavItems = ({ navbar }) => {
  return (
    <>
      {
        routesSidebar.map(route => {
          return (
            <li key={route.name} className='waves-green'>
              <Link key={route.name} to={route.link} className={!navbar ? 'white-text' : 'black-text'}>
                {route.name}
              </Link>
            </li>
          )
        })
      }
    </>
  )
}
