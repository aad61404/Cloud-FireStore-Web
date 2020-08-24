import { showMessage } from './showMessage.js';

const isLogin = () =>
  new Promise((resolve, reject) => {
    // 確認是否登入
    firebase.auth().onAuthStateChanged(function (userInfo) {
      // User is signed in.
      if (userInfo) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }).then((isLogin) => isLogin);


 export const initLogin = async () => {
    if ( await isLogin() === true) {
      loginAction();
    } else if ( await isLogin() === false){
      notLoginAction();
    } else {
      console.log(isLogin());
    }
  };

const loginAction = () => {
  showMessage('You Login', true);
};

const notLoginAction = () => {
  // 2. 未登入直接連操作頁面  談回首頁
  if(window.location.pathname === "/" || window.location.pathname === '/info/cardAdmin/index.html') {
    showMessage('You have not Login', false);
  } else {
    window.location = '/info/cardAdmin/index.html';
  }
};


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


