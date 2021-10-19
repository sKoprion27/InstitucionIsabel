import { useEffect, useState } from 'react'
import { getAllDonors } from '../../../helpers/donors.helpers'
import { Link } from 'react-router-dom'
export const DonorList = () => {
  const [donors, setDonors] = useState([])
  useEffect(() => {
    const getDonors = async () => {
      try {
        const donors = await getAllDonors()
        setDonors(donors)
      } catch (error) {
        console.log(error.response)
      }
    }
    getDonors()
  }, [])
  return (
    <div className='container donors'>
      <div className='row'>
        <h4>Lista de Donadores</h4>
        <div className='table-responsive'>
          <table className='table table-hover'>
            <thead>
              <tr>
                {
                  donors.length > 0 && (Object.keys(donors[0]).map((key, index) => {
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
                donors.map((donor) => {
                  let regimenFiscal
                  if (donor.regimen_fiscal) {
                    regimenFiscal = 'Persona Física'
                  } else {
                    regimenFiscal = 'Persona Moral'
                  }
                  return (
                    <tr key={donor.id}>
                      <td scope='row'>{donor.id}</td>
                      <td>{donor.telefono}</td>
                      <td>{donor.razon_social}</td>
                      <td>{donor.rfc}</td>
                      <td>{donor.correo_electronico}</td>
                      <td>{donor.codigo_postal}</td>
                      <td>{donor.domicilio_fiscal}</td>
                      <td>{regimenFiscal}</td>
                      <td>{donor.estado}</td>
                      <td>{donor.clave_cfdi}</td>
                      <td>{donor.decripcion_cfdi}</td>
                      <td>
                        <Link to={`${donor.id}`} className='btn btn-primary btn-sm'>Editar</Link>
                        <Link to={`${donor.id}`} className='btn btn-danger btn-sm'>Eliminar</Link>
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
