import './style.scss'
import { useForm } from './../../../hooks/useForm'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getOneUser } from '../../../helpers/users.helpers'
export const UserEditForm = () => {
  const { id } = useParams()
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getOneUser(id)
        setForm(user)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [id])

  const [form, setForm, handlerChange] = useForm({
    nombre: '',
    apellido: '',
    correo_electronico: ''
  })

  const handlerSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <>
      <h4>Información de usuario</h4>
      <form className='user__form' onSubmit={handlerSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Nombre</label>
          <input onChange={handlerChange} type='text' className='form-control' name='nombre' value={form.nombre} />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Apellidos</label>
          <input onChange={handlerChange} type='text' className='form-control' name='apellido' value={form.apellido} />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Email</label>
          <input onChange={handlerChange} type='text' className='form-control' name='correo_electronico' value={form.correo_electronico} />
        </div>
        <div className='user__btn__container'>
          <button type='submit' className='btn btn-success btn-lg' >Actualizar usuario</button>
        </div>
      </form>
    </>
  )
}
