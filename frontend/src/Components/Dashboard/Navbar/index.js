import './style.scss'
import { Link } from 'react-router-dom'
import { useAuth } from './../../../hooks/useAuth'
import { MdManageAccounts } from 'react-icons/md'

export const Navbar = ({ toggle }) => {
  const auth = useAuth()
  const handlerLogout = () => {
    auth.logout()
  }
  return (
    <nav className='navbar navbar-light bg-light sticky-top'>
      <div className='container-fluid'>
        <button className='btn btn-primary' onClick={toggle}>Menú</button>

        <div className='options'>
          <div className='options__profile'>
            <Link to='perfil' className='options__profile__btn'>
              Mi cuenta<MdManageAccounts size={24} />
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
