import { Link } from 'react-router-dom'
import { Navbar } from '../../Components/Dashboard/Navbar'
import { Sidebar } from '../../Components/Dashboard/Sidebar'
import { Profile } from '../../Components/Profile'

export const Dashboard = ({ children }) => {
  console.log('DASHBOARD')

  return (
    <div className='container-fluid'>
      <Navbar />
      <div className='row'>
        <Sidebar />
        {
          children || (<Profile />)
        }
      </div>
    </div>
  )
}
