
import { useAuth } from '../../../hooks/useAuth'
import { Sidebar } from '../Sidebar'
import { Navbar, NavItem, Icon } from 'react-materialize'
import { Link } from 'react-router-dom'
import './style.scss'

export const NavbarMain = () => {
  const auth = useAuth()
  const handlerLogout = () => {
    auth.logout()
  }

  return (
    <>
      <Navbar
        className='navbar'
        alignLinks='right'
        brand={
          <Link to='/dashboard' className='brand-logo'>
            Institución Isabel
          </Link>
        }
        sidenav={null}
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
        <NavItem onClick={handlerLogout}>
          Cerrar sesión
        </NavItem>
      </Navbar>

    </>
  )
}
