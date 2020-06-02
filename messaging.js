
const messaging = firebase.messaging();
messaging.usePublicVapidKey("BO3g3Sef0M1VHCvpmQ5CDzvh856ZDeXcN4dhRAUcbXUnlsv4Ws7jwcW4d7Zwr1jrHsb9vR6tNg39XE-I5uyUhhQ");

messaging.requestPermission()
.then(function() {
    console.log('Have permission !!!');
    // return messaging.getToken();
})
.then(function(token) {
    // console.log('token: ', token);
})
.catch(function(err) {
    console.error(err);
})

messaging.getToken().then((currentToken) => {
    if(currentToken) {
        console.log('currentToken:', currentToken)
    }
})

messaging.onMessage(function(payload) {
    console.log('onMessage ', payload);
})

messaging.getToken().then((currentToken) => {
    if (currentToken) {
      sendTokenToServer(currentToken);
    //   updateUIForPushEnabled(currentToken);
    } else {
      // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.');
      // Show permission UI.
    //   updateUIForPushPermissionRequired();
      setTokenSentToServer(false);
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
    setTokenSentToServer(false);
  });
  



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



function showToken(currentToken) {
    // Show token in console and UI.
    var tokenElement = document.querySelector('#token');
    tokenElement.textContent = currentToken;
}

function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
      console.log('Sending token to server...');
      // TODO(developer): Send the current token to your server.
      setTokenSentToServer(true);
    } else {
      console.log('Token already sent to server so won\'t send it again ' +
          'unless it changes');
    }

  }

  function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === '1';
  }
  function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0');
  }