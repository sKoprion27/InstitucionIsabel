import { NotFound } from './Components/NotFound'
import { Login } from './Pages/Login'
import { Home } from './Pages/Home/'
import { Navigate } from 'react-router-dom'
import { UserList } from './Pages/Users/UserList'
import { UserEdit } from './Pages/Users/UserEdit'
import { GuestGuard } from './Components/GuestGuard'
import { AuthGuard } from './Components/AuthGuard'
import { DashboardLayout, PageLayout } from './Pages/DashboardLayout'
import { DonorList } from './Pages/Donors/DonorList'
import { Profile } from './Pages/Profile/'
import { DonorEdit } from './Pages/Donors/DonorEdit/'
import { DonationsList } from './Pages/Donations/DonationsList'
import { DonorAdd } from './Pages/Donors/DonorAdd'
import { DonationEdit } from './Pages/Donations/DonationEdit'
import { DonationAdd } from './Pages/Donations/DonationAdd'
import { UserAdd } from './Pages/Users/UserAdd'
import { BeneficiaryList } from './Pages/Beneficiaries/BeneficiaryList'
import { BeneficiaryEdit } from './Pages/Beneficiaries/BeneficiaryEdit'
import { PaymentList } from './Pages/PaymentMethods/PaymentList'
import { PaymentEdit } from './Pages/PaymentMethods/PaymentEdit'
import { CategoryList } from './Pages/Categories/CategoryList'
import { CategoryEdit } from './Pages/Categories/CategoryEdit'
import { TypeDonationList } from './Pages/TypeDonation/TypeDonationList'
import { TypeDonationEdit } from './Pages/TypeDonation/TypeDonationEdit'
import { NoteList } from './Pages/Notes/NoteList'
import { NoteEdit } from './Pages/Notes/NoteEdit'
import { PermissionGuard } from './Components/PermissionGuard'
import { NotPermission } from './Components/NotPermission'
import { BeneficiaryAdd } from './Pages/Beneficiaries/BeneficiaryAdd'
import { PaymentAdd } from './Pages/PaymentMethods/PaymentAdd'
import { CategoryAdd } from './Pages/Categories/CategoryAdd'
import { TypeDonationAdd } from './Pages/TypeDonation/TypeDonationAdd'

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
                <PageLayout onePage>
                  <UserAdd />
                </PageLayout>
              </PermissionGuard>
            )
          },
          {
            path: ':id',
            element: (
              <PermissionGuard permiso='Modificar usuarios'>
                <PageLayout onePage>
                  <UserEdit />
                </PageLayout>
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
                <PageLayout onePage>
                  <DonorEdit />
                </PageLayout>
              </PermissionGuard>)
          },
          {
            path: ':id',
            element: (
              <PermissionGuard permiso='Registrar donadores'>
                <PageLayout onePage>
                  <DonorAdd />
                </PageLayout>
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
                <PageLayout onePage>
                  <DonationEdit />
                </PageLayout>
              </PermissionGuard>
            )
          },
          {
            path: 'add',
            element: (
              <PermissionGuard permiso='Registrar donaciones'>
                <PageLayout onePage>
                  <DonationAdd />
                </PageLayout>
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
                <PageLayout onePage>
                  <BeneficiaryEdit />
                </PageLayout>
              </PermissionGuard>
            )
          },
          {
            path: 'add',
            element: (
              <PermissionGuard permiso='Registrar beneficiario donacion'>
                <PageLayout onePage>
                  <BeneficiaryAdd />
                </PageLayout>
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
                <PageLayout onePage>
                  <PaymentEdit />
                </PageLayout>
              </PermissionGuard>
            )
          },
          {
            path: 'add',
            element: (
              <PermissionGuard permiso='Registrar metodo de pago'>
                <PageLayout onePage>
                  <PaymentAdd />
                </PageLayout>
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
                <PageLayout onePage>
                  <CategoryEdit />
                </PageLayout>
              </PermissionGuard>
            )
          },
          {
            path: 'add',
            element: (
              <PermissionGuard permiso='Registrar categoria donativo'>
                <PageLayout onePage>
                  <CategoryAdd />
                </PageLayout>
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
                <PageLayout onePage>
                  <TypeDonationEdit />
                </PageLayout>
              </PermissionGuard>
            )
          },
          {
            path: 'add',
            element: (
              <PermissionGuard permiso='Registrar tipo de donativo'>
                <PageLayout onePage>
                  <TypeDonationAdd />
                </PageLayout>
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
        element: (
          <PageLayout onePage>
            <Profile />
          </PageLayout>
        )
      },
      {
        path: 'permisos',
        children: [
          {
            path: '',
            element: (
              <PageLayout onePage>
                <NotPermission />
              </PageLayout>
            )
          }
        ]
      },
      {
        path: '*',
        element: (
          <PageLayout onePage>
            <NotFound />
          </PageLayout>
        )
      }
    ]
  },
  {
    path: '*',
    element: (
      <PageLayout onePage>
        <NotFound />
      </PageLayout>
    )
  }
]
