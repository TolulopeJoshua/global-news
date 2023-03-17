import Image from 'next/image'
import React from 'react'

export default ({img, title}) => {
  return (
    <div className='flex flex-col w-full'>
        <Image src={img.src} width={300} height={150} alt={img.alt || title} className={`border-2 w-full aspect-video bg-slate-300`}  />
        <span className='text-gray-600 font-semibold text-lg p-2 bg-white'>{title}</span>
    </div>
  )
}
