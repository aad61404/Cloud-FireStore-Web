import { showMessage } from './showMessage.js';

var isLogin = () =>
  new Promise((resolve, reject) => {
    // 確認是否登入
    firebase.auth().onAuthStateChanged(function (userInfo) {
      // User is signed in.
      if (userInfo) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }).then((isLogin) => isLogin);


//   firebase.auth().signOut().then(function() {
//     window.location = '/';
// })


// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     console.log('user:', user)
//     // User is signed in.
//   } else {
//     console.log('not signIn')
//     // No user is signed in.
//   }
// });

export const initLogin = async () => {
  if ( await isLogin() === true) {
    loginAction();
  } else if( await isLogin() === false){
    notLoginAction();
  } else {
    console.log(isLogin());
  }
};

var loginAction = () => {
  console.log('login');
  showMessage('You Login', true);
};

var notLoginAction = () => {
  // 2. 未登入直接連操作頁面  談回首頁
  console.log('not login');
  // window.location = '/';
};

// const logoutAction = () => {
//   // 1. Log out
//   const authStorage = window.localStorage.getItem('authStorage');
//   if (authStorage == `Log out!`) {
//     showMessage(authStorage, true);
//   }
// };
