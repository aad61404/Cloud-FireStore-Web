    /***  firestore start    ****/   
    document.addEventListener('DOMContentLoaded', function () {
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  
    // 若不是登入狀態 回到首頁
    if (window.localStorage.getItem('authStorage') !== null) {
      let authStorage = window.localStorage.getItem('authStorage');
      if(authStorage == `Sign out!`) {
        showToast(authStorage, true);
      } else {
        showToast(authStorage, false);
      }
      window.localStorage.clear();
    }
    /***  ----------------- ***/
    /***  addEventtListener ***/
    /***  ----------------- ***/
    document.getElementById('inputPassword').addEventListener("keydown", keyDownTextField, false);
    document.getElementById('SignIn').addEventListener("click", function () {
        signIn();
    });

    /***  ----------------- ***/
    /***  Function          ***/
    /***  ----------------- ***/

    function keyDownTextField(e) {
      var keyCode = e.keyCode;
        if(keyCode==13) {
          signIn()
        }
      }

    function signIn() {
        var inputEmail = document.getElementById('inputEmail').value;
        var inputPassword = document.getElementById('inputPassword').value;
        firebaseAuthSignIn(inputEmail, inputPassword);
    }

    function firebaseAuthSignIn(act, pwd) {
        console.log('act:', act)
        console.log('pwd:', pwd)
        firebase.auth().signInWithEmailAndPassword(act, pwd).then(function (res) {
            console.log('res:', res)
            var user = firebase.auth().currentUser;
            if (user != null) {
              window.location = 'dashboard.html';
            } else {
              showToast('user is null', false)
            }
        }).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          showToast(errorCode +'<br />'+errorMessage, false)
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
    //   console.log('failed signOut');
    //   console.log('err', error);
    //   // An error happened.
    // });


  });   /***  firestore end    ****/ 

    // card Test  
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // var db = firebase.firestore();
    // var cardData;

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
