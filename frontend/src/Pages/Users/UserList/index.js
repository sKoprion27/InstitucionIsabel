import { useEffect, useState } from 'react'
import { NavPage } from '../../../Components/Dashboard/NavPage'
import { getAllUsers } from '../../../helpers/users.helpers'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { TableList } from '../../../Components/Dashboard/TableList'
import { useFinder } from '../../../hooks/useFinder'
import './style.scss'

export const UserList = () => {
  const [didFetch, setDidFetch] = useState(false)
  const {
    setOriginalList,
    setListFilter,
    originalList,
    listFiltered,
    handlerFinder
  } = useFinder()

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await getAllUsers()
        setOriginalList(users)
        setListFilter(users)
      } catch (error) {
        console.log(error.response)
      }
    }
    getUsers()
  }, [didFetch])

  return (
    <>
      <NavPage title='Lista de usuarios' onePage />
      <MenuPage
        handler={handlerFinder}
        name='usuario'
        type='nombre'
        backend='users'
      />
      <TableList
        arrayList={originalList}
        arrayListFiltered={listFiltered}
        setFetchAction={setDidFetch}
        backend='users'
      />
    </ >
  )
}
