import './donadores.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { donadores } from './../../services/donadonadores.service'

export const Donadores = () => {
  const arrHeader = ['id', 'Nombre', 'Teléfono', 'Tipo de Persona', 'Razón Social', 'RFC', 'Correo', 'Uso CFDI', 'Domicilio Fiscal', 'Código Postal', 'Ciudad', 'Acciones']
  const [donors, setDonors] = useState([])

  useEffect(() => {
    const getData = async () => {
      const donorsAPI = await donadores.getDonors()
      console.log(donorsAPI)
      setDonors(donorsAPI)
    }
    getData()
  }, [])

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 col-sm-3' id='side-bar'>
          <img style={{ textAlign: 'center' }} src='#' alt='' />
          <a href>Dashboard</a>
          <br />
          <a href='listarDonadores.html'>Donadores</a>
        </div>
        <div className='col-md-10 col-sm-9'>
          <div id='list-supply-top'>
            <h1 id='list-supply-title'>Lista de donadores</h1>
            <Link to='/donors/add' className='btn btn-primary w-25' id='supply-add'>
              Agregar donador
            </Link>
          </div>
          <div id='supply-table'>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  {
                    arrHeader.map(element => (<th key={element}>{element}</th>))
                  }
                </tr>
                {
                  donors.map(donor => {
                    return (
                      <tr key={donor.id}>
                        <td>{donor.id}</td>
                        <td>{donor.nombre_contacto}</td>
                        <td>{donor.telefono}</td>
                        <td>{donor.regimen_fiscal ? 'Moral' : 'Fisica'}</td>
                        <td>{donor.razon_social}</td>
                        <td>{donor.rfc}</td>
                        <td>{donor.correo_electronico}</td>
                        <td>{donor.id_cfdi}</td>
                        <td>{donor.domicilio_fiscal}</td>
                        <td>{donor.codigo_postal}</td>
                        <td>{donor.id_estado}</td>

                        <td>
                          <Link to={`/donors/${donor.id}`}>
                            <i className=' material-icons-outlined'>edit</i>
                          </Link>
                          <i className='material-icons-outlined' style={{ color: 'red' }}>delete </i>
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
    </div>
  )
}
