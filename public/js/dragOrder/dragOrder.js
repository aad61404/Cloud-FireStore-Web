// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

import { firebaseConfig } from '../firebaseConfig.js';
import { showMessage } from '../showMessage.js';
import { initLogin } from '../initLogin.js';
import { filldragBankValue } from './filldragBankValue.js'


document.addEventListener('DOMContentLoaded', function () {  

    /***  Initialize Firebase ***/
    firebase.initializeApp(firebaseConfig);
    
    /***  登入 && 登出 start    ****/
    initLogin();
    
    function signOut() {
        firebase.auth().signOut().then(function() {
            localStorage.setItem("authStorage", `Log out!`);
            window.location = '/';
        })
    }

    document.getElementById('signOut').addEventListener("click", function() {
        signOut();
    })
    document.getElementById('locked-btn').addEventListener("click", function() {
        lockedBtn();
    })

    /***  登入 && 登出 end    ****/

    const db = firebase.firestore();
    const dbName = [];
    let lockedStat = 0;
    db.collection("card").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            dbName.push(doc.id);
           
        });
        
        filldragBankValue(dbName);
        lockedBtn();
    });



    const dragBtn = document.getElementById('comfirm');
    dragBtn.addEventListener('click', function() {
        countOrder()
    })

    function countOrder() {
        const listLi = document.querySelectorAll('.list li');
        const bankOrder = [];

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
    }

    function lockedBtn() {
        const allBtn = document.querySelectorAll('#dragList li')
        const comfirmBtn = document.getElementById('comfirm');
        const lockedBtn = document.getElementById('locked-btn');

        allBtn.forEach(item=>{
            item.classList.toggle('readonly')
            item.classList.toggle('liLocked')
            
        })
        comfirmBtn.toggleAttribute("disabled");
        lockedStat++;
        console.log('lockedStat:', lockedStat)
        if(lockedStat >= 2) {
            lockedBtn.innerText = '取消修改'
        }  
        if ( lockedStat >= 3) {
            window.location.reload();
        }
    }


}); 