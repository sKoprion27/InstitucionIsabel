import { Link } from 'react-router-dom'
import './style.scss'
import { routesSidebar } from './../../../mock/routes.mock'
import logo from '../../../img/logo.jpg'
export const Sidebar = () => {
  return (
    <div className='col-4 col-md-2'>
      <div className='sidebar'>
        <Link to='/'>
          <img className='sidebar__logo' src={logo} alt='Logo institución isabel' />
        </Link>
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
