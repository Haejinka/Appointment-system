// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmm0FVV618ftggSwqMLyL8A1xCewXJoaA",
  authDomain: "petplace-fc2ea.firebaseapp.com",
  projectId: "petplace-fc2ea",
  storageBucket: "petplace-fc2ea.appspot.com",
  messagingSenderId: "286818333615",
  appId: "1:286818333615:web:e6bdbfcad3b920ad86b55a",
  measurementId: "G-93QMXWMB0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
const analytics = getAnalytics(app);