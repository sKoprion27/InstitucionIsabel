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
    icon: <MdOutlinePermIdentity />
  },
  {
    link: 'donaciones',
    name: 'Donaciones',
    icon: <MdOutlineFavoriteBorder />
  },
  {
    link: 'donadores',
    name: 'Donadores',
    icon: <MdOutlineSupervisorAccount />
  },
  {
    link: 'beneficiarios',
    name: 'Beneficiarios',
    icon: <MdEmojiPeople />
  },
  {
    link: 'categorias',
    name: 'Categorias',
    icon: <MdOutlineCategory />
  },
  {
    link: 'metodos-pago',
    name: 'Métodos de pago',
    icon: <MdOutlinePayment />
  },
  {
    link: 'tipo-donacion',
    name: 'Tipo de donación',
    icon: <MdOutlineScatterPlot />
  },
  {
    link: 'notas',
    name: 'Notas',
    icon: <MdEditNote />
  },
  {
    link: 'perfil',
    name: 'Mi Perfil',
    icon: <MdEditNote />
  }
]
