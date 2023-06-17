import firebase from 'firebase/compat/app';

import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {getAuth, browserSessionPersistence, setPersistence} from 'firebase/auth';
import { addDoc, collection, getDocs, query, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// export {app, auth};

firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);

export const authService = firebase.auth();
export {getAuth, browserSessionPersistence, setPersistence};

export const dbService = getFirestore(app);
export {addDoc, collection, getDocs, query, onSnapshot}