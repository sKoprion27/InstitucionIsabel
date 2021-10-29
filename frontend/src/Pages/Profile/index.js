import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavPage } from '../../Components/Dashboard/NavPage'
import { useAuth } from '../../hooks/useAuth'

export const Profile = () => {
  const [edit, setEdit] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const onSubmit = data => console.log(data)
  const auth = useAuth()
  return (
    <div className='container'>
      <NavPage title='Perfil' />
      <div className='row justify-content-center '>
        <div className='col-8 col-md-5'>
          <form>
            <div className='mb-3'>
              <label className='form-label'>Nombre</label>
              <input type='text' className='form-control' />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Nombre</label>
              <input type='text' className='form-control' />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Nombre</label>
              <input type='text' className='form-control' />
            </div>
            <button type='submit' className='btn btn-primary'>Actualizar</button>
          </form>
          {
            JSON.stringify(auth.user)
          }
        </div>
      </div>
    </div>
  )
}
