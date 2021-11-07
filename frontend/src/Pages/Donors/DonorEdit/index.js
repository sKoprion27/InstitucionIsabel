import {
  getOneDonor,
  updateDonor
} from '../../../helpers/donors.helpers'
import {
  useEffect,
  useState
} from 'react'
import {
  Navigate,
  useParams
} from 'react-router-dom'
import {
  Controller,
  useForm
} from 'react-hook-form'

import './style.scss'
import { NavPage } from '../../../Components/Dashboard/NavPage'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { convertToSelectOptions, filterSelectsOptiones, formatDateTable } from '../../../utils'

export const DonorEdit = () => {
  const { id } = useParams()
  const [edit, setEdit] = useState(false)
  const [idState, setIdState] = useState(null)
  const [idCfdi, setIdCfdi] = useState(null)
  const animatedComponents = makeAnimated()
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
    reset, control,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    const getOne = async () => {
      try {
        const response = await getOneDonor(id)
        setIdState(response.donation.id_estado)
        setIdCfdi(response.donation.id_cfdi)

        setOptions({
          states: convertToSelectOptions(response.estados),
          cfdis: convertToSelectOptions(response.cfdis)
        })

        const initialStateForm = {
          ...response.donor,
          state: filterSelectsOptiones(
            response.estados,
            [{ id: response.donor.id_estado }],
            'nombre'
          ),
          cfdi: filterSelectsOptiones(
            response.cfdis, // 02784772
            [{ id: response.donor.id_cfdi }],
            'clave'
          )
        }
        reset(initialStateForm)
      } catch (error) {
        console.log(error)
        setEdit(null)
      }
    }
    getOne()
  }, [id, edit])

  const handlerSubmit = async (data) => {
    try {
      await updateDonor(data, id)
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
      <p>Información de usuario</p>
      <form
        className='donor__form'
        onSubmit={handleSubmit(handlerSubmit)}
      >
        <div>
          <label>Telefono</label>
          <input
            onChange={register}
            type='text'
            name='telefono'
            {
            ...register('telefono', {
              required: true
            })
            }
            disabled={!edit} />
          {errors.telefono?.type === 'required' &&
            (<span className='red-text'>El telefono es requerido</span>)
          }
        </div>
        <div>
          <label>Razon Social</label>
          <input
            onChange={register}
            type='text'
            name='razon_social'
            {...register('razon_social', {
              required: true
            })}
            disabled={!edit}
          />
          {errors.razon_social?.type === 'required' &&
            (<span className='red-text'>La razon social es requerido</span>)
          }
        </div>

        <div>
          <label>Nombre</label>
          <input
            onChange={register}
            type='text'
            name='nombre'
            {
            ...register('nombre', {
              required: true
            })
            }
            disabled={!edit} />
          {errors.nombre?.type === 'required' &&
            (<span className='red-text'>El nombre es requerido</span>)
          }
        </div>

        <div>
          <label>RFC</label>
          <input
            onChange={register}
            type='text'
            name='rfc'
            {...register('rfc', {
              required: true
            })}
            disabled={!edit}
          />
          {errors.rfc?.type === 'required' &&
            (<span className='red-text'>El rfc es requerido</span>)
          }
        </div>

        <div>
          <label>Email</label>
          <input
            onChange={register}
            type='text'
            name='correo_electronico'
            {...register('correo_electronico', {
              required: true
            })}
            disabled={!edit}
          />
          {errors.correo_electronico?.type === 'required' &&
            (<span className='red-text'>El correo electronico es requerido</span>)
          }
        </div>

        <div>
          <label>Código Postal</label>
          <input
            onChange={register}
            type='text'
            name='codigo_postal'
            {...register('codigo_postal', {
              required: true
            })}
            disabled={!edit}
          />
          {errors.codigo_postal?.type === 'required' &&
            (<span className='red-text'>El código postal es requerido</span>)
          }
        </div>

        <div>
          <label>Domicilio Fiscal</label>
          <input
            onChange={register}
            type='text'
            name='domicilio_fiscal'
            {...register('domicilio_fiscal', {
              required: true
            })}
            disabled={!edit}
          />
          {errors.domicilio_fiscal?.type === 'required' &&
            (<span className='red-text'>El domicilio fiscal es requerido</span>)
          }
        </div>

        <div className='input-select'>
          <label>Selecciona el regimen fiscal</label>
          <Controller
            control={control}
            rules={{ required: true }}
            name='regimen_fiscal'

            render={({ field }) => (
              <Select
                placeholder='Regimen Fiscal'
                closeMenuOnSelect
                components={animatedComponents}
                options={tiposRegimenes}
                {...field}
                isDisabled={!edit}
              />

            )}
          />
          {errors.states?.type === 'required' &&
            (<span
              className='red-text'
            >
              Selecciona un regimen fiscal
            </span>)
          }
        </div>

        <div className='input-select'>
          <label>Selecciona el estado</label>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Selecciona un estado'
              }
            }}
            name='state'
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
          {errors.states?.type === 'required' &&
            (<span
              className='red-text'
            >
              Selecciona un estado
            </span>)
          }
        </div>

        <div className='input-select'>
          <label>Selecciona el CFDI</label>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Selecciona un cfdi'
              }
            }}
            name='clave_cfdi'

            render={({ field }) => (
              <Select
                placeholder='CFDI'
                closeMenuOnSelect
                components={animatedComponents}
                options={options.cfdis}
                {...field}
                isDisabled={!edit}
              />
            )}
          />
          {errors.cfdis?.type === 'required' &&
            (<span
              className='red-text'
            >
              Selecciona un cfdi
            </span>)
          }
        </div>

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
    </>
  )
}
