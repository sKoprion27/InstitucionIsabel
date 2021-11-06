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
  getOneDonation,
  updateDonation
} from '../../../helpers/donations.helpers'

import './style.scss'
import { MaterialBox } from '../../../Components/Dashboard/MaterialBox'
import { convertToSelectOptions, filterSelectsOptiones, formatDateTable } from '../../../utils'

export const DonationEdit = () => {
  const { id } = useParams()
  const animatedComponents = makeAnimated()
  const [edit, setEdit] = useState(false)
  const [urlFoto, setUrlFoto] = useState('')
  const [idDonador, setIdDonador] = useState(null)
  const [options, setOptions] = useState({
    donors: [],
    paymentMethods: [],
    typesDonations: [],
    categories: []
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
        const response = await getOneDonation(id)
        setUrlFoto(response.donation.foto_donacion)
        setIdDonador(response.donation.id_donador)

        setOptions({
          donors: convertToSelectOptions(response.donadores, 'razon_social'),
          paymentMethods: convertToSelectOptions(response.metodos_pago),
          categories: convertToSelectOptions(response.categorias),
          typesDonations: convertToSelectOptions(response.tipos_donacion),
          beneficiaries: convertToSelectOptions(response.beneficiarios)
        })

        console.log(response.donation)

        const initialStateForm = {
          ...response.donation,
          esta_facturado: formatDateTable(response.donation.esta_facturado),
          donor: filterSelectsOptiones(
            response.donadores,
            [{ id: response.donation.id_donador }],
            'razon_social'
          ),
          payment_method: filterSelectsOptiones(
            response.metodos_pago,
            [{ id: response.donation.id_metodo_pago }],
            'nombre'
          ),
          type_donation: filterSelectsOptiones(
            response.tipos_donacion, // 02784772
            [{ id: response.donation.id_tipo_donacion }],
            'nombre'
          ),
          categories: filterSelectsOptiones(
            response.categorias, // 02784772
            [...response.donation.categorias],
            'nombre'
          ),
          beneficiaries: filterSelectsOptiones(
            response.beneficiarios, // 02784772
            [...response.donation.beneficiarios],
            'nombre'
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

  // Use Effect for selects info

  const handlerSubmit = async (data) => {
    try {
      await updateDonation(data, id)
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
        <h6 className='teal-text'>Información</h6>
        <div className='img-donacion'>
          <p>Foto de la donación</p>
          <MaterialBox element={urlFoto} keyValue={null} />
        </div>
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
          {/* SELECT DONDADOR */}
          <div className='input-select'>
            <label>Selecciona donador</label>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Selecciona al menos un donador'
                }
              }}
              name='donor'
              render={({ field }) => (
                <Select
                  placeholder='Donador'
                  closeMenuOnSelect
                  components={animatedComponents}
                  options={options.donors}
                  {...field}
                  isDisabled={!edit}
                />
              )}
            />
            {errors.donors &&
              (<span
                className='red-text'
              >
                {errors.donors.message}
              </span>)
            }
          </div>
          <div className='input-field'>
            <Link
              className='teal-text'
              target='_blank' to={`/dashboard/donadores/${idDonador}`}
            >
              Clik para ver detalle de donador
            </Link>
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
              name='payment_method'
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
              name='type_donation'
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
              name='categories'
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
          {/* SELECT BENEFICIARIOS_DONACIONES */}
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
              name='beneficiaries'
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
          <div className='file-field input-field'>
            <div className='btn indigo darken-1 white-text' disabled={!edit}>
              <span>Cambiar foto</span>
              <input
                type='file'
              />
            </div>
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
