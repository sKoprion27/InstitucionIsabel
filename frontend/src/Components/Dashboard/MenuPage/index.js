import { Link } from 'react-router-dom'
import { PermissionGuard } from '../../PermissionGuard'
import './style.scss'

export const MenuPage = ({ name, backend, handler, type }) => {
  return (
    <div className='menu'>
      {
        checkPermission(backend, name)
      }
      <div className='input-field'>
        <label>Buscar {name} {type && `por ${type}`}</label>
        <input
          type='text'
          onChange={handler}
        />
      </div>
    </div>
  )
}

const checkPermission = (backend, name) => {
  switch (backend) {
    case 'users': return (
      <>
        <PermissionGuard onePermision permiso='Registrar usuarios'>
          <Link
            to='add'
            className='btn'
          >
            Agregar {name}
          </Link>
        </PermissionGuard>
      </>
    )
    case 'donations': return (
      <>
        <PermissionGuard onePermision permiso='Registrar donaciones'>
          <Link
            to='add'
            className='btn'
          >
            Agregar {name}
          </Link>
        </PermissionGuard>
      </>
    )
    case 'payment-methods': return (
      <>
        <PermissionGuard onePermision permiso='Registrar metodo de pago'>
          <Link
            to='add'
            className='btn'
          >
            Agregar {name}
          </Link>
        </PermissionGuard>
      </>
    )
    case 'beneficiaries': return (
      <>
        <PermissionGuard onePermision permiso='Registrar beneficiario donacion'>
          <Link
            to='add'
            className='btn'
          >
            Agregar {name}
          </Link>
        </PermissionGuard>
      </>
    )
    case 'categories': return (
      <>
        <PermissionGuard onePermision permiso='Registrar categoria donativo'>
          <Link
            to='add'
            className='btn'
          >
            Agregar {name}
          </Link>
        </PermissionGuard>
      </>
    )
    case 'types-donations': return (
      <>
        <PermissionGuard onePermision permiso='Registrar tipo de donativo'>
          <Link
            to='add'
            className='btn'
          >
            Agregar {name}
          </Link>
        </PermissionGuard>
      </>
    )
    case 'donors': return (
      <>
        <PermissionGuard onePermision permiso='Registrar donadores'>
          <Link
            to='add'
            className='btn'
          >
            Agregar {name}
          </Link>
        </PermissionGuard>
      </>
    )
  }
}
