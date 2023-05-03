import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Script from 'next/script'

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
import Ads from '../../components/Ads'

import adConstants from '../../utils/adConstants'
import { useSelector } from 'react-redux'

export default ({data, list}) => {

  // const [data, setData] = useState(null);
  // const [list, setList] = useState([]);
  // const [loading, setLoading] = useState(true)
  const router = useRouter();
  const { id } = router.query, section = 'reel';

  // let { data: obj, loading } = useSelector(({data}) => data);
  // const sectionData = obj && section ? [...obj[section]] : null;
  // const dat = (sectionData?.find(article => id && (article.id == id)));
  // const list = sectionData?.concat(sectionData?.splice(0, sectionData?.indexOf(dat))).slice(1) || [];
  const [vBg, setVBg] = useState(bg1);

  useEffect(() => {
    // if (!loading && !dat) {
    //     const url = `/api/data/${section}/${id}`
    //     axios.get(url).then(res => {
    //         setData(res.data);
    //     }).catch(err => console.log('data not found'))
    // } else {
    //     setData(dat)
    // }
    if(data) {
      let { description } = data;
      let content = description.replaceAll('\n', '<br>').split('. ');
      document.querySelector('#content').innerHTML = content;
    }
    setVBg([bg1, bg2, bg3][Math.floor(Math.random() * 3)]);
  }, [])

  if (!data && !list.length) {
      // if (loading)  return <Loader />
      return <Error />
  }
      
  return (
    <main className='overflow-x-clip'>
        <Head>
          <title>GIP News | {data?.title.slice(0,45)}</title>
          <meta
            name="description"
            content={`News Reel | Videos | ${data?.title}`}
            key="desc"
          />
          <link rel='canonical' href={`https://gipnews.vercel.app/reel/${id}?title=${data?.title?.replace(/[\ \/\?\:\;\,\.\|]/g, '-')}`} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5331978820452259"
          crossorigin="anonymous" />
        <section className='p-[3%] w-full relative flex bg-gray-700 text-gray-300'>
            <div className='w-full lg:w-3/4 px-2'>
                {
                    data ? <>
                    <iframe className='w-full aspect-video' src={`//www.youtube.com/embed/${data?.id}?mute=1&autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    <h1 className='pt-8 text-gray-300 text-lg md:text-xl lg:text-2xl font-bold'>{data.title.replace(/.+\.[a-z]{2,3}\ \|\ /g, '')}</h1>
                    <div id='content' className='w-3/4 pt-8'>{data.description}</div>
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
              <div className='p-1'><Ads dataAdSlot={adConstants.square} /></div>
            </div>
        </section>
        <section className='px-[3%] h-fit w-full relative py-6 flex flex-col overflow-y-clip'>
          <Image className='absolute -z-10 scale-110' src={vBg} layout='fill' objectFit='cover' quality={100} alt='background' />
            <div className='flex flex-col sm:grid sm:grid-cols-3 gap-4 py-2'>
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
              <h3 className='text-gray-700 text-4xl font-bold text-center'>Top Picks</h3>
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
        <section className='px-[3%] mb-8'>
          <Ads dataAdSlot={adConstants.horizontal} />
        </section>
    </main>
  )
}

export async function getServerSideProps({params}) {
    const {id} = params;
    let {data: dat} = await axios.get(`https://godinprints.org/api/gipnews/reel/${id}`)
    let {data, list} = dat;
    return {
      props: {
        data, list
      },
    //   revalidate: 600,
    }
  }