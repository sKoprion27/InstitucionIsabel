import { useEffect, useState } from 'react'
import { getAllDonations } from '../../../helpers/donations.helpers'
import { Link } from 'react-router-dom'
export const DonationsList = () => {
  const [donations, setDonations] = useState([])
  useEffect(() => {
    const getDonors = async () => {
      try {
        const donations = await getAllDonations()
        setDonations(donations)
      } catch (error) {
        console.log(error.response)
      }
    }
    getDonors()
  }, [])
  return (
    <div className='container donations'>
      <div className='row'>
        <h4>Lista de Donaciones</h4>
        <div className='table-responsive'>
          <table className='table table-hover'>
            <thead>
              <tr>
                {
                  donations.length > 0 && (Object.keys(donations[0]).map((key, index) => {
                    return (
                      <th key={index} scope='col'>{formatKey(key)}</th>
                    )
                  }))
                }
                <th scope='col'>OPCIONES</th>
              </tr>
            </thead>
            <tbody>
              {
                donations.map((donation) => {
                  return (
                    <tr key={donation.id}>
                      <td scope='row'>{donation.id}</td>
                      <td>{donation.nombre_donacion}</td>
                      <td>{donation.monto}</td>
                      <td>{donation.metodo_pago}</td>
                      <td>{donation.tipo_donacion}</td>
                      <td>{donation.razon_social}</td>
                      <td>{donation.rfc}</td>
                      <td>
                        <Link to={`${donation.id}`} className='btn btn-primary btn-sm'>Editar</Link>
                        <Link to={`${donation.id}`} className='btn btn-danger btn-sm'>Eliminar</Link>
                      </td>
                    </tr>
                  )
                })
              }

            </tbody>
          </table>

        </div>

      </div>
    </div>
  )
}

const formatKey = (key) => {
  const format = key.replace(/_/g, ' ').toUpperCase()
  return format
}
