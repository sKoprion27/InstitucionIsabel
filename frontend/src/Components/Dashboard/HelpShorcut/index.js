import React from 'react'
import { Link } from 'react-router-dom'

export const HelpShorcut = ({ path, text, differentPage = null }) => {
  return (
    <div className='input-field'>
      <div className='help-shorcut'>
        <Link
          className='teal-text'
          target={`${differentPage ? '_blank' : ''}`} to={`/dashboard/${path}`}
        >
          {text}
        </Link>
      </div>
    </div>
  )
}
