import './style.scss'
import logo from '../../img/logo.jpg'
import { useAuth } from './../../hooks/useAuth'
import { useState } from 'react'
import { ContainerGrid } from '../ContainerGrid'
import { UserEditForm } from '../Users/UserEditForm'
export const Profile = () => {
  const auth = useAuth()
  const [user, setUser] = useState(auth.user)
  console.log(user)
  return (
    <ContainerGrid>
      <div className='container profile'>
        <div className='row justify-content-around'>
          <div className='col-6'>
            <h2>Bienvenido {user.nombre} </h2>
            <UserEditForm {...user} disable={true} />
            <button className='btn btn-primary btn-lg w-100'>Editar perfil</button>
          </div>
          <div className='col-4'>
            <img src={logo} className='img-fluid profile__img' alt='logo isabel' />
          </div>
        </div>
      </div>
    </ContainerGrid>
  )
}
