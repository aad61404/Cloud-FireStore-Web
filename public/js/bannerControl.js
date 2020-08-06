// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

import { firebaseConfig } from './firebaseConfig.js';
import { showMessage } from './showMessage.js';
import { isLogin } from './isLogin.js';

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
    
    /***  輪播圖 start    ****/
   
    // set url to input
    function setUrlInput() {
        const db = firebase.firestore();
        db.collection("img").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, doc.data())
                let bannerBox = doc.data();
                const bannerWrapper = document.querySelectorAll('#bannerWrapper input');
                bannerWrapper.forEach(function(itemInput, index) {
                    itemInput.value = bannerBox.url[index]
                })
            });
        });
    }
    setUrlInput()

    const modifyBtn = document.getElementById('modify-btn')
    modifyBtn.addEventListener('click', function() {
        sendUrlModify();
    })

    // 送出修改
    function sendUrlModify() {
        showMessage("修改中", false);
        console.log('目前修改中...');
        var db = firebase.firestore();
        var sfDocRef = db.collection("img").doc('bannerImg')

        var urlBox = {
            url: []
        };    
        var bannerWrapper = document.querySelectorAll('#bannerWrapper input');
        bannerWrapper.forEach(function(imgInput) {
            urlBox.url.push(imgInput.value)
        })
        console.log('urlBox:', urlBox)
        // return db.runTransaction(function(transaction) {
        //     return transaction.get(sfDocRef).then(function(sfDoc) {
        //         if (!sfDoc.exists) {
        //             throw "Document does not exist!";
        //         }
        //         // console.log('sfDoc:', sfDoc.data())
        //         sfDocRef.set(dataBa).then(function() {
        //             console.log("Document successfully written!");
        //         });
        //     });
        // }).then(function() {
        //     console.log("Transaction successfully committed!");
        // }).catch(function(error) {
        //     console.log("Transaction failed: ", error);
        // });
    }


}); 
