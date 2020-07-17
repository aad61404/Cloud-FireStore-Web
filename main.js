//  localStorage.clear();
    // window.onload = alert(localStorage.getItem("storageName"));
   
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
      return new bootstrap.Toast(toastEl)
    })


    document.addEventListener('DOMContentLoaded', function () {
        // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  
        document.getElementById('SignIn').addEventListener("click", function () {
          submit();
        });
  
  
        function submit() {
          var inputEmail = document.getElementById('inputEmail').value;
          var inputPassword = document.getElementById('inputPassword').value;
          firebaseAuthLogin(inputEmail, inputPassword);
          // console.log('inputEmail', inputEmail);
          // console.log('inputPassword', inputPassword);
        }
  
        function firebaseAuthLogin(act, pwd) {
  
          console.log('act:', act)
          console.log('pwd:', pwd)
          firebase.auth().signInWithEmailAndPassword(act, pwd).then(function (res) {
              var user = firebase.auth().currentUser;
              if (user != null) {
                window.location = 'dashboard.html';
                // user.providerData.forEach(function (profile) {
                //   console.log("Sign-in provider: " + profile.providerId);
                //   console.log("  Provider-specific UID: " + profile.uid);
                //   console.log("  Name: " + profile.displayName);
                //   console.log("  Email: " + profile.email);
                //   console.log("  Photo URL: " + profile.photoURL);
                // });
              } else {
                console.error('user is null');
              }
            console.log('Success login');
          }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('errorCode', errorCode);
            console.error('errorMessage', errorMessage);
  
            // …
          });
        }
  
  
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            // User is signed in.
            console.log('onAuthStateChanged');
            console.log(user);
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
          } else {
            // User is signed out.
            // ...
          }
        });
  
        // firebase.auth().signOut().then(function() {
        //   console.log('Success singOut');
        //   // Sign-out successful.
        // }).catch(function(error) {
        //   console.log('failed logout');
        //   console.log('err', error);
        //   // An error happened.
        // });
  
  
  
  
  
        // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
        var db = firebase.firestore();
        var cardData;
  
        // function createTextArea(json) {
        //   var textArea = document.createElement("TEXTAREA");
        //   textArea.rows = "4";
        //   textArea.cols = "50";
        //   var txtNode = document.createTextNode(JSON.stringify(json));
        //   // console.log('json:', json)
  
        //   textArea.appendChild(txtNode);
        //   document.body.appendChild(textArea);
        // }
  
        // db.collection('card').get().then(snap => {
        //   const items = {}
  
        //   snap.forEach(item => {
        //     items[item.id] = item.data()
        //   })
  
        //   cardData = items;
        //   createTextArea(cardData);
        // })
      });