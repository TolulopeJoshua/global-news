import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

import { MdOutlineBlindsClosed, MdOutlineClose, MdOutlineViewDay, MdOutlineViewWeek } from 'react-icons/md';
import { BsInfoCircle } from 'react-icons/bs';
import { GiCheckMark } from 'react-icons/gi';
import { BiArrowBack } from 'react-icons/bi'
import axios from 'axios';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, app } from '../firebase';
import { toast } from 'react-hot-toast';

export default () => {
  const router = useRouter();
  let { uid } = router.query;

  const provider = new GoogleAuthProvider();

  const [status, setStatus] = useState('');
  const [mail, setMail] = useState('');

  const changeStatus = (n) => {
    if (!mail) {
      signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        localStorage.setItem('user', JSON.stringify(user));
        switchStatus(user.uid, user.email);
        setMail(user.email); uid = user.uid;
        document.querySelector('#su').style.transform = 'translate(-200px, 200px)';
      }).catch(() =>  toast.error('An error occurred'));
      return;
    };
    switchStatus(uid, mail);
    function switchStatus(uid, mail) {
        toast.promise(axios.put(`/api/signup?uid=${uid}&email=${mail}&status=${n}`)
        .then(() => setStatus(`${n}`)), {
        loading: 'Switching...', success: 'Success', error: 'Try again later',
      })
    }
  }

  useEffect(() => {
    if (!uid) return;
    toast.dismiss();
    axios.get(`/api/signup?uid=${uid}`).then(res => {
      setStatus(res.data.status); setMail(res.data.email);
    }).catch(e => console.log(e));
  }, [uid]);

  return (
    <main className='flex flex-col w-full justify-center items-center pb-24 bg-gradient-to-b from-blue-50 to-gray-100 border-b'>
      <div onClick={() => router.back()} className='border-b-2 text-3xl p-8 mb-8 w-full transition-colors hover:text-blue-400 cursor-pointer'>
        <span><BiArrowBack /></span>
      </div>
      <div className='border rounded-lg'>
        <h1 className='text-2xl font-semibold p-8 text-center'>Subscribe to Newsletters</h1>
        <p onClick={() => changeStatus(2)} className='flex relative items-center justify-center border-t text-xl font-semibold text-green-400 py-8 cursor-pointer hover:bg-blue-100 transition-opacity'>
          <span className='pr-4'><MdOutlineViewDay /></span>
          <span>Daily</span>
          {status == '2' ? <span className='absolute right-2 top-2'><GiCheckMark /></span> : ''}
        </p>
        <p onClick={() => changeStatus(1)} className='flex relative items-center justify-center border-t text-xl font-semibold text-blue-400 py-8 cursor-pointer hover:bg-blue-100 transition-opacity'>
          <span className='pr-4'><MdOutlineViewWeek /></span>
          <span>Weekly</span>
          {status == '1' ? <span className='absolute right-2 top-2'><GiCheckMark /></span> : ''}
        </p>
        <p onClick={() => changeStatus(0)} className='flex relative items-center justify-center border-t text-xl font-semibold text-orange-400 py-8 cursor-pointer hover:bg-blue-100 transition-opacity'>
          <span className='pr-4'><MdOutlineBlindsClosed /></span>
          <span>Opt-out</span>
          {status == '0' ? <span className='absolute right-2 top-2'><MdOutlineClose /></span> : ''}
        </p>
      </div>
      <p className='flex items-center pt-8'>
        <span className='pr-3'><BsInfoCircle /></span>
        <small>Get daily/weely headlines directly in your mail box!</small>
      </p>
    </main>
  )
}
