import { Outlet } from 'react-router-dom'
import { ContainerGrid } from '../../Components/ContainerGrid'
import { NavbarMain } from '../../Components/Dashboard/NavbarMain'
import { Row, Col } from 'react-materialize'
import { Sidebar } from '../../Components/Dashboard/Sidebar'

export const DashboardLayout = () => {
  return (
    <Row>

      <Col m={2}>
        <Sidebar />
      </Col>

      <Col m={10}>
        <NavbarMain />
        <ContainerGrid>
          <Outlet />
        </ContainerGrid>
      </Col>
    </Row>
  )
}
