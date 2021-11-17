import * as yup from 'yup'

export const donationSchema = yup.object().shape({
  foto_donacion: yup.mixed()
    .notRequired()
    .test('fileSize', 'El archivo es muy pesado', (value, context) => {
      return (value.length === 1 && value[0].size <= 200000) || value.length === 0
    })
    .test('type', 'Solo es válido JPEG, JPG, PNG', (value) => {
      return (value.length === 1 &&
        (value[0].type === 'image/jpeg' ||
          value[0].type === 'image/png' ||
          value[0].type === 'image/jpg')) || value.length === 0
    }),
  id_donador: yup.mixed()
    .test('required', 'Selecciona un donador', (value) => {
      return value
    }),
  id_metodo_pago: yup.mixed()
    .test('required', 'Selecciona un método de pago', (value) => {
      return value
    }),
  id_tipo_donacion: yup.mixed()
    .test('required', 'Selecciona un tipo de donativo', (value) => {
      return value
    }),
  categorias: yup.mixed()
    .test('required', 'Selecciona al menos una categoria', (value) => {
      return value && value.length
    }),
  beneficiarios: yup.mixed()
    .test('required', 'Selecciona al menos un beneficiario', (value) => {
      return value && value.length
    }),
  nombre: yup.mixed()
    .test('required', 'Ingresa el nombre del donativo', (value) => {
      return value && value.length
    }),
  monto: yup.mixed()
    .test('required', 'Ingresa el monto de la donación', (value) => {
      return value && value.length
    })
    .test('number', 'El numero debe ser un número', (value) => {
      return !isNaN(value)
    })
    .test('positive', 'El numero debe ser positivo', (value) => {
      return value > 0
    })
})

export const beneficiarySchema = yup.object().shape({
  archivo: yup.mixed()
    .notRequired()
    .test('fileSize', 'El archivo es muy pesado', (value, context) => {
      return (value.length === 1 && value[0].size <= 200000) || value.length === 0
    })
    .test('type', 'Solo es válido PDF, XLSX, CSV', (value) => {
      return (value.length === 1 &&
        (value[0].type === 'application/pdf' ||
          value[0].type === 'application/csv' ||
          value[0].type === 'application/vnd.ms-excel')) || value.length === 0
    }),
  nombre: yup.mixed()
    .test('required', 'Agrega un nombre', (value) => {
      return value
    }),
  descripcion: yup.mixed()
    .test('required', 'Agrega una descripción', (value) => {
      return value
    })
})
