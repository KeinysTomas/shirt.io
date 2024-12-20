
   // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Your Firebase configuration
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

// Log page view event
logEvent(analytics, 'page_view', {
    page_title: 'Home Page',
    page_location: window.location.href
});

export { app, analytics };
    