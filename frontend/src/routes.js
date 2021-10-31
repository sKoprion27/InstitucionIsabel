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
import { PermissionGuard } from './Components/PermissionGuard'
import { NotPermission } from './Components/NotPermission'

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
            element: (
              <PermissionGuard permiso='Consultar usuarios'>
                <UserList />
              </PermissionGuard>
            )
          },
          {
            path: 'add',
            element: (
              <PermissionGuard permiso='Registrar usuarios'>
                <UserAdd />
              </PermissionGuard>
            )
          },
          {
            path: ':id',
            element: (
              <PermissionGuard permiso='Modificar usuarios'>
                <UserEdit />
              </PermissionGuard>
            )
          }
        ]
      },
      {
        path: 'donadores',
        children: [
          {
            path: '',
            element: (
              <PermissionGuard permiso='Consultar donadores'>
                <DonorList />
              </PermissionGuard>)
          },
          {
            path: ':id',
            element: (
              <PermissionGuard permiso='Modificar donadores'>
                <DonorList />
              </PermissionGuard>)
          }
        ]
      },
      {
        path: 'donaciones',
        children: [
          {
            path: '',
            element: (
              <PermissionGuard permiso='Consultar donaciones'>
                <DonationsList />
              </PermissionGuard>
            )
          },
          {
            path: ':id',
            element: (
              <PermissionGuard permiso='Modificar donaciones'>
                <DonationEdit />
              </PermissionGuard>
            )
          }
        ]
      },
      {
        path: 'beneficiarios',
        children: [
          {
            path: '',
            element: (
              <PermissionGuard permiso='Consultar beneficiario donacion'>
                <BeneficiaryList />
              </PermissionGuard>
            )
          },
          {
            path: ':id',
            element: (
              <PermissionGuard permiso='Modificar beneficiario donacion'>
                <BeneficiaryEdit />
              </PermissionGuard>
            )
          }
        ]
      },
      {
        path: 'metodos-pago',
        children: [
          {
            path: '',
            element: (
              <PermissionGuard permiso='Consultar metodos de pago'>
                <PaymentList />
              </PermissionGuard>
            )
          },
          {
            path: ':id',
            element: (
              <PermissionGuard permiso='Modificar metodo de pago'>
                <PaymentEdit />
              </PermissionGuard>
            )
          }
        ]
      },
      {
        path: 'categorias',
        children: [
          {
            path: '',
            element: (
              <PermissionGuard permiso='Consultar categoria donativo'>
                <CategoryList />
              </PermissionGuard>
            )
          },
          {
            path: ':id',
            element: (
              <PermissionGuard permiso='Modificar categoria donativo'>
                <CategoryEdit />
              </PermissionGuard>
            )
          }
        ]
      },
      {
        path: 'tipo-donacion',
        children: [
          {
            path: '',
            element: (
              <PermissionGuard permiso='Consultar tipo de donativo'>
                <TypeDonationList />
              </PermissionGuard>
            )
          },
          {
            path: ':id',
            element: (
              <PermissionGuard permiso='Modificar tipo de donativo'>
                <TypeDonationEdit />
              </PermissionGuard>
            )
          }
        ]
      },
      {
        path: 'notas',
        children: [
          {
            path: '',
            element: (
              <PermissionGuard permiso='Consultar listado completo de notas'>
                <NoteList />
              </PermissionGuard>
            )
          },
          {
            path: ':id',
            element: (
              <PermissionGuard permiso='Modificar notas'>
                <NoteEdit />
              </PermissionGuard>
            )
          }
        ]
      },
      {
        path: 'perfil',
        element: <Profile />
      },
      {
        path: 'permisos',
        children: [
          {
            path: '',
            element: <NotPermission />
          }
        ]
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
