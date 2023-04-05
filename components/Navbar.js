import { Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import { BsDot, BsInfoCircle } from 'react-icons/bs'

import sections from '../utils/sections'
import Link from 'next/link'
import Image from 'next/image'
import { useDispatch } from 'react-redux';
import { dataActions } from '../store/index';
import axios from 'axios'
import { toast } from 'react-hot-toast'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function () {
  const dispatch = useDispatch();
  const router = useRouter()
  const { section: currSection } = router.query

  const navigation = sections.map(section => ({
      name: section.includes('science') ? 'Sci/Tech' : section[0].toUpperCase() + section.slice(1),
      href: `/${section}`,
      current: (section == currSection) || router.pathname.includes(section)
  }))
  navigation.unshift({name: 'Home', href:'/', current: router.pathname == '/'})

  const openR = () => document.querySelector('#refr').style.transform = 'translate(0,0)';
  const closeR = () => document.querySelector('#refr').style.transform = 'translate(200px, -500px)';
  const refresh = async () => {
    try {
      closeR();
      const response = await axios.get('/api/data');
      dispatch(dataActions.setData(response.data));
      dispatch(dataActions.setLoading(false));
      setTimeout(openR, 60 * 60 * 1000);
    } catch (error) {
      openR();
      dispatch(dataActions.setLoading(false));
    }
  }

  useEffect(() => {
    // refresh();
  }, [])

  return (
    <Disclosure as="nav" className="bg-gray-800 relative">
      {({ open }) => (
        <>
          <span id='refr' style={{transform: 'translate(200px, -500px)'}}
            onClick={() => toast.promise(refresh(), {loading: 'Refreshing...', success: <b>Done!</b>, error: <b>Please try again.</b>,})} 
            className='fixed z-10 top-16 right-0 m-2 flex gap-3 items-center p-3 font-semibold text-white bg-blue-600 rounded transition-all hover:scale-110 cursor-pointer'>
            <span><BsInfoCircle /></span>
            <span>Refresh</span>
            <button onClick={(e) => {
              closeR(); e.stopPropagation();
            }} className='p-1 border border-transparent hover:border-white/50'><AiOutlineClose /></button>
          </span>
          <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                <div className="flex flex-shrink-0 items-center relative">
                    <span className='text-white font-semibold text-4xl'>GIP</span>
                    <span className='flex items-end w-full px-1 text-xs -rotate-6 absolute bottom-1 bg-blue-500/70 text-white rounded-full'>
                      <BsDot />
                      <span className='font-semibold text-white'>news</span>
                    </span>
                  {/* <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  /> */}
                </div>
                <div className="hidden md:ml-6 md:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-0 lg:px-2 py-2 text-sm font-medium flex'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                <a href={'/search'} className='flex items-center p-1 lg:px-4 hover:px-5 transition-all mr-3 rounded-full bg-gray-300 cursor-text text-sm font-semibold outline-none ring-2 ring-gray-300 ring-offset-2 ring-offset-gray-800'>
                  <span className='pr-2 hidden lg:inline-block'>Search</span><AiOutlineSearch />
                </a>
                <a href={'https://godinprints.org'} target={'_blank'} className="bg-gray-800 px-3 py-1 text-gray-400 hover:text-white font-semibold" >
                  <Image src={'/bookstack.png'} width={32} height={32} alt='GIP Library' />
                </a>

                {/* Profile dropdown */}
                {/* <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu> */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <a key={item.name} href={item.href}>
                <Disclosure.Button
                  as="div"
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}