import { Link } from 'react-router-dom'
import './style.scss'

export const MenuPage = ({ name, path, handler, type }) => {
  return (
    <div className='menu'>
      <Link
        to='add'
        className='btn'
      >
        Agregar {name}
      </Link>
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
