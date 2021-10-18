import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
  console.log('DASHBOARD')
  const auth = useAuth()
  return (
    <div className='container'>
      <h1>
        Dashboard
      </h1>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          {
            JSON.stringify(auth.user)
          }
        </div>
        <button className='btn btn-danger w-25' onClick={() => auth.logout()}>Logout</button>
        <Link className='btn btn-primary w-25' to='/users'>Users</Link>
      </div>
    </div>
  )
}
