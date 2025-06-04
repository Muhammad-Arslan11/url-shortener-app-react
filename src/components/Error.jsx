import React from 'react'

function Error({message}) {
  return (
    <>
     <div><span className='text-sm text-red-400'>{message}</span></div>
    </>
  )
}

export default Error