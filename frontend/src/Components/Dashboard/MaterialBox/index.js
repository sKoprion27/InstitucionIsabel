import M from 'materialize-css'
import { useEffect, useRef } from 'react'
import noImage from '../../../img/no_image.png'
import './style.scss'

export const MaterialBox = ({ element, keyValue }) => {
  const refMaterialBox = useRef()
  useEffect(() => {
    M.Materialbox.init(refMaterialBox.current)
  }, [])

  return (
    <div className='img-container'>
      {
        keyValue
          ? (<img ref={refMaterialBox} src={element[keyValue] || noImage} className='materialboxed img-responsive z-depth-4' alt='' />)
          : (
            <img ref={refMaterialBox} src={element || noImage} className='materialboxed img-responsive z-depth-4' alt='Foto donación' />)
      }
    </div>
  )
}
