export const arrayDiference = (array1, array2, compareField) => {
  return array1.filter(function (current) {
    return array2.filter(function (current_b) {
      return current_b[compareField] === current[compareField]
    }).length === 0
  })
}

// [{ nombre: 'Daniel ', value: 2 }]  [{ nombre: 'Laura ', value: 3 }, { nombre: 'Daniel ', value: 2 }]
