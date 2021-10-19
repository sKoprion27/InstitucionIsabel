import { Link } from 'react-router-dom'
import './style.scss'
export const Sidebar = () => {
  return (
    <div className='col-4 col-md-3'>
      <div className='sidebar'>
        <h2>Menú</h2>
        <ul className='sidebar__menu'>
          <li className='sidebar__item'>
            <Link to='usuarios'>
              Usuarios
            </Link>
          </li>
          <li className='sidebar__item'>
            <Link to='donaciones'>
              Donaciones
            </Link>
          </li>
          <li className='sidebar__item'>
            <Link to='beneficiarios'>
              Beneficiarios
            </Link>
          </li>
          <li className='sidebar__item'>
            <Link to='donadores'>
              Donadores
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
