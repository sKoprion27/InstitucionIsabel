
export const validateSchema = async (schema, data) => {
  try {
    const user = await schema.validateAsync(data, {
      abortEarly: false,
      errors: {
        wrap: {
          label: false
        },
        stack: true
      },
      externals: false
    })
    return {
      user: user,
      err: null
    }
  } catch (err) {
    const errors = err.details.map(err => ({ type: err.message }))
    return {
      user: null,
      err: errors
    }
  }
}
