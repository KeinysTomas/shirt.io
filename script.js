const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWkJwdhk9VdT24ykFVv4TpkNtm_WDXMh4",
  authDomain: "shirtkj.firebaseapp.com",
  projectId: "shirtkj",
  storageBucket: "shirtkj.firebasestorage.app",
  messagingSenderId: "643296189935",
  appId: "1:643296189935:web:34d6b484eb43aaad35aa1a",
  measurementId: "G-ZLBVCE5TZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);