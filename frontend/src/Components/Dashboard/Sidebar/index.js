import { Link } from 'react-router-dom'
import { routesSidebar } from './../../../mock/routes.mock'
import logo from '../../../img/logo.jpg'
import { SideNav, SideNavItem, Button, Icon } from 'react-materialize'
import { useAuth } from '../../../hooks/useAuth'
// import './style.scss'

export const Sidebar = () => {
  const { user } = useAuth()
  return (
    <SideNav
      id='SideNav-31'
      className='grey hide-on-med-and-dow'
      fixed
      options={{
        draggable: true
      }}

    >
      <SideNavItem

        user={{
          image: logo,
          email: user.correo_electronico,
          name: user.nombre
        }}
        userView
      />
      {
        routesSidebar.map(route => {
          return (
            <SideNavItem
              icon={route.icon}
              key={route.name}
            >
              <Link to={route.link} className='black-text'>
                {route.name}
              </Link>
            </SideNavItem>
          )
        })
      }
    </SideNav>
  )
}
