import M from 'materialize-css'
import { useEffect, useRef } from 'react'

export const MaterialBox = ({ element, keyValue }) => {
  const refMaterialBox = useRef()
  useEffect(() => {
    M.Materialbox.init(refMaterialBox.current)
  }, [])

  return (
    <>
      {
        keyValue
          ? (<img ref={refMaterialBox} src={element[keyValue]} className='materialboxed img-responsive z-depth-4' alt='' />)
          : (
            <img ref={refMaterialBox} src={element} className='materialboxed img-responsive z-depth-4' alt='' />)
      }
    </>
  )
}
