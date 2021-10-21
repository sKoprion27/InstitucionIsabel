import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDelete, MdOutlineMode } from 'react-icons/md'
import { getAllBeneficiaries } from './../../../helpers/beneficiaries.helpers'
export const BeneficiaryList = () => {
  const [beneficiaries, setBeneficiaries] = useState([])
  useEffect(() => {
    const getBeneficiaries = async () => {
      try {
        const beneficiaries = await getAllBeneficiaries()
        setBeneficiaries(beneficiaries)
      } catch (error) {
        console.log(error.response)
      }
    }
    getBeneficiaries()
  }, [])
  return (
    <div className='container beneficiaries'>
      <div className='row'>
        <h4>Lista de Beneficiarios</h4>
        <div className='table-responsive'>
          <table className='table table-hover'>
            <thead>
              <tr>
                {
                  beneficiaries.length > 0 && (Object.keys(beneficiaries[0]).map((key, index) => {
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
                beneficiaries.map((beneficiary) => {
                  return (
                    <tr key={beneficiary.id}>
                      <td scope='row'>{beneficiary.id}</td>
                      <td>{beneficiary.nombre_beneficiario}</td>
                      <td>{beneficiary.descripcion}</td>
                      <td>
                        <Link to={`${beneficiary.id}`} className='btn btn-success'>
                          <MdOutlineMode /> Editar
                        </Link>
                        <button className='btn btn-danger' data-bs-toggle='modal' data-bs-target={`#deleteModal${beneficiary.id}`}>
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
