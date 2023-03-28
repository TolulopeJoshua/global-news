import React from 'react'

export default ({type=0, message=''}) => {
  return (
    <div className={`${type ? 'w-full aspect-video':'w-100 h-[80vh]'} p-[6%] text-5xl text-gray-200 bg-white font-sans font-semibold flex items-center justify-center`}>
        {
          message ? 
          <span>{message}</span>:
          type ?
          <span>Resource not found</span>:
          <span>No data available</span>
        }
    </div>
  )
}
