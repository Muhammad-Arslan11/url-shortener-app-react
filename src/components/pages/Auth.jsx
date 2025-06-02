import React from 'react'
import { useSearchParams } from 'react-router-dom'

function auth() {
  const [searchParams] = useSearchParams();

  return (
    <div className='mt-36 flex flex-col items-center gap-10'>
      <h1 className='text-5xl font-extrabold'>Login / SignUp</h1>
      {searchParams.get("createNew") ? "Hold up! Login first..." : "Login / SignUp"}
    </div>
  )
}

export default auth