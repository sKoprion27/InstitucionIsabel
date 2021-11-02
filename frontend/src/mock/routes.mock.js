import {
  MdOutlineSupervisorAccount,
  MdOutlinePermIdentity,
  MdOutlinePayment,
  MdEditNote,
  MdOutlineCategory,
  MdOutlineScatterPlot,
  MdEmojiPeople,
  MdOutlineFavoriteBorder
} from 'react-icons/md'

export const routesSidebar = [
  {
    link: 'usuarios',
    name: 'Usuarios',
    permission: 'Consultar usuarios',
    icon: <MdOutlinePermIdentity />
  },
  {
    link: 'donaciones',
    name: 'Donaciones',
    permission: 'Consultar donaciones',
    icon: <MdOutlineFavoriteBorder />
  },
  {
    link: 'donadores',
    name: 'Donadores',
    permission: 'Consultar donadores',
    icon: <MdOutlineSupervisorAccount />
  },
  {
    link: 'beneficiarios',
    name: 'Beneficiarios',
    permission: 'Consultar beneficiario donacion',
    icon: <MdEmojiPeople />
  },
  {
    link: 'categorias',
    name: 'Categorias',
    permission: 'Consultar categoria donativo',
    icon: <MdOutlineCategory />
  },
  {
    link: 'metodos-pago',
    name: 'Métodos de pago',
    permission: 'Consultar metodos de pago',
    icon: <MdOutlinePayment />
  },
  {
    link: 'tipo-donacion',
    name: 'Tipo de donación',
    permission: 'Registrar tipo de donativo',
    icon: <MdOutlineScatterPlot />
  },
  {
    link: 'notas',
    name: 'Notas',
    permission: 'Registrar notas',
    icon: <MdEditNote />
  },
  {
    link: 'perfil',
    name: 'Mi Perfil',
    permission: 'Iniciar sesion',
    icon: <MdEditNote />
  }
]

export const routesSidebar1 = [
  {
    link: 'usuarios',
    name: 'Usuarios',
    permissions: [
      'Consultar donaciones',
      'Registrar donaciones',
      'Modificar donaciones',
      'Eliminar donaciones'
    ],
    icon: <MdOutlinePermIdentity />
  },
  {
    link: 'donaciones',
    name: 'Donaciones',
    permissions: [
      'Consultar donaciones',
      'Registrar donaciones',
      'Modificar donaciones',
      'Eliminar donaciones',
      'Marcar donacion facturada',
      'Descargar excel de consultas donaciones'
    ],
    icon: <MdOutlineFavoriteBorder />
  },
  {
    link: 'donadores',
    name: 'Donadores',
    permissions: [
      'Consultar donadores',
      'Modificar donadores',
      'Registrar donadores',
      'Eliminar donadores'
    ],
    icon: <MdOutlineSupervisorAccount />
  },
  {
    link: 'beneficiarios',
    name: 'Beneficiarios',
    permissions: [
      'Consultar beneficiario donacion',
      'Modificar beneficiario donacion',
      'Eliminar beneficiario donacion',
      'Registrar beneficiario donacion'
    ],
    icon: <MdEmojiPeople />
  },
  {
    link: 'categorias',
    name: 'Categorias',
    permissions: [
      'Consultar categoria donativo',
      'Registrar categoria donativo',
      'Eliminar beneficiario donacion',
      'Modificar categoria donativo'
    ],
    icon: <MdOutlineCategory />
  },
  {
    link: 'metodos-pago',
    name: 'Métodos de pago',
    permissions: [
      'Consultar metodos de pago',
      'Modificar metodo de pago',
      'Registrar metodo de pago',
      'Eliminar metodo de pago'
    ],
    icon: <MdOutlinePayment />
  },
  {
    link: 'tipo-donacion',
    name: 'Tipo de donación',
    permissions: [
      'Registrar tipo de donativo',
      'Modificar tipo de donativo',
      'Consultar tipo de donativo',
      'Eliminar tipo de donativo'
    ],
    icon: <MdOutlineScatterPlot />
  },
  {
    link: 'notas',
    name: 'Notas',
    permissions: [
      'Registrar notas',
      'Modificar notas',
      'Eliminar notas',
      'Consultar listado completo de notas',
      'Consultar notas asignadas'
    ],
    icon: <MdEditNote />
  },
  {
    link: 'perfil',
    name: 'Mi Perfil',
    permissions: ['Iniciar sesion'],
    icon: <MdEditNote />
  }
]
