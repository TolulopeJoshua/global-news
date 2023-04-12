import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default ({news={}, title='', desc='', size='text-base', cat='', img={}, inline=0, hide=1, light=0, right=0}) => {
  return (
    <a href={`/${news.section}/${news.id}?title=${news.title?.replace(/[\ \/\?\:\;\,\.\|]/g, '-')}`} className={`flex ${right ? 'flex-row':'flex-col'} align-middle justify-center w-full h-full block relative p-2 group`}>
        <div className={`${right ? 'w-1/2 mr-3 mt-2':'bg-gray-800 w-full'}`}>
        <img onError={e => (e.currentTarget.style.backgroundColor = 'rgb(75 85 99)')} src={news.image_url || img.src} width={300} height={150} alt={news.title || title} className={`border-2 w-full aspect-video opacity-80 ${!right && 'group-hover:opacity-30'} transition-opacity bg-slate-300 text-gray-600 ${hide && 'hidden'} sm:inline-block`} />
        </div>
        <div className={`flex flex-col bottom-5 left-5 text-left ${right && 'w-1/2 sm:pb-6'} ${light && 'p-2 bg-white'} ${!hide && !right && 'absolute'} ${inline && 'sm:absolute'} ${hide && 'border-b-2 border-b-gray-200 sm:border-0 pb-2 pr-4 sm:pb-0'}`}>
            <p className={`my-1 pr-2 ${inline ? `${hide ? 'text-gray-400 sm:text-gray-400' : 'text-gray-400'}`: 'text-gray-400'} ${size}`}><strong>{news.title?.replace(/.+\.[a-z]{2,3}\ \|\ /g, '') || title}</strong></p>
            <p className={`text-gray-400 text-sm font-[cursive] hidden ${desc && 'sm:inline-block pb-2'}`}>{news.description?.split(' ').slice(0,14).join(' ') || desc}</p>
            {
              cat &&
              <p className='text-sm mt-auto'>
                <span className=' text-blue-800 font-bold pr-1'>|</span>
                <a href={`/${news.section}`} className=' text-gray-300 hover:underline'>{news.section?.toUpperCase() || cat.toUpperCase()}</a>
              </p>
            }
        </div>
    </a>
  )
}
