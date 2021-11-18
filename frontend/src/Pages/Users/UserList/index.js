import { useEffect, useState } from 'react'
import { NavPage } from '../../../Components/Dashboard/NavPage'
import { getAllUsers } from '../../../helpers/users.helpers'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { TableList } from '../../../Components/Dashboard/TableList'
import { useFinder } from '../../../hooks/useFinder'
import './style.scss'
import { toastInit } from '../../../Components/Dashboard/AlertToast'
import { useLoading } from '../../../hooks/useLoading'

export const UserList = () => {
  const [didFetch, setDidFetch] = useState(false)
  const { initLoading, endLoading, loading } = useLoading()
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
        initLoading()
        const users = await getAllUsers()
        setOriginalList(users)
        setListFilter(users)
        toastInit('Lista actualizada')
        endLoading()
      } catch (error) {
        console.log(error.response)
        toastInit('Error al cargar lista', 'red lighten-2')
        endLoading()
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
        loading={loading}
        arrayList={originalList}
        arrayListFiltered={listFiltered}
        setFetchAction={setDidFetch}
        backend='users'
      />
    </ >
  )
}
