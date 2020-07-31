/***  firestore start    ****/
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥


document.addEventListener('DOMContentLoaded', function () {  
  /***  ----------------- ***/
  /***  addEventtListener ***/
  /***  ----------------- ***/
  document.getElementById('inputPassword').addEventListener('keydown', keyEnterLogin, false);
  document.getElementById('Login').addEventListener('click', function () {
    Login();
  });

  /***  ----------------- ***/
  /***  Function          ***/
  /***  ----------------- ***/

  function firebaseAuthLogin(act, pwd) {
    firebase.auth().signInWithEmailAndPassword(act, pwd).then(function (res) {
        var user = firebase.auth().currentUser;
        if (user != null) {
          window.location = 'bankSelect.html';
        } else {
          showMessage('user is null', false);
        }
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        showMessage(errorCode + '<br />' + errorMessage, false);
      });
  }

  function Login() {
    var inputEmail = document.getElementById('inputEmail').value;
    var inputPassword = document.getElementById('inputPassword').value;
    firebaseAuthLogin(inputEmail, inputPassword);
  }

  function keyEnterLogin(e) {
    var keyCode = e.keyCode;
    if (keyCode == 13) {
      Login();
    }
  }


  // 若不是登入狀態 回到首頁
  if (window.localStorage.getItem('authStorage') !== null) {
    let authStorage = window.localStorage.getItem('authStorage');
    if (authStorage == `Log out!`) {
      showMessage(authStorage, true);
    } else {
      showMessage(authStorage, false);
    }
    window.localStorage.clear();
  }


}); /***  firestore end    ****/
