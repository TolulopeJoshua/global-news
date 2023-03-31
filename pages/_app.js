import '../styles/globals.css'
import React from 'react'
import { Provider } from 'react-redux';
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineClose } from 'react-icons/ai'
import { Toaster, toast } from 'react-hot-toast'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase';
import store from '../store/index';

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const provider = new GoogleAuthProvider();

function MyApp({ Component, pageProps }) {

  const signUp = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        localStorage.setItem('user', JSON.stringify(user));
        close();
      }).catch((error) => {
        toast.error('Error retrieving info')
        console.log(error)
      });
  }
  const open = () => {
    document.querySelector('#su').style.transform = 'translate(0,0)';
  }
  const close = (e) => {
    document.querySelector('#su').style.transform = 'translate(-200px, 200px)';
    e?.stopPropagation();
  }

  React.useEffect(() => {
    if (!(localStorage.getItem('user'))) {
      setTimeout(() => {
        open();
      }, 20*1000);
    }
  }, [])

  return (
    <Provider store={store}>
      <Navbar />
      <Toaster/>
      <Component {...pageProps} />
      <Footer />
      <div onClick={signUp} id='su' style={{transform: 'translate(-200px, 200px)', transition: 'transform 0.5s'}} className='fixed bottom-6 left-6' >
        <div className='flex items-center gap-4 px-4 py-3 rounded bg-green-300 font-semibold hover:scale-110 cursor-pointer'>
          <span><FcGoogle /></span>
          <span>Sign Up</span>
          <button onClick={close} className='p-1 border border-transparent hover:border-black/30'><AiOutlineClose /></button>
        </div>
      </div>
    </Provider>
  )
}

export default MyApp
