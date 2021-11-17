import {
  useState
} from 'react'

import {
  useForm
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { NavPage } from '../../../Components/Dashboard/NavPage'
import { Card, Button } from 'react-materialize'
import { toastInit } from '../../../Components/Dashboard/AlertToast'
import { ModalElement } from '../../../Components/ModalHelp'
import { postBeneficiary } from '../../../helpers/beneficiaries.helpers'
import { beneficiarySchema } from '../../../utils/schemas'

export const BeneficiaryAdd = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm(
    {
      resolver: yupResolver(beneficiarySchema)
    }
  )

  const handlerSubmit = async (data) => {
    try {
      setLoading(true)

      const post = {
        beneficiary: {
          nombre: data.nombre,
          descripcion: data.descripcion
        },
        archivo: data.archivo[0]
      }
      console.log(post, '😀')
      await postBeneficiary(post)
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
        title='Agregar beneficiario'
        path='/dashboard/beneficiarios'
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
              ...register('nombre')
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
              {...register('descripcion')}

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
            <label>Lista de beneficiarios (pdf, excel). Opcional</label>
            <div className='file-field input-field'>
              <div className='btn'>
                <span>Subir archivo</span>
                <input type='file' {...register('archivo')} />
              </div>
              <div className='file-path-wrapper'>
                <input className='file-path validate' type='text' />
              </div>
            </div>
            {errors.archivo &&
              (<span className='red-text'>
                {
                  errors.archivo.message
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
        message='Los beneficiarios se colocan en las donaciones para identificar el destino de ese donativo.'
      />
    </>
  )
}
