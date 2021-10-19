import './style.scss'
import { Link } from 'react-router-dom'
import { useAuth } from './../../../hooks/useAuth'
import { MdManageAccounts } from 'react-icons/md'

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

        <div className='options'>
          <div className='options__profile'>
            <Link to='perfil' className='btn btn-primary options__profile__btn'>
              {auth.user.nombre} <MdManageAccounts size={24} />
            </Link>
          </div>
          <button className='btn btn-danger' onClick={handlerLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>

  )
}
