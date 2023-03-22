import React from 'react'

import { AiOutlineSearch } from 'react-icons/ai'

import Card from '../../components/Card'
import Paginate from '../../components/Paginate'

export default () => {
  return (
    <main>
        <section className='border-b p-8 flex justify-center items-center'>
            <form className='w-10/12 md:w-8/12 relative'>
                <input name='q' className='w-full h-12 border p-3 font-semibold text-lg' placeholder='Search News' />
                <button className='absolute right-0 text-3xl text-gray-400 hover:text-gray-800 p-2'><AiOutlineSearch /></button>
            </form>
        </section>
        <section className='px-[3%] flex flex-col items-center py-8'>
            <div className='flex flex-col w-full sm:w-3/4'>
                <Card title={'Title 1'} desc={'description 1'} right={1} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='flex flex-col w-full sm:w-3/4'>
                <Card title={'Title 1'} desc={'description 1'} right={1} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='flex flex-col w-full sm:w-3/4'>
                <Card title={'Title 1'} desc={'description 1'} right={1} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='flex flex-col w-full sm:w-3/4'>
                <Card title={'Title 1'} desc={'description 1'} right={1} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='flex flex-col w-full sm:w-3/4'>
                <Card title={'Title 1'} desc={'description 1'} right={1} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='flex flex-col w-full sm:w-3/4'>
                <Card title={'Title 1'} desc={'description 1'} right={1} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='flex flex-col w-full sm:w-3/4'>
                <Card title={'Title 1'} desc={'description 1'} right={1} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='flex flex-col w-full sm:w-3/4'>
                <Card title={'Title 1'} desc={'description 1'} right={1} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='flex flex-col w-full sm:w-3/4'>
                <Card title={'Title 1'} desc={'description 1'} right={1} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='flex flex-col w-full sm:w-3/4'>
                <Card title={'Title 1'} desc={'description 1'} right={1} hide={0} img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
            </div>
            <div className='w-full'>
                <Paginate />
            </div>
        </section>
    </main>
  )
}
