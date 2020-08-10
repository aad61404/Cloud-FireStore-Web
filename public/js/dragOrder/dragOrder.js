// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

import { firebaseConfig } from '../firebaseConfig.js';
import { showMessage } from '../showMessage.js';
import { isLogin } from '../isLogin.js';
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
    document.getElementById('locked-drag').addEventListener("click", function() {
        lockedBtn();
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
        var bankOrder = [];

        listLi.forEach(function(item) {
            bankOrder.push(item.innerText);
        })

        bankOrder.forEach(function(item, index) {
            const db = firebase.firestore();
            const bankRef = db.collection('card').doc(item);
            bankRef.set({
                order : index
            }, { merge : true}).then(function() {
                showMessage('修改成功',true);
            }).catch(function(error) {
                showMessage(error, false);
            })
        })
        console.log('bankOrder:', bankOrder)
    }

    function lockedBtn() {
        var allBtn = document.querySelectorAll('#dragList li')
        var comfirmBtn = document.getElementById('drag-btn');
        allBtn.forEach(item=>{
            item.classList.toggle('readonly')
            item.classList.toggle('liLocked')
            
        })
        comfirmBtn.toggleAttribute("disabled");
    }


}); 