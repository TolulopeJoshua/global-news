import Image from 'next/image'
import React from 'react'

export default ({title, desc='', size='text-base', cat='', img, inline=0, hide=1, light=0, right=0}) => {
  return (
    <div className={`flex ${right ? 'flex-row':'flex-col'} align-middle justify-center w-full h-full relative p-2`}>
        <Image src={img.src} width={300} height={150} alt={img.alt || title} className={`border-2 ${right? 'w-1/2 mr-3':'w-full'} aspect-video bg-slate-300 ${hide && 'hidden'} sm:inline-block`} />
        <div className={`flex flex-col bottom-5 left-5 text-left ${light && 'p-2 bg-white'} ${!hide && !right && 'absolute'} ${inline && 'sm:absolute'} ${hide && 'border-b-2 border-b-gray-200 sm:border-0 pb-2 sm:pb-0'}`}>
            <p className={`my-1 ${inline ? `${hide ? 'text-gray-600 sm:text-gray-300' : 'text-gray-300'}`: 'text-gray-600'} ${size}`}><strong>{title}</strong></p>
            <p className={`text-gray-500 hidden ${desc && 'sm:inline-block pb-2'}`}>{desc}</p>
            {
              cat &&
              <p className='text-sm mt-auto'>
                <span className=' text-blue-800 font-bold pr-1'>|</span>
                <span className=' text-gray-500'>{cat.toUpperCase()}</span>
            </p>
            }
        </div>
    </div>
  )
}
