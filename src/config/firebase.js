// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCWev_m26_WBRKYv6qxTuF9h0hAKTFiSik",
    authDomain: "fir-course-e887f.firebaseapp.com",
    projectId: "fir-course-e887f",
    storageBucket: "fir-course-e887f.firebasestorage.app",
    messagingSenderId: "630181888106",
    appId: "1:630181888106:web:353c10564d7ada70ba0a13",
    measurementId: "G-5Z3YZJ99Y0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);