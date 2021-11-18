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
  getFileBeneficiary,
  getOneBeneficiary,
  updateBeneficiary
} from '../../../helpers/beneficiaries.helpers'
import { toastInit } from '../../../Components/Dashboard/AlertToast'
import './style.scss'

export const BeneficiaryEdit = ({ justView }) => {
  const { id } = useParams()
  const [edit, setEdit] = useState(false)
  const [archivo, setArchivo] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    const getOne = async () => {
      try {
        const beneficiary = await getOneBeneficiary(id)
        const file = beneficiary.archivo
        setArchivo(file)
        reset({ ...beneficiary, archivo: '' })
      } catch (error) {
        console.log(error)
        setEdit(null)
      }
    }
    getOne()
  }, [id, edit])

  const handlerSubmit = async (data) => {
    try {
      const post = {
        beneficiary: {
          nombre: data.nombre,
          descripcion: data.descripcion
        },
        archivo: data.archivo[0]
      }
      await updateBeneficiary(post, id)
      toastInit('Elemento actualizado')
      setEdit(!edit)
    } catch (error) {
      console.log(error)
      toastInit('Error al actualizar', 'red lighten-2')
    }
  }
  const handlerEdit = () => {
    setEdit(!edit)
  }

  if (edit === null) {
    return <Navigate to='/dashboard/NOTFOUND' />
  }

  const handlerDownload = async () => {
    try {
      await getFileBeneficiary(id, archivo)
      toastInit('Archivo descargado')
    } catch (error) {
      console.log(error)
      toastInit('Error al descargar archivo', 'red lighten-2')
    }
  }

  return (
    <>
      <NavPage title='Editar beneficiario' justView={justView} path='/dashboard/beneficiarios' />
      <Card className='hoverable'>
        <p>Información</p>
        <form
          className='user__form '
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
          {
            !justView && (
              <div>
                <label>Lista de beneficiarios (pdf, excel). Opcional</label>
                <div className='file-field input-field'>
                  <div className={`btn ${!edit && 'disabled'}`}>
                    <span>Cambiar archivo</span>
                    <input type='file'
                      {...register('archivo')}
                      disabled={!edit}
                    />
                  </div>
                  <div className='file-path-wrapper'>
                    <input
                      className='file-path validate'
                      type='text'
                      disabled={!edit}
                    />
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
            )
          }

          {
            !justView && (<div className='user__btn__container'>
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
            </div>)
          }
        </form>
        <div className='file-section'>
          <label>Archivo actual</label>
          <div className='input-field'>
            <input type='text' value={archivo || 'Sin archivo'} disabled />
            <button
              type='button'
              className='btn orange'
              disabled={!archivo || !(edit || justView)}
              onClick={handlerDownload}
            >Descargar</button>
          </div>
        </div>

      </Card>
    </>
  )
}
