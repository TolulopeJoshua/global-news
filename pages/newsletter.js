import React from 'react'

import { MdOutlineBlindsClosed, MdOutlineClose, MdOutlineViewDay, MdOutlineViewWeek } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';
import { GiCheckMark } from 'react-icons/gi'

export default () => {
  return (
    <main className='flex flex-col w-full justify-center items-center p-24  bg-blue-50'>
        <div className='border rounded-lg'>
            <h1 className='text-2xl font-semibold p-8 text-center'>Subscribe to Newletters</h1>
            <p className='flex relative items-center justify-center border-t text-xl font-semibold text-green-400 py-8 cursor-pointer hover:bg-blue-100 transition-opacity'>
              <span className='pr-4'><MdOutlineViewDay /></span>
              <span>Daily</span>
              <span className='absolute right-2 top-2'><GiCheckMark /></span>
            </p>
            <p className='flex relative items-center justify-center border-t text-xl font-semibold text-blue-400 py-8 cursor-pointer hover:bg-blue-100 transition-opacity'>
              <span className='pr-4'><MdOutlineViewWeek /></span>
              <span>Weekly</span>
              <span className='absolute right-2 top-2'><GiCheckMark /></span>
            </p>
            <p className='flex relative items-center justify-center border-t text-xl font-semibold text-orange-400 py-8 cursor-pointer hover:bg-blue-100 transition-opacity'>
              <span className='pr-4'><MdOutlineBlindsClosed /></span>
              <span>Opt-out</span>
              <span className='absolute right-2 top-2'><MdOutlineClose /></span>
            </p>
        </div>
        <p className='flex items-center pt-8'><span className='pr-4'><BsInfoCircle /></span><small>Get daily/weely headlines directly in your mail box!</small></p>
    </main>
  )
}
