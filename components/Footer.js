import Link from 'next/link'
import React from 'react'

import sections from '../utils/sections'

export default () => {
  return (
    <footer className="flex flex-col px-[3%] p-6 gap-6 w-full text-gray-600 bg-gray-100">
      <Link href={'/'}><strong className='text-xl'>GIP News</strong></Link>
      <div className='flex flex-wrap w-full justify-start font-semibold border-b pb-4'>
        {
          sections.map(section => (
            <Link key={section} href={`/${section}`} className='flex w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-[12.5%] border-r border-gray-400 hover:underline py-2 pl-4'>
              {section.includes('science') ? 'Sci/Tech' : section[0].toUpperCase() + section.slice(1)}
            </Link>
          ))
        }
      </div>
      <strong className='text-sm'>&copy; {(new Date()).getFullYear()} <Link href={'https://godinprints.org'} target={'_blank'} className='underline'>GIP Libraries</Link></strong>
    </footer>
  )
}
