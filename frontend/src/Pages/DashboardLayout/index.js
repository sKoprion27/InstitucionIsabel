import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ContainerGrid } from '../../Components/ContainerGrid'
import { Navbar } from '../../Components/Dashboard/Navbar'
import { Sidebar } from '../../Components/Dashboard/Sidebar'
import './style.scss'

export const DashboardLayout = () => {
  const [toggle, setToggle] = useState(false)
  const handlerToggle = () => {
    setToggle(!toggle)
  }
  return (
    <div className='container-fluid'>
      <div className='row justify-content-center g-0'>
        <div className={`${toggle ? 'd-none' : 'col-2 col-md-2'} layout__sidebar bg-light`}>
          <Sidebar />
        </div>
        <div className={`col-10 ${toggle ? 'col-md-12' : 'col-md-10'} layout__main-content`}>
          <Navbar toggle={handlerToggle} />
          <ContainerGrid>
            <Outlet />
          </ContainerGrid>
        </div>
      </div>
    </div>
  )
}
