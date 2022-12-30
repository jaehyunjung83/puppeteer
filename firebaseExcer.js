import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
dayjs.extend(localizedFormat);

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, onValue, set, update, runTransaction } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCTfD88e8xfwTzdzaiit4Ze01ntDLtSYho',
  authDomain: 'lunar-5abf5.firebaseapp.com',
  databaseURL: 'https://lunar-5abf5-payinfotest-d37a2.firebaseio.com/',
  projectId: 'lunar-5abf5',
  storageBucket: 'lunar-5abf5.appspot.com',
  messagingSenderId: '135894682543',
  appId: '1:135894682543:web:357b3079bfae5ef12a7d5a',
  measurementId: 'G-BCDMP8HXF6',
};
const app = initializeApp(firebaseConfig);

const database = getDatabase();
// const database = firebase.database();
// const startRef = ref(database, '/payinfo/');
// const startRef = ref(database, '/userIP1');

const userIP1 = ref(database, '/userIP1')

// const payinfo = {}
// const dayY = dayjs().format('YYYYMMDDHHmmss')

// const excercise = {
//     a: 1,
//     b: 2
// } 

// payinfo[dayY] = excercise

//   set(startRef, payinfo);

const realdbUpdateMerge = async() => {
const updated = await update(userIP1, { star13: 13 }, { merge: true })
console.log("🚀 ~ file: firebaseExcer.js:40 ~ updated", updated)
return updated
}
console.log(realdbUpdateMerge())