// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWizo0k0zG0ycjVrwCwUIU2SVL8Kp78PE",
  authDomain: "peliculas2-f7cb9.firebaseapp.com",
  projectId: "peliculas2-f7cb9",
  storageBucket: "peliculas2-f7cb9.appspot.com",
  messagingSenderId: "1001747263924",
  appId: "1:1001747263924:web:d9aa2751ee2fd4999302e1",
  measurementId: "G-K54YLTVW5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { app, analytics,db };