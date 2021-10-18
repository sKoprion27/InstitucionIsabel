import { NavLink } from 'react-router-dom'
import './style.scss'
export const Sidebar = () => {
  return (
    <div className='col-4 col-md-3'>
      <div className='sidebar'>
        <h2>Menú</h2>
        <ul className='sidebar__menu'>
          <li className='sidebar__item'>
            <NavLink
              to='/users'
            >
              Usuarios
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}
