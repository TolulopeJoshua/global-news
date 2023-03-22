import React from 'react'
import Image from 'next/image'

import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { MdOutlineFeaturedPlayList } from 'react-icons/md'

import VCard from '../../components/VCard'

import bg1 from '../../public/images/bg1.jpg'
import bg2 from '../../public/images/bg2.jpg'
import bg3 from '../../public/images/bg3.jpg'

export default () => {
  return (
    <main className='overflow-x-clip'>
        <section className='w-full'>
          <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
        </section>
        <section className='px-[3%] w-full relative py-16 flex flex-col bg-gray-700 text-gray-300'>
          <div className='w-full flex flex-col items-center gap-3 p-4'>
            <span className='text-5xl'><MdOutlineFeaturedPlayList /></span>
            <div className='flex gap-6 items-center'>
              <hr className='w-28' />
              <h3 className='text-white text-4xl font-bold'>Top Picks</h3>
              <hr className='w-28' />
            </div>
            <span className='text-lg'>A selection of feature Videos</span>
          </div>
          <div className='flex flex-wrap'>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
          </div>
        </section>
        <section className='px-[3%] w-full relative py-16 flex flex-col text-gray-500'>
          <div className='w-full flex flex-col items-center gap-3 p-4'>
            <span className='text-5xl'><MdOutlineFeaturedPlayList /></span>
            <div className='flex gap-6 items-center'>
              <hr className='w-28' />
              <h3 className='text-gray-700 text-4xl font-bold'>Top Picks</h3>
              <hr className='w-28' />
            </div>
            <span className='text-lg'>A selection of feature Videos</span>
          </div>
          <div className='flex flex-wrap'>
            <div className='w-full md:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full md:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
          </div>
        </section>
        <section className='px-[3%] w-full relative py-16 flex flex-col bg-gray-700 text-gray-300'>
          <div className='w-full flex flex-col items-center gap-3 p-4'>
            <span className='text-5xl'><MdOutlineFeaturedPlayList /></span>
            <div className='flex gap-6 items-center'>
              <hr className='w-28' />
              <h3 className='text-white text-4xl font-bold'>Top Picks</h3>
              <hr className='w-28' />
            </div>
            <span className='text-lg'>A selection of feature Videos</span>
          </div>
          <div className='flex flex-wrap'>
            <div className='w-full p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 p-4'>
              <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
          </div>
        </section>
        <section className='px-[3%] h-fit w-full relative my-8 py-6 flex flex-col overflow-y-clip'>
          <Image className='absolute -z-10 scale-110' src={bg1} layout='fill' objectFit='cover' quality={100} alt='background' />
          <div className='relative text-gray-200 text-5xl'>
            <strong>REEL</strong>
            <button className='absolute right-0 px-3 hover:bg-gray-400 bg-gray-300 text-gray-100 hover:text-gray-200 rounded-full'><HiOutlineArrowNarrowRight /></button>
          </div>
          <span className='py-2 text-white'>Trending videos from around the web</span>
          <div className='flex flex-col sm:flex-row gap-4 py-2'>
            <VCard title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            <VCard title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            <VCard title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
          </div>
        </section>
        <section className='px-[3%] h-fit w-full relative my-8 py-6 flex flex-col overflow-y-clip'>
          <Image className='absolute -z-10 scale-110' src={bg2} layout='fill' objectFit='cover' quality={100} alt='background' />
          <div className='relative text-gray-200 text-5xl'>
            <strong>REEL</strong>
            <button className='absolute right-0 px-3 hover:bg-gray-400 bg-gray-300 text-gray-100 hover:text-gray-200 rounded-full'><HiOutlineArrowNarrowRight /></button>
          </div>
          <span className='py-2 text-white'>Trending videos from around the web</span>
          <div className='flex flex-col sm:flex-row gap-4 py-2'>
            <VCard title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            <VCard title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            <VCard title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
          </div>
        </section>
        <section className='px-[3%] h-fit w-full relative my-8 py-6 flex flex-col overflow-y-clip'>
          <Image className='absolute -z-10 scale-110' src={bg3} layout='fill' objectFit='cover' quality={100} alt='background' />
          <div className='relative text-gray-200 text-5xl'>
            <strong>REEL</strong>
            <button className='absolute right-0 px-3 hover:bg-gray-400 bg-gray-300 text-gray-100 hover:text-gray-200 rounded-full'><HiOutlineArrowNarrowRight /></button>
          </div>
          <span className='py-2 text-white'>Trending videos from around the web</span>
          <div className='flex flex-col sm:flex-row gap-4 py-2'>
            <VCard title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            <VCard title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            <VCard title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
          </div>
        </section>
    </main>
  )
}
