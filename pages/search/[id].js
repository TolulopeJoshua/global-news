import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import Card from '../../components/Card'
import Error from '../../components/Error'
import Ads from '../../components/Ads'

import adConstants from '../../utils/adConstants'

export default () => {

    const [data, setData] = useState(null);
    const [list, setList] = useState([]);
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if(data) {
            let { body } = data;
            // body = body.replace(/Search+.+ago/, '');
            // body = body.replace(/\-[0-9]+\-0'\)\;\ \}\)\;/g, '');
            // body = body.replaceAll('googletag.cmd.push(function() { googletag.display(\'div-gpt-ad', '');
            body = body.replaceAll('\n', '<br>').split('. ');
            let index = 0;
            while (index < body.length) {
                index += 5;
                body.splice(index,0,'<br ><br >')
            }
            body = body.map(str => str == '<br ><br >' ? str : str+'. ').join('');
            document.querySelector('#content').innerHTML = body;
        }
        
    }, [data])

    useEffect(() => {
      if (id) {
        const savedList = JSON.parse(localStorage.getItem('searchData') || '[]');
        const savedData = savedList.find(article => article.id == id);
        setData(savedData);
        setList(savedList.concat(savedList.splice(0,savedList.indexOf(savedData) + 1).slice(1)));
      }
    }, [id])

    if (!data && !list.length) {
        return <Error />
    }
      
  return (
        <main>
            <Head>
                <title>GIP News | {data?.title}</title>
                <meta
                    name="description"
                    content={`Sports news | ${data?.description}`}
                    key="desc"
                />
                <link rel="icon" href="/favicon.ico" />
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5331978820452259"
                    crossorigin="anonymous"></script>
            </Head>
            <div><Ads dataAdSlot={adConstants.horizontal} /></div>
            <section className='p-[3%] w-full relative flex items-start text-gray-300'>
                <div className='w-full lg:w-3/4 px-2'>
                    {
                        data ? <>
                        <h1 className='pb-8 text-gray-700 text-4xl font-bold'>{data.title}</h1>
                        <img src={data.image_url} className='w-full aspect-video bg-gray-600' alt=' ' />
                        <span className='pt-4 block text-sm text-gray-400'> | {(new Date(data.pubDate)).toUTCString()}</span>
                        <div id='content' className='w-full text-justify text-gray-700 pt-8 pr-8'>
                            
                        </div></>:<Error type={1} />
                    }
                </div>
                <div className='hidden w-1/4 lg:flex lg:flex-col px-2'>
                    {
                        list.slice(0,3).map(article => (
                            <div key={article.title} className=''>
                                <Card news={{...article, title: article.title.slice(0,50) + '...'}} title={'Title 1'} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                            </div>
                        ))
                    }
                    <div className='p-2'><Ads dataAdSlot={adConstants.square} /></div>
                </div>
            </section>
            <section className='px-[3%] flex flex-wrap py-4'>
            <div className='flex items-start w-full'>
                {/* constains the same cards */}
                <div className='flex flex-col w-full sm:hidden'>
                    {
                        list.slice(3,5).map(article => (
                            <Card key={article.title} news={article} title={'Title 1'} desc={'description 1'} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                        ))
                    }
                    <div className='p-2 w-full'><Ads dataAdSlot={adConstants.square} /></div>
                </div>
                {/* as this! */}
                <div className='hidden sm:flex w-full lg:w-3/4'>
                    {
                        list.slice(3,5).map(article => (
                            <Card key={article.title} news={article} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                        ))
                    }
                    <div className='p-2 w-full'><Ads dataAdSlot={adConstants.square} /></div>
                </div>
                <div className='hidden lg:flex w-1/4'>
                    <Card news={list[6]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
            </div>
            </section>
            <section className='px-[3%] flex flex-wrap items-start py-4'>
                <div className='hidden md:flex md:w-1/2 xl:w-2/5'>
                    <Card news={list[7]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
                <div className='w-full md:hidden'>
                    <Card news={list[7]} title={'Title 1'} desc={'description 1'} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
                <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
                    <Card news={list[8]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
                <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
                    <Card news={list[9]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
                <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
                    <Card news={list[10]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
                <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5 xl:ml-auto'>
                    <Card news={list[11]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
                <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
                    <Card news={list[12]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
                <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
                    <Card news={list[5]} title={'Title 1'} desc={'description 1'} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
            </section>
            <section className='px-[3%] mb-8'>
                <Ads dataAdSlot={adConstants.horizontal} />
            </section>
        </main>
    )
}
