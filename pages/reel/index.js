import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'

import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { MdOutlineFeaturedPlayList } from 'react-icons/md'
import { AiOutlineClockCircle } from 'react-icons/ai'

import axios from 'axios'

import VCard from '../../components/VCard'
import Loader from '../../components/Loader'
import Error from '../../components/Error'

import bg1 from '../../public/images/bg1.jpg'
import bg2 from '../../public/images/bg2.jpg'
import bg3 from '../../public/images/bg3.jpg'
import Head from 'next/head'
import Ads from '../../components/Ads'

import adConstants from '../../utils/adConstants'

export default ({data}) => {
  
  // let { data, loading } = useSelector(({data}) => data);
  // data = data?.reel;
  
  if (!data) {
    // if (loading) return <Loader />
    return <Error />
  }

  return (
    <main className='overflow-x-clip'>
        <Head>
          <title>GIP News | Reel</title>
          <meta
            name="description"
            content="Latest news videos."
            key="desc"
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel='canonical' href={`https://gipnews.vercel.app/reel`} />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5331978820452259"
            crossorigin="anonymous"></script>
        </Head>
        <section className='w-full aspect-video'>
        <iframe className='w-full h-full' src={`//www.youtube.com/embed/${data[0].id}?mute=1&autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          {/* <VCard title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} /> */}
        </section>
        <section className='px-[3%] w-full relative py-16 flex flex-col bg-gray-700 text-gray-300'>
          <div className='w-full flex flex-col items-center gap-3 p-4'>
            <span className='text-5xl'><AiOutlineClockCircle /></span>
            <div className='flex gap-6 items-center'>
              <hr className='w-28' />
              <h3 className='text-white text-4xl font-bold'>Latest</h3>
              <hr className='w-28' />
            </div>
            <span className='text-lg'>Latest News videos</span>
          </div>
          <div className='flex flex-wrap'>
            {
              data.slice(1,9).map(vid => (
                <div key={vid.id} className='w-full sm:w-1/2 p-4'>
                  <VCard video={vid} title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
              ))
            }
          </div>
        </section>
        <section className='px-[3%] w-full relative py-16 flex flex-col text-gray-500'>
          <div className='w-full flex flex-col items-center gap-3 p-4'>
            <span className='text-5xl'><MdOutlineFeaturedPlayList /></span>
            <div className='flex gap-6 items-center'>
              <hr className='w-28' />
              <h3 className='text-gray-700 text-4xl font-bold text-center'>Top Picks</h3>
              <hr className='w-28' />
            </div>
            <span className='text-lg'>A selection of feature Videos</span>
          </div>
          <div className='flex flex-wrap'>
            <div className='w-full md:w-1/2 p-4'>
              <VCard video={data[9]} title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full md:w-1/2 p-4'>
              <VCard video={data[10]} title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            {
              data.slice(11,17).map(vid => (
                <div key={vid.id} className='w-full sm:w-1/2 p-4'>
                  <VCard video={vid} title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
              ))
            }
          </div>
        </section>
        <section className='px-[3%] w-full relative py-16 flex flex-col bg-gray-700 text-gray-300'>
          <div className='w-full flex flex-col items-center gap-3 p-4'>
            <span className='text-5xl'><MdOutlineFeaturedPlayList /></span>
            <div className='flex gap-6 items-center'>
              <hr className='w-28' />
              <h3 className='text-white text-4xl font-bold'>Trending</h3>
              <hr className='w-28' />
            </div>
            {/* <span className='text-lg'>A selection of feature Videos</span> */}
          </div>
          <div className='flex flex-wrap'>
            <div className='w-full p-4'>
              <VCard video={data[17]} title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            {
              data.slice(18,28).map(vid =>(
                <div key={vid.id} className='w-full sm:w-1/2 p-4'>
                  <VCard video={vid} title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
              ))
            }
          </div>
        </section>
        <section className='px-[3%] h-fit w-full relative my-8 py-6 flex flex-col overflow-y-clip'>
          <Image className='absolute -z-10 scale-110' src={bg1} layout='fill' objectFit='cover' quality={100} alt='background' />
          {/* <div className='relative text-gray-200 text-5xl'>
            <strong>REEL</strong>
            <button className='absolute right-0 px-3 hover:bg-gray-400 bg-gray-300 text-gray-100 hover:text-gray-200 rounded-full'><HiOutlineArrowNarrowRight /></button>
          </div>
          <span className='py-2 text-white'>Trending videos from around the web</span> */}
            <div className='flex flex-col sm:grid sm:grid-cols-3 gap-4 py-2'>
            {
              data.slice(28,31).map(vid =>(
                <VCard video={vid} title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              ))
            }
          </div>
        </section>
        <section className='px-[3%] h-fit w-full relative my-8 py-6 flex flex-col overflow-y-clip'>
          <Image className='absolute -z-10 scale-110' src={bg2} layout='fill' objectFit='cover' quality={100} alt='background' />
            <div className='flex flex-col sm:grid sm:grid-cols-3 gap-4 py-2'>
            {
              data.slice(31,34).map(vid =>(
                <VCard video={vid} title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              ))
            }
          </div>
        </section>
        <section className='px-[3%] h-fit w-full relative my-8 py-6 flex flex-col overflow-y-clip'>
          <Image className='absolute -z-10 scale-110' src={bg3} layout='fill' objectFit='cover' quality={100} alt='background' />
            <div className='flex flex-col sm:grid sm:grid-cols-3 gap-4 py-2'>
            {
              data.slice(34,37).map(vid =>(
                <VCard video={vid} title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              ))
            }
          </div>
        </section>
        <section className='px-[3%] h-fit w-full relative my-8 py-6 flex flex-col overflow-y-clip'>
          <Ads dataAdSlot={adConstants.horizontal} />
        </section>
    </main>
  )
}

export async function getServerSideProps({params}) {
  let {data: dat} = await axios.get(`https://godinprints.org/api/gipnews/reel`)
  let {data} = dat;
  return {
    props: {
      data,
    },
    // revalidate: 600,
  }
}
