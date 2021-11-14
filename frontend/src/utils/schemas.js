import * as yup from 'yup'

export const donationSchema = yup.object().shape({
  foto_donacion: yup.mixed()
    .test('required', 'Es requerida una imagen', (value) => {
      return value && value.length
    })
    .test('fileSize', 'El archivo es muy pesado', (value, context) => {
      return value && value[0] && value[0].size <= 200000
    })
    .test('type', 'Solo es válido JPEG, JPG, PNG', function (value) {
      return value &&
        value[0] &&
        (value[0].type === 'image/jpeg' ||
          value[0].type === 'image/png' ||
          value[0].type === 'image/jpg')
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
