import { Link } from 'react-router-dom'
import './style.scss'
import { routesSidebar } from './../../../mock/routes.mock'
export const Sidebar = () => {
  return (
    <div className='col-4 col-md-3'>
      <div className='sidebar'>
        <h2>Menú</h2>
        <ul className='sidebar__menu'>
          {
            routesSidebar.map(route => {
              return (
                <li key={route.name} className='sidebar__item'>
                  <Link to={route.link}>
                    {route.icon} {route.name}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
