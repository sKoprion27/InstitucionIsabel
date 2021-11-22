
import { useAuth } from '../../../hooks/useAuth'
import { Dropdown, Divider, Icon, Navbar, NavItem } from 'react-materialize'
import { Link } from 'react-router-dom'
import './style.scss'
import { NavItems } from '../NavItems'

export const NavbarMain = () => {
  const auth = useAuth()
  const handlerLogout = () => {
    auth.logout()
  }

  return (
    <>
      <Navbar
        className='navbar teal'
        alignLinks='right'
        brand={
          <Link to='/dashboard' className='brand-isabel'>
            Institución Isabel
          </Link>
        }
        id='mobile-nav'
        sidenav={<NavItems navbar />}
        fixed
        options={{
          draggable: false,
          edge: 'left',
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true
        }}
      >

        <Dropdown
          id='Dropdown-menu'
          options={{
            alignment: 'left',
            autoTrigger: true,
            closeOnClick: true,
            constrainWidth: true,
            container: null,
            coverTrigger: true,
            hover: false,
            inDuration: 150,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 250
          }}
          trigger={<a href='#!'>
            {auth.user.nombre} {auth.user.apellido}{' '}<Icon right>account_circle</Icon></a>}
        >
          <Link to='/dashboard/perfil'>
            Mi perfil
          </Link>
          <Divider />
          <NavItem onClick={handlerLogout}>
            Cerrar sesión
          </NavItem>
        </Dropdown>
      </Navbar>

    </>
  )
}
