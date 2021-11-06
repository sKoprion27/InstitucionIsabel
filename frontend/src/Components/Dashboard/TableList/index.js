import { Icon } from 'react-materialize'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { formatDateTable, formatKeyTable } from '../../../utils'
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
                                    key === 'foto_donacion'
                                      ? (
                                        <MaterialBox
                                          element={element}
                                          keyValue={key}
                                        />)
                                      : (
                                        <td>
                                          {
                                            key === 'facturado'
                                              ? formatDateTable(element[key])
                                              : element[key]
                                          }
                                        </td>)
                                  }
                                </>
                              )
                            })
                        }
                        <td className='table-row__options'>
                          <Link
                            to={`${element.id}`}
                            className='btn btn-success'>
                            <Icon>edit</Icon>
                          </Link>
                          {
                            backend === 'users' && (<button
                              className='btn orange'
                              type='button'
                              disabled={auth.user.id === element.id}
                            >
                              <Icon>person_add_disabled</Icon>
                            </button>)
                          }
                          <Modal
                            id={element.id}
                            path={backend}
                            setFetch={setFetchAction}
                          />
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
