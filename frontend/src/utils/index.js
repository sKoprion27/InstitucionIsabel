export const formatDateTable = (date) => {
  const format = date.split('T').join(' ').split('.000Z')
  return format
}
export const formatKeyTable = (key) => {
  const format = key.replace(/_/g, ' ').toUpperCase()
  return format
}

export const filterSelectsOptiones = (arr, arrIds, key) => {
  console.log(arr, arrIds)
  const filterData = []
  for (const element of arr) {
    for (const idObject of arrIds) {
      if (element.id === idObject.id) {
        filterData.push({
          label: element[key],
          value: element.id
        })
      }
    }
  }
  if (filterData.length === 0) {
    return filterData[0]
  } else {
    return filterData
  }
}

export const convertToSelectOptions = (arr, key = 'nombre') => {
  return arr.map(value => {
    return {
      label: value[key],
      value: value.id
    }
  })
}
