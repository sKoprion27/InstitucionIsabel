import { NavLink } from 'react-router-dom'
import './style.scss'
export const Sidebar = () => {
  return (
    <div className='col-4 col-md-3'>
      <div className='sidebar'>
        <h2>Menú</h2>
        <ul className='sidebar__menu'>
          <li className='sidebar__item'>
            <NavLink to='/usuarios'>
              Usuarios
            </NavLink>
          </li>
          <li className='sidebar__item'>
            <NavLink to='/donaciones'>
              Donaciones
            </NavLink>
          </li>
          <li className='sidebar__item'>
            <NavLink to='/beneficiarios'>
              Beneficiarios
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}
