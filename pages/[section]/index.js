import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'

import Card from '../../components/Card'
import Loader from '../../components/Loader'
import Error from '../../components/Error'
import Paginate from '../../components/Paginate'
import Head from 'next/head'

export default () => {
  const router = useRouter()
  const { section, page=1 } = router.query
  const [data, setData] = useState(null);
  const [features, setFeatures] = useState([]);
  const [reel, setReel] = useState([]);
  const [loading, setLoading] = useState(true);

  const list = useRef(null)
  const listData = data?.slice(((page - 1) * 20 + 16), (page * 20 + 16)) || [];

  useEffect(() => {
    list.current?.scrollIntoView();
  }, [page])

  useEffect(() => {
    if (section) {
      const url = `/api/data/${section}`
      axios.get(url).then(res => {
        console.log(res.data)
        setData(res.data.data);
        setFeatures(res.data.features);
        setReel(res.data.reel);
        setLoading(false);
      }).catch(err => setLoading(false))
    }
  }, [section])

  if (!data) {
    if (loading) return <Loader />
    return <Error />
  }

  return (
    <main>
        <Head>
          <title>GIP News | {section[0].toUpperCase() + section.slice(1)}</title>
          <meta
            name="description"
            content="Breaking news, latest news, around the world."
            key="desc"
          />
          <link rel="icon" href="/favicon.ico" />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5331978820452259"
            crossorigin="anonymous"></script>
        </Head>
        <section className='px-[3%] flex flex-wrap justify-center py-4'>
            <div className='w-full h-max sm:w-1/2 lg:w-2/3 xl:w-3/4'>   
                <div className='flex flex-wrap w-full pb-4 items-start'>
                    <div className='w-full sm:w-full lg:w-2/3'>
                        <Card news={data[0]} title={'Title 1'} hide={0} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                    </div>
                    <div className='hidden lg:flex lg:w-1/3'>
                        <Card news={data[1]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                    </div>
                </div>
                <div className='flex flex-wrap items-start w-full pb-4'>
                  {
                    data.slice(2,8).map(article => (
                      <div key={article.title} className='w-full sm:w-1/2 lg:w-1/3'>
                          <Card news={article} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                      </div>
                    ))
                  }
                </div>
            </div>
            <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 h-full p-2'>
                <div className='bg-gray-300 h-screen'>
                    <p>Advertisement</p>
                </div>
            </div>
        </section>
        <section className='px-[3%] flex flex-wrap py-4'> 
          <div className='flex items-start w-full'>
            {/* constains the same cards */}
            <div className='flex flex-col w-full sm:hidden'>
              {
                data.slice(8,11).map(article => (
                  <Card key={article.title} news={article} title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                ))
              }
            </div>
            {/* as this! */}
            <div className='hidden sm:flex w-full lg:w-3/4'>
              {
                data.slice(8,11).map(article => (
                  <Card key={article.title} news={article} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                ))
              }
            </div>
            <div className='hidden lg:flex w-1/4'>
              <Card news={data[11]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
          </div>
        </section>
        <section className='px-[3%] flex flex-wrap py-4'>
          <div className='flex items-start w-full'>
            {/* constains the same cards */}
            <div className='flex flex-col w-full sm:hidden'>
              {
                data.slice(12,15).map(article => (
                  <Card key={article.title} news={article} title={'Title 1'} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                ))
              }
            </div>
            {/* as this! */}
            <div className='hidden sm:flex w-full lg:w-3/4'>
              {
                data.slice(12,15).map(article => (
                  <Card key={article.title} news={article} title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                ))
              }
            </div>
            <div className='hidden lg:flex w-1/4'>
              <Card news={data[15]} title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
          </div>
        </section>
        <section className='px-[3%] flex flex-wrap py-4'>
          <div className='flex align-center px-2 gap-1'>
              <span className='text-xl font-extrabold text-blue-800'>|</span>
              <span className='font-bold text-2xl text-gray-600'>Watch</span>
          </div>
          <div className='flex items-start w-full'>
            {/* constains the same cards */}
            <div className='flex flex-col w-full sm:hidden'>
              {
                reel.slice(0,3).map(vid => (
                  <Card key={vid.title} news={vid} title={'Title 1'} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                ))
              }
            </div>
            {/* as this! */}
            <div className='hidden sm:flex w-full lg:w-3/4'>
              {
                reel.slice(0,3).map(vid => (
                  <Card key={vid.title} news={vid} title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                ))
              }
            </div>
            <div className='hidden lg:flex w-1/4'>
              <Card news={reel[3]} title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
          </div>
        </section>
        <section ref={list} className='px-[3%] flex flex-col divide-y items-center py-4'>
          <div className='border-t border-gray-400 w-full'></div>
          <div className='flex flex-col w-full py-8 sm:w-3/4 lg:w-1/2'>
            <Card news={listData[0]} title={'Title 1'} desc={'description 1'} right={1} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
          </div>
          {
            listData.slice(1).map(article => (
              <div className='flex flex-col w-full py-8 sm:w-3/4 lg:w-1/2 relative'>
                <Card news={article} title={'Title 1'} desc={'description 1'} right={1} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                <span className='absolute hidden sm:block bottom-2 p-2 text-gray-400 text-sm left-1/2'> | {(new Date(article.datePublished)).toUTCString()}</span>
              </div>
            ))
          }
          <div className='w-full py-8'>
            <Paginate page={parseInt(page)} pages={Math.ceil((data.length - 16) / 20)} pathname={`/${section}`} />
          </div>
        </section>
        <section className='px-[3%]'>
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

    </main>
  )
}
