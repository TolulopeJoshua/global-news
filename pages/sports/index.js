import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Script from 'next/script'

import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import axios from 'axios'

import Loader from '../../components/Loader'
import Error from '../../components/Error'
// import Paginate from '../../components/Paginate'
import Card from '../../components/Card'
import VCard from '../../components/VCard'
import List from '../../components/List'
import Ads from '../../components/Ads'

import adConstants from '../../utils/adConstants'

import bg1 from '../../public/images/bg1.jpg'
import bg2 from '../../public/images/bg2.jpg'
import bg3 from '../../public/images/bg3.jpg'
import { useSelector } from 'react-redux'

export default ({data, features, reel}) => {
  const [live, setLive] = useState([]);
  const [vBg, setVBg] = useState(bg1)

  // const dataObject = useSelector(({data}) => data);
  // const sortByImage = (a,b) => ((a.image_url && !b.image_url) ? -1 : (b.image_url && !a.image_url) ? 1 : 0);
  
  // let data = null, features = [], reel = [], { loading } = dataObject;
  // const section = 'sports';
  // for (let sect in dataObject.data) {
  //   const sectData = [...dataObject.data[sect]].sort(sortByImage);
  //   if (sect == section.split(',')[0]) {
  //     data = sectData;
  //   } else  {
  //     if (sect == 'reel') (reel = sectData.slice(1));
  //     features.push(sectData[0]);
  //   } 
  // }
  useEffect(() => {
    axios.get('/api/live').then(({data}) => {
      setLive(data) //.sort((a,b) => (Math.abs((new Date() - new Date(a.date))) - Math.abs((new Date() - new Date(b.date))))));
    })
    setVBg([bg1, bg2, bg3][Math.floor(Math.random() * 3)]);
  }, [])

  // if (!data) {
  //   // if (loading) return <Loader />
  //   return <Error />
  // }

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
          <link rel='canonical' href={`https://gipnews.vercel.app/sports`} />
        </Head>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5331978820452259"
          crossorigin="anonymous" />
        <div><Ads dataAdSlot={adConstants.horizontal} /></div>
        <section className='px-[3%] flex flex-col lg:flex-row flex-wrap max-h-[1500px] items-start py-4'>
            <div className='w-full sm:hidden'>
                <Card news={data[0]} title={'Title 1'} desc={'description 1'} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='hidden sm:flex sm:w-1/2 lg:w-5/12'>
                <Card news={data[0]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-1/2 sm:order-last lg:order-none lg:w-1/3 p-2'>
              <List list={live.slice(0,6)} title='Football Highlights' live={1} />
            </div>
            <div className='w-full sm:w-1/2 lg:w-1/4 aspect-square p-2'>
                <Ads dataAdSlot={adConstants.square} />
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
            </div>
            {/* as this! */}
            <div className='hidden sm:flex items-start w-full lg:w-3/4'>
              {
                data.slice(1,4).map(article => (
                  <Card key={article.title} news={article} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              ))
              }
            </div>
            <div className='hidden lg:flex w-1/4'>
              <Card news={data[4]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
          </div>
        </section>
        <section className='px-[3%] flex flex-col lg:flex-row flex-wrap max-h-[1500px] items-start py-4'>
            <div className='w-full sm:hidden'>
                <Card news={data[5]} title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='hidden sm:flex sm:w-1/2 lg:w-5/12'>
                <Card news={data[5]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full h-max sm:w-1/2 sm:order-last lg:order-none lg:w-1/3 p-2'>
              <List list={live.slice(6,12)} title='Football Highlights' live={1} />
            </div>
            <div className='w-full aspect-square sm:w-1/2 lg:w-3/12 p-2'><Ads dataAdSlot={adConstants.square} /></div>
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
            <div className='hidden lg:block w-1/4 p-2'>
              <Ads dataAdSlot={adConstants.square}/>
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
                data.slice(23,25).map(article => (
                  <Card key={article.title} news={article} title={'Title 1'} desc={'description 1'} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                ))
              }
              <div className='w-full p-2'><Ads dataAdSlot={adConstants.square} /></div>
            </div>
            {/* as this! */}
            <div className='hidden sm:flex w-full lg:w-3/4'>
              {
                data.slice(23,25).map(article => (
                  <Card key={article.title} news={article} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                ))
              }
              <div className='w-full p-2'><Ads dataAdSlot={adConstants.square} /></div>
            </div>
            <div className='hidden lg:flex w-1/4'>
              <Card news={data[25]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
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
            <div className='flex flex-col sm:grid sm:grid-cols-3 gap-4 py-2'>
              {
                reel.slice(0,3).map(vid => (
                  <VCard key={vid.title} video={vid} title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                ))
              }
            </div>
        </section>
        <section className='px-[3%] mb-8'>
          <Ads dataAdSlot={adConstants.horizontal} />
        </section>
    </main> 
  )
}

export async function getServerSideProps({params}) {
  let {data: dat} = await axios.get(`https://godinprints.org/api/gipnews/sports`)
  let {data, features, reel} = dat;
  return {
    props: {
      data, features, reel
    },
    // revalidate: 600,
  }
}