import { useEffect } from 'react'
import ReactDOM from 'react-dom'

// Forma elegante
export const Portal = ({ children }) => {
  const nodeHtml = document.createElement('div')
  useEffect(() => {
    document.body.appendChild(nodeHtml)
    return () => {
      nodeHtml.remove()
    }
  }, [nodeHtml])
  return <>{ReactDOM.createPortal(children, nodeHtml)}</>
}
