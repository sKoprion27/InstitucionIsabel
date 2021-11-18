import { NavPage } from '../../../Components/Dashboard/NavPage'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { useEffect, useState } from 'react'
import { getAllCategories } from '../../../helpers/categories.helpers'
import { useFinder } from '../../../hooks/useFinder'
import { TableList } from '../../../Components/Dashboard/TableList'
import { toastInit } from '../../../Components/Dashboard/AlertToast'
import { useLoading } from '../../../hooks/useLoading'

export const CategoryList = () => {
  const [didFetch, setDidFetch] = useState(false)
  const { endLoading, initLoading, loading } = useLoading()
  const {
    setOriginalList,
    setListFilter,
    originalList,
    listFiltered,
    handlerFinder
  } = useFinder()

  useEffect(() => {
    const getList = async () => {
      try {
        initLoading()
        const categories = await getAllCategories()
        setOriginalList(categories)
        setListFilter(categories)
        toastInit('Lista actualizada')
        endLoading()
      } catch (error) {
        console.log(error)
        toastInit('Error al cargar lista', 'red lighten-2')
        endLoading()
      }
    }
    getList()
  }, [didFetch])

  return (
    <>
      <NavPage title='Lista de categorias de donación' onePage />
      <MenuPage
        name='categoria'
        handler={handlerFinder}
        backend='categories'
      />
      <TableList
        loading={loading}
        arrayList={originalList}
        arrayListFiltered={listFiltered}
        setFetchAction={setDidFetch}
        backend='categories'
        fields={['id']}
      />
    </>
  )
}
