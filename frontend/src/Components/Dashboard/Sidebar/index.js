import { Link } from 'react-router-dom'
import logo from '../../../img/logo.jpg'
import { SideNav } from 'react-materialize'
import { useAuth } from '../../../hooks/useAuth'
import './style.scss'
import { NavItems } from '../NavItems'

export const Sidebar = () => {
  const auth = useAuth()

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
            {`${auth.user.nombre} ${auth.user.apellido}`}
          </Link>
          <span className='email'>
            {auth.user.correo_electronico}
          </span>
        </div>
      </li>
      <NavItems />

    </SideNav>
  )
}
