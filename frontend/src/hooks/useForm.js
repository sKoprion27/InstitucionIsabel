import { useState } from 'react'

export const useForm = (values) => {
  const [form, setForm] = useState(values)

  const handlerChange = (e) => {
    setForm(() => {
      return {
        ...form,
        [e.target.name]:
          e.target.name === 'select'
            ? Number(e.target.value)
            : e.target.value
      }
    })
  }

  return [form, setForm, handlerChange]
}
