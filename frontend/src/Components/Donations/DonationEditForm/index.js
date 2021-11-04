import './style.scss'
import { useEffect, useState } from 'react'
import { getOneDonation, updateDonation } from './../../../helpers/donations.helpers'
import { useParams } from 'react-router'
export const DonationEditForm = () => {
  const { id } = useParams()
  const [donation, setDonation] = useState({
    nombre: '',
    monto: '',
    metodo_pago: '',
    tipo_donacion: '',
    razon_social: '',
    rfc: ''
  })
  const { nombre, monto, metodo_pago, tipo_donacion, razon_social, rfc } = donation

  useEffect(() => {
    const getDonation = async () => {
      try {
        const donation = await getOneDonation(id)
        setDonation(donation)
      } catch (error) {
        console.log(error)
      }
    }
    getDonation()
  }, [])

  const handlerChange = (e) => {
    setDonation(() => {
      return {
        ...donation
      }
    })
  }
  console.log(donation)

  const handlerSubmit = async (e) => {
    e.preventDefault()
    console.log(donation, '🚀')
    try {
      const donationnew = { id, ...donation }
      const response = await updateDonation(donationnew, id)
      console.log(response, '😀')
    } catch (error) {
      console.log(error.response, '😆')
    }
  }
  return (
    <form className='donor__form' onSubmit={handlerSubmit}>
      <div className='mb-3'>
        <label className='form-label'>Nombre Donacion</label>
        <input onChange={handlerChange} type='text' className='form-control' name='nombre' value={nombre} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Monto</label>
        <input onChange={handlerChange} type='text' className='form-control' name='monto' value={monto} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Método Pago</label>
        <input onChange={handlerChange} type='text' className='form-control' name='metodo_pago' value={metodo_pago} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Tipo Donacion</label>
        <input onChange={handlerChange} type='text' className='form-control' name='tipo_donacion' value={tipo_donacion} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Razon Social</label>
        <input onChange={handlerChange} type='text' className='form-control' name='razon_social' value={razon_social} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>RFC</label>
        <input onChange={handlerChange} type='text' className='form-control' name='rfc' value={rfc} />
      </div>
      <div className='mb-3'>
      </div>
      <div className='user__btn__container'>
        <button type='submit' className='btn btn-secondary btn-lg' >Actualizar donador</button>
      </div>

    </form>
  )
}
