// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAJV_d_pxR945hMZJu303ldfIrWsOLns6Q',
  authDomain: "gipnews.firebaseapp.com",
  databaseURL: "https://gipnews-default-rtdb.firebaseio.com",
  projectId: "gipnews",
  storageBucket: "gipnews.appspot.com",
  messagingSenderId: "79756286876",
  appId: "1:79756286876:web:59849db78734c05bc7c659",
  measurementId: "G-DCW48PX8J5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);