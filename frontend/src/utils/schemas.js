import * as yup from 'yup'

export const donationSchema = yup.object().shape({
  foto_donacion: yup.mixed()
    // .test('required', 'Es requerida una imagen', (value, context) => {
    //   console.log(value, 'SCHEMA @1', context)
    //   return value && value.length
    // })
    .notRequired()
    .test('fileSize', 'El archivo es muy pesado', (value, context) => {
      console.log(value.length, 'SCHEMA @2')
      return (value.length === 1 && value[0].size <= 200000) || value.length === 0
    })
    .test('type', 'Solo es válido JPEG, JPG, PNG', (value) => {
      console.log(value, 'SCHEMA @3')

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

export const donorSchema = yup.object().shape({
  telefono: yup.mixed()
    .test('required', 'Ingresa el número de teléfono del donador', (value) => {
      return value
    })
    .test('number', 'El número de teléfono debe contener únicamente números', (value) => {
      return !isNaN(value)
    })
    .test('length', 'El número de teléfono debe ser de 10 dígitos', (value) => {
      return value.length === 10
    }),
  razon_social: yup.mixed()
    .test('required', 'Ingresa la razón social del donador', (value) => {
      return value
    }),
  rfc: yup.mixed()
    .test('required', 'Ingresa el rfc del donador', (value) => {
      return value
    })
    .test('length', 'El rfc debe ser de 13 caracteres', (value) => {
      return value.length === 13
    }),
  nombre: yup.mixed()
    .test('required', 'Ingresa el nombre del donador', (value) => {
      return value
    }),
  correo_electronico: yup.mixed()
    .test('required', 'Ingresa el correo electrónico del donador', (value) => {
      return value
    }),
  domicilio_fiscal: yup.mixed()
    .test('required', 'Ingresa el domicilio fiscal del donador', (value) => {
      return value
    }),
  codigo_postal: yup.mixed()
    .test('required', 'Ingresa el código postal de teléfono del donador', (value) => {
      return value
    })
    .test('number', 'El código postal debe contener únicamente números', (value) => {
      return !isNaN(value)
    })
    .test('length', 'El código postal debe ser de 5 dígitos', (value) => {
      return value.length === 5
    }),
  regimen_fiscal: yup.mixed()
    .test('required', 'Selecciona un régimen fiscal', (value) => {
      return value
    }),
  id_estado: yup.mixed()
    .test('required', 'Selecciona un estado', (value) => {
      return value
    }),
  id_cfdi: yup.mixed()
    .test('required', 'Selecciona un cfdi', (value) => {
      return value
    })
  /* monto: yup.mixed()
    .test('required', 'Ingresa el monto de la donación', (value) => {
      return value && value.length
    })
    .test('number', 'El numero debe ser un número', (value) => {
      return !isNaN(value)
    })
    .test('positive', 'El numero debe ser positivo', (value) => {
      return value > 0
    }) */
})
