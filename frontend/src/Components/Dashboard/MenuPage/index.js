import { useRef, useState } from 'react'
import { Icon, TextInput } from 'react-materialize'
import { Link } from 'react-router-dom'
import { PermissionGuard } from '../../PermissionGuard'
import './style.scss'

export const MenuPage = (
  { name, backend, handler, type = 'nombre', toggle = null }) => {
  const [value, setValue] = useState('')
  const handlerChange = (e) => {
    handler(e)
    setValue(e.target.value)
  }
  const handlerClick = () => {
    toggle(inputRef.current)
    setValue('')
  }
  const inputRef = useRef()
  return (
    <div className='menu-finder'>
      {
        checkPermission(backend, name)
      }
      <div className='wrapper-finder'>
        <TextInput
          ref={inputRef}
          icon='search'
          id='finder'
          label={`Buscar ${name} por ${type}`}
          onChange={handlerChange}
        />
        {
          (toggle && value.length > 0) && (<button
            className='btn red'
            onClick={handlerClick}
          >
            <Icon>backspace</Icon>
          </button>)
        }
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
