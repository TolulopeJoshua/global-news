import React from 'react'

export default () => {
  return (
    <footer className="flex flex-col px-[3%] p-6 gap-6 w-full text-gray-600 bg-gray-100">
      <strong className='text-xl'>GIP News</strong>
      <div className='flex flex-wrap w-full justify-start gap-x-4 font-semibold border-b pb-4'>
        <span className='flex min-w-[150px] border-r border-gray-400'>sect</span>
        <span className='flex min-w-[150px] border-r border-gray-400'>sect</span>
        <span className='flex min-w-[150px] border-r border-gray-400'>sect</span>
        <span className='flex min-w-[150px] border-r border-gray-400'>sect</span>
        <span className='flex min-w-[150px] border-r border-gray-400'>sect</span>
        <span className='flex min-w-[150px] border-r border-gray-400'>sect</span>
        <span className='flex min-w-[150px] border-r border-gray-400'>sect</span>
        <span className='flex min-w-[150px] border-r border-gray-400'>sect</span>
        <span className='flex min-w-[150px] border-r border-gray-400'>sect</span>
        <span className='flex min-w-[150px] border-r border-gray-400'>sect</span>
        <span className='flex min-w-[150px] border-r border-gray-400'>sect</span>
        <span className='flex min-w-[150px] border-r border-gray-400'>sect</span>
      </div>
      <strong className='text-sm'>&copy; {(new Date()).getFullYear()} GIP Libraries</strong>
    </footer>
  )
}
