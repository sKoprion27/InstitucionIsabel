import { Outlet } from 'react-router-dom'
import { NavbarMain } from '../../Components/Dashboard/NavbarMain'
import { Container, Row } from 'react-materialize'
import { Sidebar } from '../../Components/Dashboard/Sidebar'
import './style.scss'

export const DashboardLayout = () => {
  return (
    <>
      <header>
        <NavbarMain />
        <Sidebar />
      </header>
      <main className='has-fixed-sidenav'>
        <Container>
          <Row>
            <Outlet />
          </Row>
        </Container>
      </main>
    </>
  )
}
export const PageLayout = ({ onePage, children }) => {
  return (
    <div className={`col s12 ${onePage && 'm8 offset-m2'}`}>
      {children}
    </div>
  )
}
