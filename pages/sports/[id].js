import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import Card from '../../components/Card'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import Ads from '../../components/Ads'

import adConstants from '../../utils/adConstants'
import { useSelector } from 'react-redux'

export default () => {

    const [data, setData] = useState(null);
    // const [list, setList] = useState([]);
    // const [loading, setLoading] = useState(true)
    const router = useRouter();
    const { id } = router.query, section = 'sports';

    let { data: obj, loading } = useSelector(({data}) => data);
    const sectionData = obj && section ? [...obj[section]] : null;
    const dat = (sectionData?.find(article => id && (article.id == id)));
    const list = sectionData?.concat(sectionData?.splice(0, sectionData?.indexOf(dat))).slice(1) || [];

    useEffect(() => {
        if(data) {
            let { content } = data;
            // content = content.replace(/Search+.+ago/, '');
            // content = content.replace(/\-[0-9]+\-0'\)\;\ \}\)\;/g, '');
            // content = content.replaceAll('googletag.cmd.push(function() { googletag.display(\'div-gpt-ad', '');
            content = content.replaceAll('\n', '<br>').split('. ');
            let index = 0;
            while (index < content.length) {
                index += 5;
                content.splice(index,0,'<br ><br >')
            }
            content = content.map(str => str == '<br ><br >' ? str : str+'. ').join('');
            document.querySelector('#content').innerHTML = content;
        }
        
    }, [data])
  
    useEffect(() => {
        if (!loading && !dat) {
            const url = `/api/data/${section}/${id}`
            axios.get(url).then(res => {
                setData(res.data);
            }).catch(err => console.log('data not found'))
        } else {
            setData(dat)
        }
    }, [loading, id])

    if (!data && !list.length) {
        if (loading)  return <Loader />
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
                            <Card key={article.title} news={article} title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                        ))
                    }
                    <div className='p-2 w-full'><Ads dataAdSlot={adConstants.square} /></div>
                </div>
                {/* as this! */}
                <div className='hidden sm:flex w-full lg:w-3/4'>
                    {
                        list.slice(3,5).map(article => (
                            <Card key={article.title} news={article} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                        ))
                    }                    
                    <div className='p-2 w-full'><Ads dataAdSlot={adConstants.square} /></div>
                </div>
                <div className='hidden lg:flex w-1/4'>
                    <Card news={list[6]} title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
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
            <section className='px-[3%] py-4'>
                    <Ads dataAdSlot={adConstants.horizontal} />
            </section>
        </main>
    )
}
