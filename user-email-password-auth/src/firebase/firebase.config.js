// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyDSexsdTp_4uTruSBeOL200hYdpPC3ZFIk",
   authDomain: "user-email-password-auth-bb0bc.firebaseapp.com",
   projectId: "user-email-password-auth-bb0bc",
   storageBucket: "user-email-password-auth-bb0bc.appspot.com",
   messagingSenderId: "984649276513",
   appId: "1:984649276513:web:46b7f56f4d7170531c1e20",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
