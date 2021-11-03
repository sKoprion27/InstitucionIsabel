import { Icon } from 'react-materialize'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { formatKeyTable } from '../../../utils'
import { Modal } from '../Modal'

export const TableList = ({
  arrayList = [],
  arrayListFiltered = [],
  setFetchAction,
  fields = [],
  path = ''
}) => {
  const auth = useAuth()
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
                    <th key={index}>{formatKeyTable(key)}</th>
                  )
                }))
            }
            <th>OPCIONES</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {
            arrayListFiltered.map((element) => {
              return (
                <tr key={element.id}>
                  {
                    Object.keys(element)
                      .filter(key => (key !== 'id') && (key !== 'creado'))
                      .map(key => {
                        return (
                          <td key={key}>{element[key]}</td>
                        )
                      })
                  }
                  <td className='options'>
                    <Link
                      to={`${element.id}`}
                      className='btn btn-success'>
                      <Icon>edit</Icon>
                    </Link>
                    {
                      path === 'users' && (<button
                        className='btn orange'
                        type='button'
                        disabled={auth.user.id === element.id}
                      >
                        <Icon>person_add_disabled</Icon>
                      </button>)
                    }
                    <Modal
                      id={element.id}
                      path={path}
                      setFetch={setFetchAction}
                    />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
