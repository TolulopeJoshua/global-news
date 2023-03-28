import Link from 'next/link';
import React from 'react'

export default ({list, title}) => {
  return (
    <div className='border-blue-700 border sm:border-0'>
        <h3 className='text-lg font-semibold text-white bg-blue-700 p-2 w-full'>{title || 'Latest News'}</h3>
        {
            list.map((art, index) => {
                const {title, author, authorImg, section, id} = art;
                return <Link href={`/${section}/${id}`} key={art.title + index} className={`flex sm:flex-col sm:justify-center lg:flex-row lg:justify-start p-8 w-full items-center gap-4 ${index % 2 == 0 ? 'bg-gray-100 sm:bg-gray-600 text-gray-400 hover:text-gray-300':'bg-white sm:bg-gray-700 text-gray-400 hover:text-gray-300'}`}>
                    <div className='rounded-full bg-blue-700 w-10 h-10 flex items-center justify-center pb-1 text-white font-serif text-2xl'><em>{authorImg || index+1}</em></div>
                    <div className=' flex flex-col'>
                        <span className='text-xl font-semibold sm:text-center lg:text-start'>{title}</span>
                        { author ? <span className='font-semibold'>{author}</span> : ''}
                    </div>
                </Link>
            })
        }   
    </div>
  )
}
