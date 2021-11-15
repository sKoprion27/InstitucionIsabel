import imageStatistics from '../img/data.jpg'
import imageDonors from '../img/donors.jpg'
import imageDonations from '../img/donations.jpg'
export const mockHome = [
  {
    id: 1,
    image: imageStatistics,
    title: 'Estadisticas',
    description: 'Esta sección es para consultar donaciones. Por defecto apare el elemento más reciente.',
    link: {
      text: '',
      url: ''
    }
  },
  {
    id: 2,
    image: imageDonations,
    title: 'Donaciones',
    description: 'Esta sección es para consultar donaciones. Por defecto apare el elemento más reciente.',
    link: {
      text: 'Ver donaciones',
      url: 'donaciones'
    }
  },
  {
    id: 3,
    image: imageDonors,
    title: 'Donadores',
    description: 'Esta sección es para consultar donadores. Por defecto apare el elemento más reciente.',
    link: {
      text: 'Ver donadores',
      url: 'donadores'
    }
  }
]
