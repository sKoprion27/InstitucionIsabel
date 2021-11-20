import { Icon } from 'react-materialize'
import { Link } from 'react-router-dom'
import { formatDateTable, formatKeyTable } from '../../../utils'
import { PermissionGuard } from '../../PermissionGuard'
import { InvoiceModal } from '../InvoiceModal'
import { Modal } from '../Modal'
import './style.scss'

export const TableList = ({
  arrayList = [],
  arrayListFiltered = [],
  setFetchAction,
  fields = ['id', 'creado'],
  backend = '',
  loading = true
}) => {
  return (
    <>
      {
        loading
          ? (
            <div className='progress'>
              <div className='indeterminate' />
            </div>)
          : (
            <div className='responsive-table'>
              <table className='highlight striped'>
                <thead>
                  {
                    arrayListFiltered.length > 0 && (<tr>
                      {
                        arrayList.length > 0 &&
                        (Object.keys(arrayList[0])
                          .filter(key => !fields.some(f => f === key))
                          .map((key, index) => {
                            return (
                              <th key={Math.random() + backend}>{formatKeyTable(key)}</th>
                            )
                          }))
                      }
                      <th>OPCIONES</th>

                    </tr>)
                  }

                </thead>

                {
                  arrayListFiltered.length > 0
                    ? (
                      <tbody className='text-center'>
                        {
                          arrayListFiltered.map((element, index) => {
                            return (
                              <tr key={index} className='table-row' >
                                {
                                  Object.keys(element)
                                    .filter(key => !fields.some(f => f === key))
                                    .map((key) => {
                                      return (
                                        <td key={element[key]}>
                                          {
                                            typeRender(key, element)
                                          }
                                        </td>
                                      )
                                    })
                                }
                                <td className='table-row__options'>
                                  {checkPermission(backend, element, setFetchAction)}
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>)
                    : (
                      <tbody className='teal-text'>
                        <tr>
                          <td className='container-nothing white'>
                            <h2>Sin coincidencias</h2>
                            <span><Icon>mood_bad</Icon></span>
                          </td>
                        </tr>
                      </tbody>)
                }
              </table>
            </div>)
      }
    </>
  )
}

const typeRender = (key, element) => {
  switch (key) {
    case 'facturado':
      return (<>
        {
          element[key] === 'No facturado'
            ? (
              <span className='red-text'>No facturado</span>)
            : (
              <span
                className='teal-text'
              >
                {
                  element[key] ? formatDateTable(element[key]) : ''
                }
              </span>)
        }
      </>)

    default:
      return (
        <>
          {
            element[key]
          }
        </>
      )
  }
}

const checkPermission = (backend, element, setFetchAction) => {
  switch (backend) {
    case 'users': return (
      <>
        <PermissionGuard onePermision permiso='Consultar usuarios'>
          <Link
            to={`ver/${element.id}`}
            className='btn green'>
            <Icon>visibility</Icon>
          </Link>
        </PermissionGuard>
        <PermissionGuard onePermision permiso='Modificar usuarios'>
          <Link
            to={`${element.id}`}
            className='btn'>
            <Icon>edit</Icon>
          </Link>
        </PermissionGuard>

        <PermissionGuard onePermision permiso='Eliminar usuarios'>
          <Modal
            id={element.id}
            path={backend}
            setFetch={setFetchAction}
          />
        </PermissionGuard>
      </>
    )
    case 'donations': return (
      <>
        <PermissionGuard onePermision permiso='Consultar donaciones'>
          <Link
            to={`ver/${element.id}`}
            className='btn green'>
            <Icon>visibility</Icon>
          </Link>
        </PermissionGuard>
        <PermissionGuard onePermision permiso='Modificar donaciones' >
          <Link
            to={`${element.id}`}
            className='btn'>
            <Icon>edit</Icon>
          </Link>
        </PermissionGuard>
        <PermissionGuard onePermision permiso='Eliminar donaciones'>
          <Modal
            id={element.id}
            path={backend}
            setFetch={setFetchAction}
          />
        </PermissionGuard>
        <PermissionGuard onePermision permiso='Marcar donacion facturada'>
          <InvoiceModal
            id={element.id}
            facturado={element.facturado}
            setFetch={setFetchAction}
          />
        </PermissionGuard>
      </>
    )
    case 'payment-methods': return (
      <>
        <PermissionGuard onePermision permiso='Consultar metodos de pago'>
          <Link
            to={`ver/${element.id}`}
            className='btn green'>
            <Icon>visibility</Icon>
          </Link>
        </PermissionGuard>
        <PermissionGuard onePermision permiso='Modificar metodo de pago' >
          <Link
            to={`${element.id}`}
            className='btn'>
            <Icon>edit</Icon>
          </Link>
        </PermissionGuard>
        <PermissionGuard onePermision permiso='Eliminar metodo de pago'>
          <Modal
            id={element.id}
            path={backend}
            setFetch={setFetchAction}
          />
        </PermissionGuard>
      </>
    )
    case 'beneficiaries': return (
      <>
        <PermissionGuard onePermision permiso='Consultar beneficiario donacion'>
          <Link
            to={`ver/${element.id}`}
            className='btn green'>
            <Icon>visibility</Icon>
          </Link>
        </PermissionGuard>
        <PermissionGuard onePermision permiso='Modificar beneficiario donacion' >
          <Link
            to={`${element.id}`}
            className='btn'>
            <Icon>edit</Icon>
          </Link>
        </PermissionGuard>
        <PermissionGuard onePermision permiso='Eliminar beneficiario donacion'>
          <Modal
            id={element.id}
            path={backend}
            setFetch={setFetchAction}
          />
        </PermissionGuard>
      </>
    )
    case 'categories': return (
      <>
        <PermissionGuard onePermision permiso='Consultar categoria donativo'>
          <Link
            to={`ver/${element.id}`}
            className='btn green'>
            <Icon>visibility</Icon>
          </Link>
        </PermissionGuard>
        <PermissionGuard onePermision permiso='Modificar categoria donativo' >
          <Link
            to={`${element.id}`}
            className='btn'>
            <Icon>edit</Icon>
          </Link>
        </PermissionGuard>
        <PermissionGuard onePermision permiso='Eliminar categoria donativo'>
          <Modal
            id={element.id}
            path={backend}
            setFetch={setFetchAction}
          />
        </PermissionGuard>
      </>
    )
    case 'types-donations': return (
      <>
        <PermissionGuard onePermision permiso='Consultar tipo de donativo'>
          <Link
            to={`ver/${element.id}`}
            className='btn green'>
            <Icon>visibility</Icon>
          </Link>
        </PermissionGuard>
        <PermissionGuard onePermision permiso='Modificar tipo de donativo' >
          <Link
            to={`${element.id}`}
            className='btn'>
            <Icon>edit</Icon>
          </Link>
        </PermissionGuard>
        <PermissionGuard onePermision permiso='Eliminar tipo de donativo'>
          <Modal
            id={element.id}
            path={backend}
            setFetch={setFetchAction}
          />
        </PermissionGuard>
      </>
    )
    case 'donors': return (
      <>
        <PermissionGuard onePermision permiso='Consultar donadores' >
          <Link
            to={`ver/${element.id}`}
            className='btn green'>
            <Icon>visibility</Icon>
          </Link>
        </PermissionGuard>
        <PermissionGuard onePermision permiso='Modificar donadores' >
          <Link
            to={`${element.id}`}
            className='btn'>
            <Icon>edit</Icon>
          </Link>
        </PermissionGuard>
        <PermissionGuard onePermision permiso='Eliminar donadores'>
          <Modal
            id={element.id}
            path={backend}
            setFetch={setFetchAction}
          />
        </PermissionGuard>
      </>
    )
  }
}
