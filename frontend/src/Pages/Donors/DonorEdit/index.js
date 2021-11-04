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
import {
  getAllStates
} from '../../../helpers/states.helpers'
import {
  getAllCfdis
} from '../../../helpers/cfdis.helpers'

import './style.scss'
import { NavPage } from '../../../Components/Dashboard/NavPage'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

export const DonorEdit = () => {
  const { id } = useParams()
  const [edit, setEdit] = useState(false)
  const [fetchUpdate, setFetchUpdate] = useState(false)
  const [activeModal, setActiveModal] = useState(false)
  const [states, setStates] = useState([])
  const [cfdis, setCfdi] = useState([])
  const animatedComponents = makeAnimated()

  const {
    register,
    handleSubmit,
    reset, control,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    const getDonor = async () => {
      try {
        const donor = await getOneDonor(id)
        const donorData = {
          ...donor
        }
        reset(donorData)
      } catch (error) {
        setEdit(null)
      }
    }
    getDonor()
  }, [id, edit])

  useEffect(() => {
    const getStates = async () => {
      const states = await getAllStates()
      const options = states.map(e => {
        return {
          value: e.id,
          label: e.nombre
        }
      })

      setStates(options)
    }
    getStates()
  }, [])

  useEffect(() => {
    const getCfdis = async () => {
      const cfdis = await getAllCfdis()
      const options = cfdis.map(c => {
        return {
          value: c.id,
          label: c.clave
        }
      })

      setCfdi(options)
    }
    getCfdis()
  }, [])

  const handlerSubmit = async (data) => {
    try {
      const states = data.states.map(state => {
        return {
          id: state.value,
          nombre: state.label
        }
      })
      const cfdis = data.cfdis.map(cfdi => {
        return {
          id: cfdi.value,
          nombre: cfdi.label
        }
      })
      const dataPost = {
        ...data,
        states,
        cfdis
      }
      await updateDonor(dataPost, id)

      setFetchUpdate(!fetchUpdate)
      alert('Usuario actualizado')
      setEdit(false)
    } catch (error) {
      console.log(error, 'Update donor')
    }
  }
  const handlerEdit = () => {
    setEdit(!edit)
  }
  if (edit === null) {
    return <Navigate to='/dashboard/usuarios' />
  }
  return (
    <>
      <NavPage title='Editar donador' path='/dashboard/donadores' />
      <p>Información de usuario</p>
      <form
        className='user__form'
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
                isMulti
                options={states}
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
            rules={{ required: true }}
            name='regimen_fiscal'

            render={({ field }) => (
              <Select
                placeholder='Estado'
                closeMenuOnSelect
                components={animatedComponents}
                options={states}
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
            rules={{ required: true }}
            name='regimen_fiscal'

            render={({ field }) => (
              <Select
                placeholder='CFDI'
                closeMenuOnSelect
                components={animatedComponents}
                options={cfdis}
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
