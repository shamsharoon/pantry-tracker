// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1rRmVPPwmKgaIsPscrGkmz551VO_RB9Q",
  authDomain: "pantry-tracker-64a5b.firebaseapp.com",
  projectId: "pantry-tracker-64a5b",
  storageBucket: "pantry-tracker-64a5b.appspot.com",
  messagingSenderId: "497268730191",
  appId: "1:497268730191:web:b7842aea54376d012dbd3a",
  measurementId: "G-TK4L1GYPP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };