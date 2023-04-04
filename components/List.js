import Link from 'next/link';
import React from 'react'

export default ({list, title, live=0}) => {

    const popup = (url) => {
        if (live) {
            let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=800,height=0,right=0,top=0`; 
            window.open(url, 'live', params)
        }
    }

  return (
    <div className='border-blue-700 border sm:border-0'>
        <h3 className='text-lg font-semibold text-white bg-blue-700 p-3 w-full flex items-center'>
            {live ? <span className='animate-pulse rounded-full bg-red-500 w-6 h-6 mr-3'></span>:''}
            <span>{title || 'Latest News'}</span>
        </h3>
        {
            list.map((art, index) => {
                const {title, author, authorImg, section, id, url} = art;
                return <Link onClick={() => popup(url)} href={live ? '#!' : `/${section}/${id}`} key={title + index} className={`flex sm:flex-col sm:justify-center lg:flex-row lg:justify-start p-8 w-full items-center gap-4 ${index % 2 == 0 ? 'bg-gray-100 sm:bg-gray-800 text-gray-500 hover:text-gray-400':'bg-white sm:bg-gray-700 text-gray-400 hover:text-gray-300'}`}>
                    <div className='rounded-full bg-blue-700 w-10 h-10 flex shrink-0 items-center justify-center pb-1 text-white font-serif text-2xl'><em>{authorImg || index+1}</em></div>
                    <div className=' flex flex-col'>
                        <span className={`${live ? 'text-lg':'text-xl'} font-semibold sm:text-center lg:text-start`}>{title?.replace(/.+\.[a-z]{2,3}\ \|\ /g, '')}</span>
                        { author ? <span className='font-semibold'>{author}</span> : ''}
                    </div>
                </Link>
            })
        }   
    </div>
  )
}
