import React from 'react'

import Card from '../../components/Card'

export default () => {
  return (
        <main>
            <section className='p-[3%] w-full relative flex items-start text-gray-300'>
                <div className='w-3/4 px-2'>
                    <Card title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                    <div className='w-3/4'>
                        <p>some texts</p>
                        <p>some texts</p>
                        <p>some texts</p>
                        <p>some texts</p>
                        <p>some texts</p>
                        <p>some texts</p>
                        <p>some texts</p>
                        <p>some texts</p>
                        <p>some texts</p>
                        <p>some texts</p>
                        <p>some texts</p>
                    </div>
                </div>
                <div className='hidden w-1/4 lg:flex lg:flex-col px-2'>
                    <div className=''>
                        <Card title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                    </div>
                    <div className=''>
                        <Card title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                    </div>
                    <div className=''>
                        <Card title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                    </div>
                </div>
            </section>
            <section className='px-[3%] flex flex-wrap py-4'>
            <div className='flex w-full'>
                {/* constains the same cards */}
                <div className='flex flex-col w-full sm:hidden'>
                <Card title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                <Card title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                <Card title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
                {/* as this! */}
                <div className='hidden sm:flex w-full lg:w-3/4'>
                <Card title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                <Card title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                <Card title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
                <div className='hidden lg:flex w-1/4'>
                <Card title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
            </div>
            </section>
            <section className='px-[3%] flex flex-wrap items-start py-4'>
                <div className='hidden md:flex md:w-1/2 xl:w-2/5'>
                <Card title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
                <div className='w-full md:hidden'>
                <Card title={'Title 1'} desc={'description 1'} hide={0} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
                <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
                <Card title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
                <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
                <Card title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
                <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
                <Card title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
                <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5 xl:ml-auto'>
                <Card title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
                <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
                <Card title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
                <div className='w-full sm:w-1/2 md:w-1/4 xl:w-1/5'>
                <Card title={'Title 1'} desc={'description 1'} cat='News' img={{src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQlxkt2lEJbALSfkluO7UhVpgQdLMmQ_R3iQALlPs&s'}} />
                </div>
            </section>
        </main>
    )
}
