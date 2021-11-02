import { Link } from 'react-router-dom'
import logo from '../../../img/logo.jpg'
import { SideNav } from 'react-materialize'
import { useAuth } from '../../../hooks/useAuth'
import './style.scss'
import { NavItems } from '../NavItems'

export const Sidebar = () => {
  const { user } = useAuth()
  return (
    <SideNav
      id='sidenav-left'
      className='indigo white-text hide-on-med-and-dow sidenav'
      fixed
    >
      <li className='waves-green'>
        <div className='user-view'>
          <img src={logo} className='circle' alt='logo' />
          <Link to='/dashboard/perfil' className='name white-text'>
            {`${user.nombre} ${user.apellido}`}
          </Link>
          <span className='email'>
            {user.correo_electronico}
          </span>
        </div>
      </li>
      <NavItems />

    </SideNav>
  )
}
