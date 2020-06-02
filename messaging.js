
const messaging = firebase.messaging();
messaging.usePublicVapidKey("BO3g3Sef0M1VHCvpmQ5CDzvh856ZDeXcN4dhRAUcbXUnlsv4Ws7jwcW4d7Zwr1jrHsb9vR6tNg39XE-I5uyUhhQ");

messaging.requestPermission()
.then(function() {
    console.log('Have permission !!!');
    return messaging.getToken();
})
.then(function(token) {
    console.log('token: ', token);
})
.catch(function(err) {
    console.log('err', err);
})


// messaging.getToken().then((currentToken) => {
//   if (currentToken) {
//     sendTokenToServer(currentToken);
//     updateUIForPushEnabled(currentToken);
//   } else {
//     // Show permission request.
//     console.log('No Instance ID token available. Request permission to generate one.');
//     // Show permission UI.
//     updateUIForPushPermissionRequired();
//     setTokenSentToServer(false);
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err);
//   showToken('Error retrieving Instance ID token. ', err);
//   setTokenSentToServer(false);
// });

// Callback fired if Instance ID token is updated.
// messaging.onTokenRefresh(() => {
//     messaging.getToken().then((refreshedToken) => {
//     console.log('Token refreshed.');
//     // Indicate that the new Instance ID token has not yet been sent to the
//     // app server.
//     setTokenSentToServer(false);
//     // Send Instance ID token to app server.
//     sendTokenToServer(refreshedToken);
//     // ...
//     }).catch((err) => {
//     console.log('Unable to retrieve refreshed token ', err);
//     showToken('Unable to retrieve refreshed token ', err);
//     });
// });


// messaging.onMessage(function(payload) {
//     console.log('onMessage ', payload);
// })
