import { NavPage } from '../../../Components/Dashboard/NavPage'
import { useForm } from 'react-hook-form'

export const UserAdd = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const onSubmit = data => console.log(data)
  return (
    <div className='container'>
      <NavPage title='Agregar usuario' path='/dashboard/usuarios' />
      <div className='row justify-content-center'>
        <div className='col-10 col-md-8'>
          <form onSubmit='{handleSubmit(onSubmit)}'>
            <input {...register('firstname')} />
            <select {...register('gender')}>
              <option value='female'>female</option>
              <option value='male'>male</option>
              <option value='other'>other</option>
            </select>
            <input type='submit' />
          </form>
        </div>
      </div>
    </div>
  )
}
