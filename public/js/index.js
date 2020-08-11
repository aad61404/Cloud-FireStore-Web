// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
import { firebaseConfig } from './firebaseConfig.js';
import { showMessage } from './showMessage.js';

/***  Firestore start    ****/
document.addEventListener('DOMContentLoaded', function () {  
    
    /***  Initialize Firebase ***/
    firebase.initializeApp(firebaseConfig);

    /***  addEventtListener ***/
    document.getElementById('inputPassword').addEventListener('keydown', keyEnterLogin, false);
    document.getElementById('Login').addEventListener('click', function () {
        const act = document.getElementById('inputEmail').value;
        const pwd = document.getElementById('inputPassword').value;
        firebaseAuthLogin(act,pwd);
    });


    /***  Function          ***/
    function firebaseAuthLogin(account,password) {
        firebase.auth().signInWithEmailAndPassword(account, password).then(function (res) {
            const user = firebase.auth().currentUser;
            if (user != null) {
                // localStorage.setItem("authStorage", `Sign In !`);
                window.location = 'creditCard.html';
            } else {
                showMessage('user is null', false);
            }
        })
        .catch(function (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            showMessage(errorCode + '<br />' + errorMessage, false);
        });
    }
  
    function keyEnterLogin(e) {
        const keyCode = e.keyCode;
        if (keyCode == 13) {
            firebaseAuthLogin();
        }
    }

    // 檢查 localStorage 若不是登入狀態 回到首頁
    // if (window.localStorage.getItem('authStorage') !== null) {
    //     const authStorage = window.localStorage.getItem('authStorage');
    //     if (authStorage == `Log out!`) {
    //         showMessage(authStorage, true);
    //     } else {
    //         showMessage(authStorage, false);
    //     }
    //     window.localStorage.clear();
    // }
  
}); 

/***  firestore end    ****/