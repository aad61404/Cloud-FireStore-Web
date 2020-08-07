// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

import { firebaseConfig } from './firebaseConfig.js';
import { showMessage } from './showMessage.js';
import { isLogin } from './isLogin.js';
import { filldragBankValue } from './filldragBankValue.js'


document.addEventListener('DOMContentLoaded', function () {  

    /***  Initialize Firebase ***/
    firebase.initializeApp(firebaseConfig);
    
    /***  登入 && 登出 start    ****/
    isLogin();
    
    function signOut() {
        firebase.auth().signOut().then(function() {
            localStorage.setItem("authStorage", `Log out!`);
            window.location = '/';
        })
    }

    document.getElementById('signOut').addEventListener("click", function() {
        signOut();
    })

    /***  登入 && 登出 end    ****/
    const dragContainer = document.getElementById('dragContainer');

    const db = firebase.firestore();
    let dbName = [];
    db.collection("card").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            dbName.push(doc.id);
        });

        filldragBankValue(dbName);
    
    });



    const dragBtn = document.getElementById('drag-btn');
    dragBtn.addEventListener('click', function() {
        countOrder()
    })

    function countOrder() {
        var listLi = document.querySelectorAll('.list li');
        var dataOrder = [];

        listLi.forEach(function(item) {
            dataOrder.push(item.innerText);
        })
        console.log('dataOrder:', dataOrder)
    }

}); 