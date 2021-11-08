import {
  useEffect,
  useState
} from 'react'
import {
  Link,
  Navigate,
  useParams
} from 'react-router-dom'
import {
  Controller,
  useForm
} from 'react-hook-form'

import { NavPage } from '../../../Components/Dashboard/NavPage'
import { Card } from 'react-materialize'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import {
  getOneDonor,
  updateDonor
} from '../../../helpers/donors.helpers'

import './style.scss'
import { MaterialBox } from '../../../Components/Dashboard/MaterialBox'
import { convertToSelectOptions, filterSelectsOptiones, formatDateTable, convertToSelectOptionsCFDI } from '../../../utils'

export const DonorEdit = () => {
  const { id } = useParams()
  const animatedComponents = makeAnimated()
  const [edit, setEdit] = useState(false)
  const [tiposRegimenes, setTipoRegimenes] = useState([{
    label: 'PERSONA MORAL',
    value: true
  },
  {
    label: 'PERSONA FISICA',
    value: false
  }
  ])
  const [options, setOptions] = useState({
    states: [],
    cfdis: []
  })

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    const getOne = async () => {
      try {
        const response = await getOneDonor(id)
        setOptions({
          states: convertToSelectOptions(response.estados),
          cfdis: convertToSelectOptionsCFDI(response.cfdis)
        })

        console.log(response.donor)

        const initialStateForm = {
          ...response.donor,

          id_estado: filterSelectsOptiones(
            response.estados,
            [{ id: response.donor.id_estado }],
            'nombre'
          )[0],
          id_cfdi: filterSelectsOptiones(
            response.cfdis,
            [{ id: response.donor.id_cfdi }],
            'clave'
          )[0]
        }
        console.log('INITIAL', initialStateForm)
        reset(initialStateForm)
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
      console.log('🐊', data)
      const updateData = {
        donor: {
          telefono: data.telefono,
          razon_social: data.razon_social,
          nombre: data.nombre,
          correo_electronico: data.correo_electronico,
          domicilio_fiscal: data.domicilio_fiscal,
          regimen_fiscal: data.regimen_fiscal,
          estado: data.id_estado.value,
          cfdi: data.id_cfdi.value
        }
      }
      console.log('😀', updateData)

      await updateDonor(updateData, id)
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
      <NavPage title='Editar donador' path='/dashboard/donadores' />
      <Card className='hoverable'>
        <h6 className='teal-text'>Información</h6>
        <form
          className='user__form '
          onSubmit={handleSubmit(handlerSubmit)}
        >
          <div>
            <label>Telefono</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {
              ...register('telefono', {
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
            <label>Razón Social</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {...register('razon_social', {
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
            <label>Nombre</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {...register('nombre', {
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
            <label>Correo Electrónico</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {...register('correo_electronico', {
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
            <label>Domicilio Fiscal</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {...register('domicilio_fiscal', {
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
          {/* SELECT MÉTODO DE PAGO */}
          <div className='input-select'>
            <label>Selecciona el régimen fiscal</label>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Selecciona al menos un método de pago'
                }
              }}
              name='regimen_fiscal'
              render={({ field }) => (
                <Select
                  placeholder='Régimen Fiscal'
                  closeMenuOnSelect
                  components={animatedComponents}
                  options={options.fiscal_regimens}
                  {...field}
                  isDisabled={!edit}
                />
              )}
            />
            {errors.payment_method &&
              (<span
                className='red-text'
              >
                {errors.payment_method.message}
              </span>)
            }
          </div>
          {/* SELECT ESTADO */}
          <div className='input-select'>
            <label>Selecciona el Estado</label>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Selecciona el Estado'
                }
              }}
              name='id_tipo_donacion'
              render={({ field }) => (
                <Select
                  placeholder='Estado'
                  closeMenuOnSelect
                  components={animatedComponents}
                  options={options.states}
                  {...field}
                  isDisabled={!edit}
                />
              )}
            />
            {errors.type_donation &&
              (<span
                className='red-text'
              >
                {errors.type_donation.message}
              </span>)
            }
          </div>
          {/* SELECT CFDIS */}
          <div className='input-select'>
            <label>Selecciona el CFDI</label>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Selecciona un CFDI'
                }
              }}
              name='cfdis'
              render={({ field }) => (
                <Select
                  placeholder='Claves de CFDI'
                  closeMenuOnSelect
                  components={animatedComponents}
                  options={options.cfdis}
                  {...field}
                  isDisabled={!edit}
                />
              )}
            />
            {errors.categories &&
              (<span
                className='red-text'
              >
                {errors.categories.message}
              </span>)
            }
          </div>

          {/* BOTONES DE OPCIONES */}
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
