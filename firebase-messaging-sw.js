importScripts('https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.5/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyA5AdaG4X4sxWhSkvCiJFDWeItMjxBIrAY",
    authDomain: "cloud-firestore-18cc4.firebaseapp.com",
    databaseURL: "https://cloud-firestore-18cc4.firebaseio.com",
    projectId: "cloud-firestore-18cc4",
    storageBucket: "cloud-firestore-18cc4.appspot.com",
    messagingSenderId   : "319103299280",
    appId: "1:319103299280:web:3d630273a7c359573938d5",
    measurementId: "G-G9R3S9WQV6"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// messaging.usePublicVapidKey("BO3g3Sef0M1VHCvpmQ5CDzvh856ZDeXcN4dhRAUcbXUnlsv4Ws7jwcW4d7Zwr1jrHsb9vR6tNg39XE-I5uyUhhQ");
// messaging.onMessage((payload) => {
//     console.log('Message received. ', payload);
// });