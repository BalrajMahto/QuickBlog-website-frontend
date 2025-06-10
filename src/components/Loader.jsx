import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-white fixed top-0 left-0 z-50'>
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-lg"></div>
    </div>
  )
}

export default Loader