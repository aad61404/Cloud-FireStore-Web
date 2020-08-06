
import { showMessage } from './showMessage.js';

export function isLogin() {
    // 確認是否登入
    firebase.auth().onAuthStateChanged(function (userInfo) {
        // User is signed in.
        if (userInfo) {
            showMessage('You Login', true);
        } else {
            // 1. Log out 
            if(window.localStorage.getItem('authStorage') !== null) {
                let authStorage = window.localStorage.getItem('authStorage');
                if (authStorage == `Log out!`) {
                    showMessage(authStorage, true);
                } 
            } else {
                localStorage.setItem("authStorage", 'You have not Login <br /> Please Login');
                window.location = '/'
            }
        }

        // // 檢查 localStorage 若不是登入狀態 回到首頁
        // if (window.localStorage.getItem('authStorage') !== null) {
        //     let authStorage = window.localStorage.getItem('authStorage');
        //     if (authStorage == `Sign In!`) {
        //         showMessage(authStorage, true);
        //     }
        //     if (authStorage == `Log out!`) {
        //         showMessage(authStorage, true);
        //         window.location = '/'
        //     } else {
        //         showMessage(authStorage, false);
        //     }
        //     // 
        // } else {
        //     if(window.location.pathname !== '/') {
        //         window.location = '/'
        //     }
        // }
    });

}