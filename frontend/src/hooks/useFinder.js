import { useState } from 'react'

export const useFinder = (finderList = ['nombre']) => {
  const [originalList, setOriginalList] = useState([])
  const [listFiltered, setListFilter] = useState([])

  const toggle = (ref) => {
    ref.value = ''
    setListFilter(originalList)
  }

  const handlerFinder = ({ target }) => {
    console.log(target.value)
    if (target.value === '') {
      setListFilter([...originalList])
    } else {
      const listFiltered = findBySelectFields(target)
      setListFilter(
        [...listFiltered]
      )
    }
  }

  const findBySelectFields = (target) => {
    // ['nombre','monto','apellido']

    const listFiltered = originalList.filter(element => {
      for (const item of finderList) {
        if (element[item]) {
          if (element[item].toLowerCase().includes(target.value.toLowerCase())) {
            return element
          }
        }
      }
      return null
    })
    console.log(listFiltered, '🤖')
    return listFiltered
  }

  return {
    setOriginalList,
    setListFilter,
    originalList,
    listFiltered,
    handlerFinder,
    toggle
  }
}
