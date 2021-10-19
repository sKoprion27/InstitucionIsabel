import { Outlet } from 'react-router-dom'
import { ContainerGrid } from '../../Components/ContainerGrid'
import { Navbar } from '../../Components/Dashboard/Navbar'
import { Sidebar } from '../../Components/Dashboard/Sidebar'

export const DashboardLayout = () => {
  console.log('DASHBOARD')

  return (
    <div className='container-fluid'>
      <Navbar />
      <div className='row'>
        <Sidebar />
        {/* Renders children */}
        <ContainerGrid>
          <Outlet />
        </ContainerGrid>
      </div>
    </div>
  )
}
