import { Link } from 'react-router-dom'
import { useAuth } from './../../../hooks/useAuth'

export const Navbar = () => {
  const auth = useAuth()
  const handlerLogout = () => {
    auth.logout()
  }
  return (
    <nav className='navbar navbar-light bg-light'>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand'>
          Institución Isabel
        </Link>

        <Link to='perfil' className='btn btn-primary'>
          Perfil
        </Link>
        <button className='btn btn-danger' onClick={handlerLogout}>
          Cerrar sesión
        </button>
      </div>
    </nav>

  )
}
