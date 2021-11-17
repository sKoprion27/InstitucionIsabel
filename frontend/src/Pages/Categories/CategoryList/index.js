import { NavPage } from '../../../Components/Dashboard/NavPage'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { useEffect, useState } from 'react'
import { getAllCategories } from '../../../helpers/categories.helpers'
import { useFinder } from '../../../hooks/useFinder'
import { TableList } from '../../../Components/Dashboard/TableList'
import { toastInit } from '../../../Components/Dashboard/AlertToast'

export const CategoryList = () => {
  const [didFetch, setDidFetch] = useState(false)
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
        const categories = await getAllCategories()
        setOriginalList(categories)
        setListFilter(categories)
        toastInit('Lista actualizada')
      } catch (error) {
        console.log(error)
        toastInit('Error al cargar lista', 'red lighten-2')
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
        arrayList={originalList}
        arrayListFiltered={listFiltered}
        setFetchAction={setDidFetch}
        backend='categories'
        fields={['id']}
      />
    </>
  )
}
