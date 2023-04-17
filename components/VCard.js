import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { BsPlayCircleFill } from 'react-icons/bs'

export default ({video={}, img, title, type=0, cat=''}) => {
  return (
    <a href={`/reel/${video.id}?title=${video.title?.replace(/[\ \/\?\:\;\,\.\|]/g, '-')}`} className='group flex flex-col w-full h-auto relative bg-gray-800'>
        <Image src={video.image_url || img.src} width={300} height={150} alt={video.title || title} className={`border-2 w-full aspect-video bg-slate-300 opacity-70 group-hover:opacity-30 transition-opacity`}  />
        <div className={`font-semibold flex flex-col p-3 gap-2 w-auto ${type ? 'absolute bottom-0 left-0 text-gray-300':'text-gray-600 bg-white h-full'}`}>
          {/* {cat ? <span className='text-sm'>{cat}</span> : ''} */}
          <span className={type ? 'text-base lg:text-xl overflow-clip':'text-xl overflow-clip'}>{video.title || title}</span>
          {type ? <span className='flex items-center'><span className='pr-2 text-xl text-blue-600'><BsPlayCircleFill /></span><span>Watch now</span></span> : ''}
        </div>
    </a>
  )
}
