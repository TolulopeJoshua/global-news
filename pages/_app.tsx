import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase';

import { toast } from 'react-hot-toast'
import React from 'react'

const provider = new GoogleAuthProvider();

function MyApp({ Component, pageProps }: AppProps) {

  React.useEffect(() => {
    setTimeout(() => {
      if (!(localStorage.getItem('user'))) {
        signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
            localStorage.setItem('user', JSON.stringify(user));
          }).catch((error) => {
            toast.error('Error retrieving info')
          });
      }
    }, 20*1000);
  }, [])

  return <>
    <Navbar />
    <Toaster/>
    <Component {...pageProps} />
    <Footer />
  </>
}

export default MyApp
