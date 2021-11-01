import { useForm } from 'react-hook-form'
import { changeUserPassword } from '../../../helpers/users.helpers'
import { Portal } from '../../Portal'
import './style.scss'

export const ModalPassword = ({ id, changeVisibility }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    try {
      await changeUserPassword(id, data)
      changeVisibility(false)
    } catch (error) {
      console.log(error)
      alert('Error')
    }
  }

  return (
    <Portal>
      <div className='overlay__modal'></div>
      <div
        className='modal__container white'
      >
        <h5>Escribe la nueva contraseña</h5>
        <div className='modal__password'>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Nueva contraseña</label>
              <input
                type='text'
                autoComplete='off'
                {...register('password', {
                  required: {
                    value: true,
                    message: 'No puedes dejar este espacio en blanco'
                  },
                  minLength: {
                    value: 8,
                    message: 'La contraseña debe contener al menos 8 caracteres'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
                    message: 'La contraseña debe contener al menos una mayúscula y un numero'
                  }
                })} />
            </div>
            <div className='modal__error'>
              {
                errors.password &&
                (<span className='red-text'>
                  {errors.password.message}
                </span>)
              }
            </div>
            <div className='modal__options'>
              <button
                className='btn green'
                type='submit'
              >
                Actualizar contraseña
              </button>
              <button
                type='button'
                className='red white-text btn'
                onClick={() => changeVisibility(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  )
}
