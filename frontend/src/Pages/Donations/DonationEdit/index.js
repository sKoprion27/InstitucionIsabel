import {
  useEffect,
  useState
} from 'react'
import {
  Navigate,
  useParams
} from 'react-router-dom'
import {
  useForm
} from 'react-hook-form'

import { NavPage } from '../../../Components/Dashboard/NavPage'

import { Card } from 'react-materialize'
import {
  getOnePayment,
  updateOnePayment
} from '../../../helpers/payment.helpers'
import { getOneDonation } from '../../../helpers/donations.helpers'

export const DonationEdit = () => {
  const { id } = useParams()
  const [edit, setEdit] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const [donation, setDonation] = useState({})

  useEffect(() => {
    const getOne = async () => {
      try {
        const donation = await getOneDonation(id)
        const esta_facturado =
          donation.esta_facturado !== null || 'No esta facturado'
        setDonation(donation)
        reset({
          ...donation,
          esta_facturado
        })
      } catch (error) {
        console.log(error)
        setEdit(null)
      }
    }
    getOne()
  }, [id, edit])

  // Use Effect for selects info

  const handlerSubmit = async (data) => {
    try {
      await updateOnePayment(data, id)
      setEdit(!edit)
    } catch (error) {
      console.log(error)
      alert('ERROR')
    }
  }
  const handlerEdit = () => {
    setEdit(!edit)
  }

  if (edit === null) {
    return <Navigate to='/dashboard/NOTFOUND' />
  }

  return (
    <>
      <NavPage title='Editar donación' path='/dashboard/donaciones' />
      <Card className='hoverable'>
        <p>Información</p>
        <form
          className='user__form '
          onSubmit={handleSubmit(handlerSubmit)}
        >
          {
            JSON.stringify(donation)
          }
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
              disabled={!edit} />
            {errors.nombre &&
              (<span className='red-text'>
                {
                  errors.nombre.message
                }
              </span>)
            }
          </div>
          <div>
            <label>Monto</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {...register('monto', {
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                }
              })}
              disabled={!edit}
            />
            {errors.descripcion &&
              (<span className='red-text'>
                {
                  errors.descripcion.message
                }
              </span>)
            }
          </div>
          <div>
            <label>Facturado</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {...register('esta_facturado', {
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                }
              })}
              disabled={!edit}
            />
            {errors.descripcion &&
              (<span className='red-text'>
                {
                  errors.descripcion.message
                }
              </span>)
            }
          </div>
          <div>
            <label>Foto</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {...register('foto_donacion', {
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                }
              })}
              disabled={!edit}
            />
            {errors.descripcion &&
              (<span className='red-text'>
                {
                  errors.descripcion.message
                }
              </span>)
            }
          </div>
          {/* SELECT DONDADOR */}
          {/* SELECT MÉTODO DE PAGO */}
          {/* SELECT TIPO DE DONACIÓN */}

          <div className='user__btn__container'>
            <button
              type='submit'
              className='btn btn-success  '
              disabled={!edit}
            >
              Actualizar
            </button>

            <button
              type='button'
              className={`btn ${edit ? 'red' : 'teal'} `}
              onClick={handlerEdit}
            >
              {
                edit ? 'Cancelar' : 'Editar'
              }
            </button>
          </div>
        </form>
      </Card>
    </>
  )
}
