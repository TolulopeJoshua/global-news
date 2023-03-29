import React, {useState, useEffect} from 'react'
import Image from 'next/image'

import { MdOutlineFeaturedPlayList } from 'react-icons/md'

import VCard from '../../components/VCard'

import bg1 from '../../public/images/bg1.jpg'
import bg2 from '../../public/images/bg2.jpg'
import bg3 from '../../public/images/bg3.jpg'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import Loader from '../../components/Loader'
import Error from '../../components/Error'

export default () => {

  const [data, setData] = useState(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vBg, setVBg] = useState(bg1);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
      if(data) {
          let { description } = data;
          let content = description.replaceAll('\n', '<br>').split('. ');
          document.querySelector('#content').innerHTML = content;
      }
      
  }, [data])

  useEffect(() => {
    if (id) {
        const url = `/api/data/reel/${id}`
        axios.get(url).then(res => {
            setLoading(false);
            setData(res.data.data);
            setList(res.data.list);
            console.log(res.data)
        }).catch(err => setLoading(false))
    }
    setVBg([bg1, bg2, bg3][Math.floor(Math.random() * 3)]);
  }, [id])

  if (!data && !list.length) {
      if (loading)  return <Loader />
      return <Error />
  }
      
  return (
    <main className='overflow-x-clip'>
    <Head>
      <title>GIP News | {data?.title}</title>
      <meta
        name="description"
        content={`Breaking news | Videos | ${data?.title}`}
        key="desc"
      />
      <link rel="icon" href="/favicon.ico" />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5331978820452259"
            crossorigin="anonymous"></script>
    </Head>
        <section className='p-[3%] w-full relative flex bg-gray-700 text-gray-300'>
            <div className='w-3/4 px-2'>
                {
                    data ? <>
                    <iframe className='w-full aspect-video' src={`//www.youtube.com/embed/${data?.id}?mute=1&autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <div id='content' className='w-3/4 pt-8'> </div>
                    </>:<Error type={1} />
                }
            </div>
            <div className='hidden w-1/4 lg:flex lg:flex-col gap-2 px-2'>
              {
                list.slice(0,3).map(vid => (
                  <div key={vid.title} className=''>
                      <VCard video={vid} title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                  </div>
                ))
              }
            </div>
        </section>
        <section className='px-[3%] h-fit w-full relative py-6 flex flex-col overflow-y-clip'>
          <Image className='absolute -z-10 scale-110' src={vBg} layout='fill' objectFit='cover' quality={100} alt='background' />
          <div className='flex flex-col sm:flex-row gap-4 py-2'>
            {
              list.slice(3,6).map(vid => (
                <VCard video={vid} key={vid.title} title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              ))
            }
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
              <VCard video={list[6]} title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full md:w-1/2 p-4'>
              <VCard video={list[7]} title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            {
              list.slice(8,16).map(vid => (
                <div key={vid.title} className='w-full sm:w-1/2 p-4'>
                  <VCard video={vid} title={'Title 1'} type={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
              ))
            }
          </div>
        </section>
    </main>
  )
}
