import { NotFound } from './Components/NotFound'
import { Login } from './Pages/Login'
import { Home } from './Pages/Home/'
import { Navigate } from 'react-router-dom'
import { UserList } from './Pages/Users/UserList/index'
import { UserEdit } from './Pages/Users/UserEdit/index'
import { GuestGuard } from './Components/GuestGuard'
import { AuthGuard } from './Components/AuthGuard'
import { DashboardLayout } from './Pages/Dashboard'
import { DonorList } from './Pages/Donors/DonorList'
import { Profile } from './Pages/Profile/'
import { DonorEdit } from './Pages/Donors/DonorEdit/index'
import { DonationsList } from './Pages/Donations/DonationsList/index'
import { DonationEdit } from './Pages/Donations/DonationEdit'

export const routes = [
  {
    path: '/',
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    )
  },
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'usuarios',
        children: [
          {
            path: '',
            element: <UserList />
          },
          {
            path: ':id',
            element: <UserEdit />
          }
        ]
      },
      {
        path: 'donadores',
        children: [
          {
            path: '',
            element: <DonorList />
          },
          {
            path: ':id',
            element: <DonorEdit />
          }
        ]
      },
      {
        path: 'donaciones',
        children: [
          {
            path: '',
            element: <DonationsList />
          },
          {
            path: ':id',
            element: <DonationEdit />
          }
        ]
      },
      {
        path: 'perfil',
        element: <Profile />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
]
