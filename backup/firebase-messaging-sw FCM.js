importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-messaging.js');
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics. 

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: "AIzaSyA5AdaG4X4sxWhSkvCiJFDWeItMjxBIrAY",
  authDomain: "cloud-firestore-18cc4.firebaseapp.com",
  databaseURL: "https://cloud-firestore-18cc4.firebaseio.com",
  projectId: "cloud-firestore-18cc4",
  storageBucket: "cloud-firestore-18cc4.appspot.com",
  messagingSenderId: "319103299280",
  appId: "1:319103299280:web:3d630273a7c359573938d5",
  measurementId: "G-G9R3S9WQV6"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/itwonders-web-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});
