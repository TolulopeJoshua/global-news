import '../styles/globals.css'
import React from 'react'
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineClose } from 'react-icons/ai'
import { Toaster, toast } from 'react-hot-toast'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, app } from '../firebase';
import { getAnalytics } from "firebase/analytics";
import store from '../store/index';

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';

const provider = new GoogleAuthProvider();

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const signUp = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        // console.log(user)
        localStorage.setItem('user', JSON.stringify(user));
        const url = `/api/signup?uid=${user.uid}&email=${user.email}&status=2`
        axios.put(url).then(() => {
          router.push(`/newsletter?uid=${user.uid}`)
          toast.loading('Signing up...')
        }).catch(e => console.log(e));
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
    // localStorage.removeItem('user');
    if (!(localStorage.getItem('user'))) {
      setTimeout(() => {
        open();
      }, 20*1000);
    }
    const analytics = getAnalytics(app);
  }, [])

  return (
    <Provider store={store}>
      <Navbar />
      <Toaster/>
      <Component {...pageProps} />
      <Footer signUp={signUp} />
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
