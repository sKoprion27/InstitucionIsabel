import { Outlet } from 'react-router-dom'
import { NavbarMain } from '../../Components/Dashboard/NavbarMain'
import { Container, Row, Col } from 'react-materialize'
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
            <div className='col s12  m8 offset-m2'>
              <Outlet />
            </div>
          </Row>
        </Container>
      </main>
    </>
  )
}
