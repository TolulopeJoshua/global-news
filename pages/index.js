import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Head from 'next/head'
import Image from 'next/image'

import { MdOutlineRestartAlt } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import axios from 'axios'

import Card from '../components/Card'
import VCard from '../components/VCard'
import List from '../components/List'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Ads from '../components/Ads'

import adConstants from '../utils/adConstants'

import bg1 from '../public/images/bg1.jpg'
import bg2 from '../public/images/bg2.jpg'
import bg3 from '../public/images/bg3.jpg'
import Link from 'next/link'

const Home = ({data}) => {
  // console.log(data)
  const [guess, setGuess] = useState({number:0, input:0, attempts:0, result:0})
  const [city, setCity] = useState('New York')
  const [changeCity, setChangeCity] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [vBg, setVBg] = useState(bg1)
  // console.log(weatherData)
  
  // const {data, loading} = useSelector(({data}) => data);

  const getWeather = (location) => {
    axios.get(`/api/weather?location=${location}`)
        .then(response => {
          const {list} = response.data;
          const days = [...new Set(list.map(dat => dayString(dat.dt_txt)))].slice(0,4);
          const data = (days.map((day, index) => ({
            day, time: list[0].dt_txt.slice(11,16), icon: list[index * 8].weather[0].icon,
            max: Math.round(Math.max(...list.filter(dat => dayString(dat.dt_txt) == day)
                      .map(dat => dat.main.temp_max)) - 273.15),
            min: Math.round(Math.min(...list.filter(dat => dayString(dat.dt_txt) == day)
                      .map(dat => dat.main.temp_min)) - 273.15)
          })))
          setWeatherData(data)
          setNotFound(false)
          setChangeCity(false)
          setCity(response.data.city.name);
        })
        .catch(error => setNotFound(true))
  }

  useEffect(() => {
    axios.get('/api/location').then(res => {
      res.data && setCity(res.data)
      getWeather(res.data || city);
    }).catch(err => console.log(err))
    setGuess({number:Math.floor(Math.random() * 100)+1, input:0, attempts:0, result:0})
    setVBg([bg1, bg2, bg3][Math.floor(Math.random() * 3)]);
  }, [])
    
  function dayString(date) {
    return (new Date(date)).toString().slice(0,3)
  }

  if (!data) {
    // if (loading) return <Loader />
    return <Error />
  }
  
  return (
      <main className="w-full overflow-hidden">
        <Head>
          <title>GIP News | Homepage</title>
          <meta
            name="description"
            content="Breaking news, latest news, sports and entertainment, health, science and technology."
            key="desc"
          />
          <meta name="a.validate.02" content="Nzkj9hV9zxYHRykE7gJnXvEVOAoyhVaD210U" />
          <link rel="icon" href="/favicon.ico" />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5331978820452259"
            crossorigin="anonymous"></script>
        </Head>
        <div><Ads dataAdSlot={adConstants.horizontal} /></div>
        <section className='px-[3%] flex justify-between pt-8 text-xl text-gray-600'>
          <h1 className='font-bold px-2'>Welcome to GIP News</h1>
          <span className='px-2'>{(new Date()).toUTCString().slice(0,11)}</span>
        </section>
        <section className='px-[3%] block sm:flex flex-wrap'>
          <div className='w-full lg:w-6/12'>
            <Card news={data.world[0]} title='My Title 1' cat='News' inline={1} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
          </div>
          <div className='w-full lg:w-6/12 sm:flex flex-wrap'>
            {
              data.world.slice(1,3).map(article => (
              <div key={article.id} className='sm:w-6/12 sm:h-3/6'>
                <Card news={article} title='My Title 1' cat='News' inline={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              </div>
              ))
            }
            <div key={data['science,technology'][0].id} className='sm:w-6/12 sm:h-3/6'>
              <Card news={data['science,technology'][0]} title='My Title 1' cat='News' inline={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div key={data.entertainment[0].id} className='sm:w-6/12 sm:h-3/6'>
              <Card news={data.entertainment[0]} title='My Title 1' cat='News' inline={1} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
          </div>
        </section>
        <section className='px-[3%] flex flex-wrap sm:flex-row-reverse justify-center py-4'>
          <div className='w-full lg:w-1/3 h-max lg:pt-10 p-2'>
            <div className=''>
              <Ads dataAdSlot={adConstants.square}/>
            </div>
            <div className='pt-4 hidden lg:inline-block'>
              <Ads dataAdSlot={adConstants.square}/>
            </div>
            <div className='py-4'>
              <div className='px-2 py-4 flex flex-col sm:flex-row gap-3'>
                <strong className='text-xl text-gray-600'>{city} Weather</strong>
                <span className='relative'>
                  <button onClick={() => setChangeCity(true)} className='bg-blue-100 hover:bg-blue-200 rounded p-1 text-sm text-gray-600'>Change city</button>
                  <span className={`${!changeCity && 'hidden'} absolute left-0`}>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      getWeather(e.target[0].value);
                    }} className='relative flex'>
                      <input className='text-sm p-1 border-2 border-blue-200 text-gray-500 font-semibold' type={'text'} placeholder='Enter city or region' />
                      <button className='absolute right-0 text-blue-800 p-1 bg-blue-200 m-1 hover:bg-blue-100'><AiOutlineSearch /></button>
                      <span className={`${!notFound && 'hidden'} absolute text-pink-400 text-sm bottom-full`}>not found</span>
                    </form>
                  </span>
                </span>
              </div>
              <div className='w-full overflow-x-auto'>
                <div className='flex gap-3 w-max'>
                {
                  weatherData.map((data) => {
                    return <span key={data.day} className={`flex gap-1 text-gray-600`}>
                      <div className='flex flex-col h-full justify-center'>
                        <span className='text-xs block text-center text-blue-600'>{data.time}</span>
                        <Image src={"http://openweathermap.org/img/w/" + data.icon + ".png"} width={50} height={30} alt='weather icon' />
                      </div>
                      <span className='flex flex-col'>
                        <span>{data.day}</span>
                        <span className='text-lg font-bold'>{data.max}<sup>0</sup>c</span>
                        <span className='text-sm'>{data.min}<sup>0</sup>c</span>
                      </span>
                    </span>
                  })
                }
                </div>
              </div>
            </div> 
          </div>
          <div className='w-full h-max lg:w-2/3'>
            <div className='flex align-center px-2 gap-1'>
              <span className='text-xl font-extrabold text-blue-800'>|</span>
              <span className='font-bold text-2xl text-gray-600'>News</span>
            </div>
            <div className='flex flex-wrap items-start w-full pb-4'>
              {
                data.top.slice(0,3).map(article => (
                  <div key={article.id} className='w-full sm:w-1/3 flex h-full'>
                    <Card news={article} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                  </div>
                ))
              }
            </div>
            <div className='flex align-center px-2 gap-1'>
              <span className='text-xl font-extrabold text-blue-800'>|</span>
              <span className='font-bold text-2xl text-gray-600'>Sports</span>
            </div>
            <div className='flex flex-wrap w-full items-start h-full pb-4'>
              {
                data.sports.slice(0,3).map(article => (
                  <div key={article.id} className='w-full sm:w-1/3'>
                    <Card news={article} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                  </div>
                ))
              }
            </div>
            <div className='flex align-center px-2 gap-1'>
              <span className='text-xl font-extrabold text-blue-800'>|</span>
              <span className='font-bold text-2xl text-gray-600'>Health</span>
            </div>
            <div className='flex flex-wrap w-full items-start h-full pb-4'>
              {
                data.health.slice(0,3).map(article => (
                  <div key={article.id} className='w-full sm:w-1/3'>
                    <Card news={article} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                  </div>
                ))
              }
            </div>
          </div>
        </section>
        <div className='text-gray-600 px-[3%]'>
          <p className=' text-lg'><strong>Guess Number</strong></p>
          <div className='relative overflow-hidden'>
            <p className='py-1 font-[cursive]'>
              <small>I am thinking of a number between 1 & 100. Can you make a guess?</small>
            </p>
            <p><input type={'range'} value={guess.input} className='w-96 max-w-full' onChange={(e) => {
              if (parseInt(e.target.value) == guess.number) setGuess(init => ({...init, result:1}))
              setGuess(init => ({...init, attempts: init.attempts+1, input: parseInt(e.target.value)}))
            }} /></p>
            <p><small>{guess.input} (too {guess.input > guess.number ? 'high':'low'})</small></p>
            <div className={`absolute transition-transform ${guess.result ? 'translate-y-0':'translate-y-full'} top-0 bg-blue-50 h-full w-[400px] max-w-full p-2 rounded flex align-middle justify-center flex-col gap-1`}>
              <p className='flex justify-between align-middle font-bold font-[cursive]'>
                <span>And the number is: {guess.number}</span>
                <button onClick={() => {
                  setGuess({number:Math.floor(Math.random() * 100)+1, input:0, attempts:0, result:0})
                }} className='text-2xl'><MdOutlineRestartAlt/></button>
              </p>
              <p><small>Attempts: {guess.attempts}</small></p>
            </div> 
          </div>
        </div>
        <section className='px-[3%] h-fit w-full relative my-8 py-6 flex flex-col overflow-y-clip'>
            <Image className='absolute -z-10 scale-110' src={vBg} layout='fill' objectFit='cover' quality={100} alt='background' />
            <div className='relative text-gray-200 text-5xl'>
              <strong>REEL</strong>
              <Link href={'/reel'} className='absolute right-0 px-3 hover:bg-gray-400 bg-gray-300 text-gray-100 hover:text-gray-200 rounded-full'><HiOutlineArrowNarrowRight /></Link>
            </div>
            <span className='py-2 text-white'>Trending videos from around the web</span>
            <div className='flex flex-col sm:grid sm:grid-cols-3 gap-4 py-2'>
              {
                data.reel.slice(0,3).map(video => (
                  <VCard key={video.id} video={video} title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                ))
              }
            </div>
        </section>
        <section className='px-[3%] h-fit w-full relative my-8 py-2 flex flex-col overflow-y-clip'>
          <Ads dataAdSlot={adConstants.horizontal} />
        </section>
        <section className='px-[3%] pb-6'>
          <div className='flex align-center p-2 gap-1'>
            <span className='text-xl font-extrabold text-blue-800'>|</span>
            <span className='font-bold text-2xl text-gray-600'>World</span>
          </div>
          <div className='flex w-full items-start'>
            {/* constains the same cards */}
            <div className='flex flex-col w-full sm:hidden'>
              <Card news={data['science,technology'][1]} title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              <Card news={data.world[3]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              {/* <Card news={data.world[2]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} /> */}
            </div>
            {/* as this! */}
            <div className='hidden sm:flex w-full lg:w-3/4'>
              <Card news={data['science,technology'][1]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              <Card news={data.world[3]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              <Card news={data.world[4]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='hidden lg:flex w-1/4'>
              <Card news={data.health[3]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
          </div>
        </section>
        <section className='px-[3%] flex flex-wrap justify-center py-6 sm:bg-blue-50'>
          <div className='w-full h-auto sm:w-2/3 flex flex-wrap items-start'>
            <div className='flex align-center px-2 gap-1'>
              <span className='text-xl font-extrabold text-blue-800'>|</span>
              <span className='font-bold text-2xl text-gray-600'>Features</span>
            </div>
            <div className='flex flex-wrap w-full h-auto pb-4'>
              <div className='w-full sm:hidden'>
                <Card news={data.entertainment[0]} title={'Title 1'} hide={0} inline={1} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              </div>
              <div className='w-full hidden sm:block xl:hidden'>
                <Card news={data.entertainment[0]} title={'Title 1'} light={1} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              </div>
              <div className='w-full hidden xl:block'>
                <Card news={data.entertainment[0]} title={'Title 1'} hide={0} inline={1} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
              </div>
            </div>
            <div className='w-full h-auto sm:w-1/2 lg:w-1/3'>
              <Card news={data.entertainment[1]} title={'Title 1'} light={1} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full h-auto sm:w-1/2 lg:w-1/3'>
              <Card news={data['science,technology'][2]} title={'Title 1'} light={1} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full h-auto sm:w-1/2 lg:w-1/3'>
              <Card news={data['science,technology'][3]} title={'Title 1'} light={1} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full h-auto sm:w-1/2 lg:w-1/3'>
              <Card news={data.entertainment[2]} title={'Title 1'} light={1} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full h-auto sm:w-1/2 lg:w-1/3'>
              <Card news={data.top[2]} title={'Title 1'} light={1} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full h-auto sm:w-1/2 lg:w-1/3'>
              <Card news={data.sports[3]} title={'Title 1'} light={1} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
          </div>
          <div className='w-full sm:w-1/3 h-full sm:pt-10 p-2'>
            <div className=''>
              <List title={'Business News'} list={data.business.slice(4,8)} />
            </div>
            <div className='pt-4'><Ads dataAdSlot={adConstants.square} /></div>
          </div>
        </section>
        <section className='px-[3%] h-fit w-full relative my-8 py-6 flex flex-col overflow-y-clip'>
            <Image className='absolute -z-10 scale-110' src={vBg} layout='fill' objectFit='cover' quality={100} alt='background' />
            <div className='relative text-gray-200 text-5xl'>
              <strong>REEL</strong>
              <Link href={'/reel'} className='absolute right-0 px-3 hover:bg-gray-400 bg-gray-300 text-gray-100 hover:text-gray-200 rounded-full'><HiOutlineArrowNarrowRight /></Link>
            </div>
            <span className='py-2 text-white'>More trending videos from around the web</span>
            <div className='flex flex-col sm:grid sm:grid-cols-3 gap-4 py-2'>
              {
                data.reel.slice(3,6).map(video => (
                  <VCard key={video.id} video={video} title={'Title 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                ))
              }
            </div>
        </section>
        <section className='px-[3%]'>
          <div className='w-full flex flex-wrap py-4 items-start'>
            <div className='hidden sm:flex sm:w-1/2'>
              <Card news={data.business[0]} title={'Title 1'} light={1} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='hidden sm:flex sm:w-1/2'>
              <Card news={data.business[1]} title={'Title 1'} light={1} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:hidden'>
              <Card news={data.business[0]} title={'Title 1'} hide={0} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:hidden'>
              <Card news={data.business[1]} title={'Title 1'} hide={0} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
          </div>
          <div className='flex flex-wrap py-4 items-start'>
            <div className='w-full sm:w-1/2 lg:w-1/3'>
              <Card news={data.business[2]} title={'Title 1'} hide={0} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full sm:w-full lg:w-1/3 sm:order-first lg:order-none'>
              <div className='p-2'><Ads dataAdSlot={adConstants.square} /></div>
            </div>
            <div className='w-full sm:w-1/2 lg:w-1/3'>
              <Card news={data.business[3]} title={'Title 1'} hide={0} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
          </div>
        </section>
        {/* <script data-cfasync="false" type="text/javascript" data-adel="atag" src="//achcdn.com/script/atg.js" czid="uenyzel5z7"></script> */}
      </main>
  )
}

export async function getServerSideProps() {
  let {data} = await axios.get(`https://godinprints.org/api/gipnews/data`)
  return {
    props: {
      data
    },
    // revalidate: 600,
  }
}

export default Home
