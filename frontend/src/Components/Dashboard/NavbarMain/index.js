
import { useAuth } from '../../../hooks/useAuth'
import { Sidebar } from '../Sidebar'
import { Navbar, NavItem, Icon } from 'react-materialize'

export const NavbarMain = () => {
  const auth = useAuth()
  const handlerLogout = () => {
    auth.logout()
  }

  return (
    <>
      <Navbar
        alignLinks='right'
        sidenav={null}
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
