import { NotFound } from './Components/NotFound'
import { Login } from './Pages/Login'
import { Home } from './Pages/Home/'
import { Navigate } from 'react-router-dom'
import { UserList } from './Pages/Users/UserList/index'
import { UserEdit } from './Pages/Users/UserEdit/index'
import { GuestGuard } from './Components/GuestGuard'
import { AuthGuard } from './Components/AuthGuard'
import { DashboardLayout } from './Pages/DashboardLayout'
import { DonorList } from './Pages/Donors/DonorList'
import { Profile } from './Pages/Profile/'
import { DonorEdit } from './Pages/Donors/DonorEdit/index'
import { DonationsList } from './Pages/Donations/DonationsList/index'
import { DonationEdit } from './Pages/Donations/DonationEdit'
import { UserAdd } from './Pages/Users/UserAdd/index'
import { BeneficiaryList } from './Pages/Beneficiaries/BeneficiaryList'
import { BeneficiaryEdit } from './Pages/Beneficiaries/BeneficiaryEdit'
import { PaymentList } from './Pages/PaymentMethods/PaymentList/index'
import { PaymentEdit } from './Pages/PaymentMethods/PaymentEdit'
import { CategoryList } from './Pages/Categories/CategoryList/index'
import { CategoryEdit } from './Pages/Categories/CategoryEdit'
import { TypeDonationList } from './Pages/TypeDonation/TypeDonationList/index'
import { TypeDonationEdit } from './Pages/TypeDonation/TypeDonationEdit/index'
import { NoteList } from './Pages/Notes/NoteList/index'
import { NoteEdit } from './Pages/Notes/NoteEdit/index'

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
            path: 'add',
            element: <UserAdd />
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
        path: 'beneficiarios',
        children: [
          {
            path: '',
            element: <BeneficiaryList />
          },
          {
            path: ':id',
            element: <BeneficiaryEdit />
          }
        ]
      },
      {
        path: 'metodos-pago',
        children: [
          {
            path: '',
            element: <PaymentList />
          },
          {
            path: ':id',
            element: <PaymentEdit />
          }
        ]
      },
      {
        path: 'categorias',
        children: [
          {
            path: '',
            element: <CategoryList />
          },
          {
            path: ':id',
            element: <CategoryEdit />
          }
        ]
      },
      {
        path: 'tipo-donacion',
        children: [
          {
            path: '',
            element: <TypeDonationList />
          },
          {
            path: ':id',
            element: <TypeDonationEdit />
          }
        ]
      },
      {
        path: 'notas',
        children: [
          {
            path: '',
            element: <NoteList />
          },
          {
            path: ':id',
            element: <NoteEdit />
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
