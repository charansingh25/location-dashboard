// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSJhO3kB3x5MZvbI9zU-jF24S3b_2SqJw",
  authDomain: "cocc-2f153.firebaseapp.com",
  databaseURL: "https://cocc-2f153-default-rtdb.firebaseio.com",
  projectId: "cocc-2f153",
  storageBucket: "cocc-2f153.appspot.com",
  messagingSenderId: "139066998387",
  appId: "1:139066998387:web:0500d3c8401ed771023406",
  measurementId: "G-XTXQ03ZPS8"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };