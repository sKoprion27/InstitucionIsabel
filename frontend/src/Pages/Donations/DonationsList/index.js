import { useEffect, useState } from 'react'
import { getAllDonations } from '../../../helpers/donations.helpers'
import { Link } from 'react-router-dom'
import { MdDelete, MdOutlineMode } from 'react-icons/md'
export const DonationsList = () => {
  const [donations, setDonations] = useState([])
  useEffect(() => {
    const getDonations = async () => {
      try {
        const donations = await getAllDonations()
        setDonations(donations)
      } catch (error) {
        console.log(error.response)
      }
    }
    getDonations()
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
                      <Link to={`${donation.id}`} className='btn btn-success'>
                          <MdOutlineMode /> Editar
                        </Link>
                        <button className='btn btn-danger' data-bs-toggle='modal' data-bs-target={`#deleteModal${donation.id}`}>
                          <MdDelete /> Eliminar
                        </button>
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
