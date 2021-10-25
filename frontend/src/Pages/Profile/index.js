import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavPage } from '../../Components/Dashboard/NavPage'

export const Profile = () => {
  const [edit, setEdit] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const onSubmit = data => console.log(data)
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
        </div>
      </div>
    </div>
  )
}
