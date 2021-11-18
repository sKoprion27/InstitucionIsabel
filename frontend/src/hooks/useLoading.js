import { useState } from 'react'

export const useLoading = () => {
  const [loading, setLoading] = useState(false)

  const Spinner = () => {
    return (
      <div className='progress'>
        <div className='indeterminate' />
      </div>
    )
  }
  const initLoading = () => {
    setLoading(true)
  }

  const endLoading = () => {
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }

  return {
    loading,
    initLoading,
    endLoading,
    Spinner
  }
}
