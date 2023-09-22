// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtemkl_aqQKOgtgE8-vn1f550PgmIwRzU",
  authDomain: "dolgovgroup-4021c.firebaseapp.com",
  projectId: "dolgovgroup-4021c",
  storageBucket: "dolgovgroup-4021c.appspot.com",
  messagingSenderId: "916140753815",
  appId: "1:916140753815:web:a26ed8fad9f95ca956bad2",
  measurementId: "G-G35NYLZK1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);