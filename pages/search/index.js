import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { AiOutlineSearch } from 'react-icons/ai'

import Card from '../../components/Card'
import Error from '../../components/Error'
import Paginate from '../../components/Paginate'
import Ads from '../../components/Ads'

import adConstants from '../../utils/adConstants'

export default () => {

    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(false)
    const [searching, setSearching] = useState(false);

    const router = useRouter();
    const { page=1 } = router.query;
    const [start, end] = [page*10-10,page*10]

    const search = (e) => {
        e.preventDefault();
        if (query.trim().length < 3 || query.trim().length > 50) return toast('Query length must be between 3 & 50');
        if (searching) return;
        setSearching(true)
        toast.loading('Searching...');
        axios.post(`/api/search`, {query}).then(response => {
            const data = response.data.value.map(article => ({
                    ...article, image_url: article.image.url, 
                    section: 'search', pubDate: article.datePublished
                }));
            setData(data);
            setError(false)
            setSearching(false)
            localStorage.setItem('searchQuery', query);
            localStorage.setItem('searchData', JSON.stringify(data));
            toast.dismiss()
            toast.success('Done.')
        }).catch(error => {
            setError(true)
            setSearching(false)
            toast.dismiss()
            toast.error('Error!')
        })
    }

    useEffect(() => {
        setQuery(localStorage.getItem('searchQuery'));
        setData(JSON.parse(localStorage.getItem('searchData') || '[]'));
    }, [])

  return (
    <main>
        <Head>
        <title>GIP News | Search</title>
        <meta
            name="description"
            content="Breaking news, latest news, search."
            key="desc"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel='canonical' href={`https://gipnews.vercel.app/search`} />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5331978820452259"
            crossorigin="anonymous"></script>
        </Head>
        <div><Ads dataAdSlot={adConstants.horizontal} /></div>
        <section className='border-b p-8 flex justify-center items-center'>
            <form onSubmit={search} className='w-10/12 md:w-8/12 relative'>
                <input value={query} onChange={e => setQuery(e.target.value)} className='w-full h-12 border p-3 font-semibold text-lg' placeholder='Search News' />
                <button className='absolute right-0 text-3xl text-gray-400 hover:text-gray-800 p-2'><AiOutlineSearch /></button>
            </form>
        </section>
        <section className='px-[3%] flex flex-col items-center py-8'>
            {
                error ? <Error message='Search engine temporarily busy.' /> :
                data.slice(start,end).map((article, index) => (
                    <div key={article.id} id={article.id} className='flex flex-col w-full sm:w-3/4 lg:w-1/2 relative'>
                        {
                            index % 4 == 3 && 
                            <div className='p-2'><Ads dataAdSlot={adConstants.square} /></div>
                        }
                        <Card news={{...article, image_url: article.image.url, section: 'search'}} title={'Title 1'} desc={'description 1'} right={1} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                        <span className='absolute hidden sm:block bottom-2 p-2 text-gray-400 text-sm left-1/2'> | {(new Date(article.datePublished)).toUTCString()}</span>
                    </div>
                ))
            }
            <div className='w-full py-8'>
                <Paginate page={page} pages={data.length / 10 || 1} pathname='/search' />
            </div>
        </section>
    </main>
  )
}
