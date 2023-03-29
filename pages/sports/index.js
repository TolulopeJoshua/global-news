import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'

import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import axios from 'axios'

import Loader from '../../components/Loader'
import Error from '../../components/Error'
// import Paginate from '../../components/Paginate'
import Card from '../../components/Card'
import VCard from '../../components/VCard'
import List from '../../components/List'

import bg1 from '../../public/images/bg1.jpg'
import bg2 from '../../public/images/bg2.jpg'
import bg3 from '../../public/images/bg3.jpg'

export default () => {
  const [data, setData] = useState(null);
  const [features, setFeatures] = useState([]);
  const [reel, setReel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vBg, setVBg] = useState(bg1)

  useEffect(() => {
    const url = `/api/data/sports`
    axios.get(url).then(res => {
      // console.log(res.data)
      setData(res.data.data);
      setFeatures(res.data.features);
      setReel(res.data.reel);
      setLoading(false);
    }).catch(err => setLoading(false))
      setVBg([bg1, bg2, bg3][Math.floor(Math.random() * 3)]);
    }, [])

    if (!data) {
      if (loading) return <Loader />
      return <Error />
    }

  return (
    <main className='overflow-x-clip'>
        <Head>
          <title>GIP News | Sports</title>
          <meta
            name="description"
            content="Latest and up to date sports news from around the world."
            key="desc"
          />
          <link rel="icon" href="/favicon.ico" />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5331978820452259"
            crossorigin="anonymous"></script>
        </Head>
        <section className='px-[3%] flex flex-col lg:flex-row flex-wrap max-h-[1000px] items-start py-4'>
            <div className='w-full sm:hidden'>
                <Card news={data[0]} title={'Title 1'} desc={'description 1'} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='hidden sm:flex sm:w-1/2 lg:w-5/12'>
                <Card news={data[0]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 sm:order-last lg:order-none lg:w-1/3 p-2'>
              <List list={data.filter(article => !article.image_url).slice(0,4)} title='Sports Stories' />
            </div>
            <div className='w-full sm:w-1/2 lg:w-1/4 aspect-square bg-gray-50 p-2'>
                AD
            </div>
        </section>
        <section className='px-[3%] flex flex-wrap py-4'>
          <div className='flex items-start w-full'>
            {/* constains the same cards */}
            <div className='flex flex-col items-start w-full sm:hidden'>
              {
                data.slice(1,4).map(article => (
                  <Card key={article.title} news={article} title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                ))
              }
              {/* <Card title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              <Card title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              <Card title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} /> */}
            </div>
            {/* as this! */}
            <div className='hidden sm:flex items-start w-full lg:w-3/4'>
              {
                data.slice(1,4).map(article => (
                  <Card key={article.title} news={article} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              ))
              }
              {/* <Card title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              <Card title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              <Card title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} /> */}
            </div>
            <div className='hidden lg:flex w-1/4'>
              <Card news={data[4]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
          </div>
        </section>
        <section className='px-[3%] flex flex-col lg:flex-row flex-wrap max-h-[1000px] items-start py-4'>
            <div className='w-full sm:hidden'>
                <Card news={data[5]} title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='hidden sm:flex sm:w-1/2 lg:w-5/12'>
                <Card news={data[5]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 sm:order-last lg:order-none lg:w-1/3 p-2'>
              <List list={data.filter(article => !article.image_url).slice(4,8)} title='More Stories' />
            </div>
        </section>
        <section className='px-[3%] flex flex-wrap items-start py-4'>
            <div className='hidden md:flex md:w-1/2 xl:w-2/5'>
              <Card news={data[6]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full md:hidden'>
              <Card news={data[6]} title={'Title 1'} desc={'description 1'} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
              <Card news={data[7]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
              <Card news={data[8]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
              <Card news={data[9]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5 xl:ml-auto'>
              <Card news={data[10]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
              <Card news={data[11]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
              <Card news={data[12]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
        </section>
        <section className='px-[3%] flex flex-wrap py-4'>
          <div className='flex items-start w-full'>
            {/* constains the same cards */}
            <div className='flex flex-col w-full sm:hidden'>
              {
                data.slice(13,16).map(article => (
                  <Card key={article.title} news={article} title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                ))
              }
            </div>
            {/* as this! */}
            <div className='hidden sm:flex w-full lg:w-3/4'>
              {
                data.slice(13,16).map(article => (
                  <Card key={article.title} news={article} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                ))
              }
            </div>
            <div className='hidden lg:flex w-1/4'>
              AD
            </div>
          </div>
        </section>
        <section className='px-[3%] flex flex-wrap items-start py-4'>
            <div className='hidden md:flex md:w-1/2 xl:w-2/5'>
              <Card news={data[16]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full md:hidden'>
              <Card news={data[16]} title={'Title 1'} desc={'description 1'} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
              <Card news={data[17]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
              <Card news={data[18]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
              <Card news={data[19]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5 xl:ml-auto'>
              <Card news={data[20]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
              <Card news={data[21]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
              <Card news={data[22]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
        </section>
        <section className='px-[3%] flex flex-wrap py-4'>
            <div className='flex align-center px-2 gap-1'>
                <span className='text-xl font-extrabold text-blue-800'>|</span>
                <span className='font-bold text-2xl text-gray-600'>Features</span>
            </div>
          <div className='flex items-start w-full'>
            {/* constains the same cards */}
            <div className='flex flex-col w-full sm:hidden'>
              {
                data.slice(23,26).map(article => (
                  <Card key={article.title} news={article} title={'Title 1'} desc={'description 1'} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                ))
              }
            </div>
            {/* as this! */}
            <div className='hidden sm:flex w-full lg:w-3/4'>
              {
                data.slice(23,26).map(article => (
                  <Card key={article.title} news={article} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                ))
              }
            </div>
            <div className='hidden lg:flex w-1/4'>
              <Card news={data[26]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
          </div>
        </section>
        <section className='px-[3%] py-4'>
            <div className='flex align-center px-2 gap-1'>
                <span className='text-xl font-extrabold text-blue-800'>|</span>
                <span className='font-bold text-2xl text-gray-600'>Around the World</span>
            </div>
            <div className='flex flex-wrap items-start py-4'>
              <div className='hidden md:flex md:w-1/2 xl:w-2/5'>
                <Card news={features[0]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              </div>
              <div className='w-full md:hidden'>
                <Card news={features[0]} title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              </div>
              <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
                <Card news={features[1]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              </div>
              <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
                <Card news={features[2]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              </div>
              <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
                <Card news={features[3]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              </div>
              <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5 xl:ml-auto'>
                <Card news={features[4]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              </div>
              <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
                <Card news={features[5]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              </div>
              <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
                <Card news={features[6]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              </div>
            </div>
        </section>
        <section className='px-[3%] h-fit w-full relative my-8 py-6 flex flex-col overflow-y-clip'>
            <Image className='absolute -z-10 scale-110' src={vBg} layout='fill' objectFit='cover' quality={100} alt='background' />
            <div className='relative text-gray-200 text-5xl'>
              <strong>REEL</strong>
              <button className='absolute right-0 px-3 hover:bg-gray-400 bg-gray-300 text-gray-100 hover:text-gray-200 rounded-full'><HiOutlineArrowNarrowRight /></button>
            </div>
            <span className='py-2 text-white'>Trending videos from around the web</span>
            <div className='flex flex-col sm:flex-row gap-4 py-2'>
              {
                reel.slice(0,3).map(vid => (
                  <VCard key={vid.title} video={vid} title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                ))
              }
              {/* <VCard title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              <VCard title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              <VCard title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} /> */}
            </div>
        </section>
    </main> 
  )
}
