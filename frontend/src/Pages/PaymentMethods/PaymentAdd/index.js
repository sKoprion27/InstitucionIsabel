import {
  useState
} from 'react'

import {
  useForm
} from 'react-hook-form'

import { NavPage } from '../../../Components/Dashboard/NavPage'
import { Card, Button } from 'react-materialize'
import { toastInit } from '../../../Components/Dashboard/AlertToast'
import { ModalElement } from '../../../Components/ModalHelp'
import { postOnePayment } from '../../../helpers/payment.helpers'

export const PaymentAdd = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const handlerSubmit = async (data) => {
    try {
      setLoading(true)
      await postOnePayment(data)
      toastInit('Elemento agregado')
      setTimeout(() => {
        setLoading(false)
        reset()
      }, 1000)
    } catch (error) {
      toastInit('Error al agregar', 'red lighten-2')
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <>
      <NavPage
        title='Agregar método de pago'
        path='/dashboard/metodos-pago'
      />
      <Card className='hoverable'>
        <form
          onSubmit={handleSubmit(handlerSubmit)}
        >
          <div>
            <label>Nombre</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {
              ...register('nombre', {
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                }
              })
              }
            />
            {errors.nombre &&
              (<span className='red-text'>
                {
                  errors.nombre.message
                }
              </span>)
            }
          </div>
          <div>
            <label>Descripción</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {...register('descripcion', {
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                }
              })}

            />
            {errors.descripcion &&
              (<span className='red-text'>
                {
                  errors.descripcion.message
                }
              </span>)
            }
          </div>

          <div className='user__btn__container'>
            <Button
              type='submit'
              className='btn btn-success'
              disabled={loading}
            >
              Agregar
            </Button>
          </div>
        </form>
      </Card>
      <ModalElement
        message='Los métodos de pago son utiles para colocarlos en los donativos.'
      />
    </>
  )
}
