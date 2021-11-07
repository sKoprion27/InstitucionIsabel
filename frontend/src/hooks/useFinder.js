import { useState } from 'react'

export const useFinder = () => {
  const [originalList, setOriginalList] = useState([])
  const [listFiltered, setListFilter] = useState([])

  const handlerFinder = ({ target }) => {
    console.log(target.value)
    if (target.value === '') {
      setListFilter(originalList)
    } else {
      setListFilter(
        listFiltered.filter(element => (
          element.nombre.includes(target.value)
        ))
      )
    }
  }

  return {
    setOriginalList,
    setListFilter,
    originalList,
    listFiltered,
    handlerFinder
  }
}
