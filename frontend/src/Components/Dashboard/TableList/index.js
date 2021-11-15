import { Icon } from 'react-materialize'
import { Link } from 'react-router-dom'
import { formatDateTable, formatKeyTable } from '../../../utils'
import { PermissionGuard } from '../../PermissionGuard'
import { InvoiceModal } from '../InvoiceModal'
import { MaterialBox } from '../MaterialBox'
import { Modal } from '../Modal'
import './style.scss'

export const TableList = ({
  arrayList = [],
  arrayListFiltered = [],
  setFetchAction,
  fields = [],
  backend = ''
}) => {
  return (
    <div className='responsive-table'>
      <table className='highlight striped'>
        <thead>
          <tr>
            {
              arrayList.length > 0 &&
              (Object.keys(arrayList[0])
                .filter(key => (key !== 'id') && (key !== 'creado'))
                .map((key, index) => {
                  return (
                    <th key={key + index}>{formatKeyTable(key)}</th>
                  )
                }))
            }
            <th>OPCIONES</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {
            arrayListFiltered.length >= 1 && (
              <>
                {
                  arrayListFiltered.map((element, index) => {
                    return (
                      <tr key={element + index} className='table-row' >
                        {
                          Object.keys(element)
                            .filter(key => (key !== 'id') && (key !== 'creado'))
                            .map((key) => {
                              return (
                                <>
                                  {
                                    typeRender(key, element)
                                  }
                                </>
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
              </>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

const typeRender = (key, element) => {
  switch (key) {
    case 'foto_donacion':
      return (
        <MaterialBox
          element={element}
          keyValue={key}
        />)
    case 'facturado':
      return (
        <td>
          {
            element[key] === null
              ? (
                <span className='red-text'>No facturado</span>)
              : (
                <span
                  className='teal-text'
                >
                  {
                    formatDateTable(element[key])
                  }
                </span>)
          }
        </td>
      )
    default:
      return (
        <td>
          {
            element[key]
          }
        </td>
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
            className='btn orange'>
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
        {/* {
          backend === 'users' && (<button
            className='btn orange'
            type='button'
            disabled={auth.user.id === element.id}
          >
            <Icon>person_add_disabled</Icon>
          </button>)
        } */}
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
            className='btn orange'>
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
            path={backend}
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
            className='btn orange'>
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
            className='btn orange'>
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
            className='btn orange'>
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
            className='btn orange'>
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
            className='btn orange'>
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
