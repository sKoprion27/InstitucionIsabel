import { Link } from 'react-router-dom'
import { routesSidebar } from './../../../mock/routes.mock'
import logo from '../../../img/logo.jpg'
import { SideNav, SideNavItem, Button, Icon } from 'react-materialize'
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
      <SideNavItem
        user={{
          image: logo,
          email: user.correo_electronico,
          name: user.nombre
        }}
        userView
      />
      <NavItems />

    </SideNav>
  )
}
