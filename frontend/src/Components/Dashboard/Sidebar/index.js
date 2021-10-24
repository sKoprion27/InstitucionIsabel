import { Link } from 'react-router-dom'
import { routesSidebar } from './../../../mock/routes.mock'
import logo from '../../../img/logo.jpg'
import './style.scss'

export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to='/' className='sidebar__info'>
        <h1>
          Sistema de donaciones
        </h1>
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
  )
}
