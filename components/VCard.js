import Image from 'next/image'
import React from 'react'

import { BsPlayCircleFill } from 'react-icons/bs'

export default ({img, title, type=0, cat=''}) => {
  return (
    <div className='flex flex-col w-full relative'>
        <Image src={img.src} width={300} height={150} alt={img.alt || title} className={`border-2 w-full aspect-video bg-slate-300`}  />
        <div className={`font-semibold flex flex-col p-3 gap-2 ${type ? 'absolute bottom-0 left-0 text-gray-300':'text-gray-600 bg-white'}`}>
          {cat ? <span className='text-sm'>{cat}</span> : ''}
          <span className='text-xl '>{title}</span>
          {type ? <span className='flex items-center'><span className='pr-2 text-xl text-blue-600'><BsPlayCircleFill /></span><span>Watch now</span></span> : ''}
        </div>
    </div>
  )
}
