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
import { convertToSelectOptions, filterSelectsOptiones, formatDateTable } from '../../../utils'

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
    dfdis: [],
    fiscal_regimens: []
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
          cfdis: convertToSelectOptions(response.cfdis)
        })

        console.log(response.donor)

        const initialStateForm = {
          ...response.donor,
          estado: formatDateTable(response.donor.estado)[0],
          id_estado: filterSelectsOptiones(
            response.estados,
            [{ id: response.donor.id_estado }],
            'nombre'
          )[0],
          cfdi: filterSelectsOptiones(
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
        },
        states: [...data.estados.map(c => { return { id: c.value } })],
        cfdis: [...data.cfdis.map(b => { return { id: b.value } })]
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

  /* if (edit === null) {
    return <Navigate to='/dashboard/NOTFOUND' />
  } */

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
          {/* SELECT MÉTODO DE PAGO */}
          <div className='input-select'>
            <label>Selecciona un método de pago</label>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Selecciona al menos un método de pago'
                }
              }}
              name='id_metodo_pago'
              render={({ field }) => (
                <Select
                  placeholder='Método de pago'
                  closeMenuOnSelect
                  components={animatedComponents}
                  options={options.paymentMethods}
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
          {/* SELECT TIPO DE DONACIÓN */}
          <div className='input-select'>
            <label>Selecciona que tipo de donativo</label>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Selecciona el tipo de donación'
                }
              }}
              name='id_tipo_donacion'
              render={({ field }) => (
                <Select
                  placeholder='Tipo donativo'
                  closeMenuOnSelect
                  components={animatedComponents}
                  options={options.typesDonations}
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
          {/* SELECT CATEGORIAS_DONACIONES */}
          <div className='input-select'>
            <label>Selecciona las categorias del donativo</label>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Selecciona al menos una categoria'
                }
              }}
              name='categorias'
              render={({ field }) => (
                <Select
                  placeholder='Categorias de donativo'
                  closeMenuOnSelect
                  components={animatedComponents}
                  options={options.categories}
                  isMulti
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
          {/* SELECT DONACIONES_BENEFICIARIOS */}
          <div className='input-select'>
            <label>Selecciona los beneficiarios del donativo</label>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Selecciona al menos una beneficiario'
                }
              }}
              name='beneficiarios'
              render={({ field }) => (
                <Select
                  placeholder='Beneficiarios del donativo'
                  closeMenuOnSelect
                  isMulti
                  components={animatedComponents}
                  options={options.beneficiaries}
                  {...field}
                  isDisabled={!edit}
                />
              )}
            />
            {errors.beneficiaries &&
              (<span
                className='red-text'
              >
                {errors.beneficiaries.message}
              </span>)
            }
          </div>
          {/* CAMBIO DE FOTO */}

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
