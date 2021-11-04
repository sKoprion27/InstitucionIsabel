import {
  useState
} from 'react'

import {
  useForm
} from 'react-hook-form'

import { NavPage } from '../../../Components/Dashboard/NavPage'
import { postTypeDonation } from '../../../helpers/typedonations.helpers'
import { Button, Card } from 'react-materialize'

import FeatureDiscoveryPrompt from 'material-ui-feature-discovery-prompt'

export const TypeDonationAdd = () => {
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
      await postTypeDonation(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      alert('ERROR')
    }
  }

  return (
    <>
      <NavPage title='Agregar tipo de donación' path='/dashboard/tipo-donacion' />
      <Card className='hoverable'>
        <p>Los tipos de donaciones son utiles para definir de que tipo es el</p>
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
            <button
              type='submit'
              className='btn btn-success'
              disabled={loading}
            >
              Agregar
            </button>

          </div>
        </form>
      </Card>
    </>
  )
}
