// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

import { firebaseConfig } from './firebaseConfig.js';
import { showMessage } from './showMessage.js';
import { isLogin } from './isLogin.js';
import { fillBannerValue } from './fillBannerValue.js';

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
        db.collection("img").doc('bannerData').get().then(function(doc) {
            fillBannerValue(doc.data())

        });
    }

    setUrlInput()

    const modifyBtn = document.getElementById('modify-btn')
    modifyBtn.addEventListener('click', function() {
        sendUrlModify();
    })

    // 送出修改
    function sendUrlModify() {
        var db = firebase.firestore();
        var sfDocRef = db.collection("img").doc('bannerData')
        var bannerBox = {
            url: checkBannerTextsValue()
        }
        if(bannerBox.url == false) {
            showMessage("橫幅圖片 有欄位未填", false);
            return ;
        }
        showMessage("修改中", false);
        console.log('bannerBox:', bannerBox)
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

    function checkBannerTextsValue() {
        var data = [];
        var allBanner= document.querySelectorAll('#bannerContainer [class*="banner"]');
        allBanner.forEach(function(bannerDiv) {
            const inputs = bannerDiv.querySelectorAll('input')
            const emptyObject = {};
            emptyObject.bankName = inputs[0].value
            emptyObject.text = inputs[1].value
            emptyObject.link = inputs[2].value
            emptyObject.imgUrl = inputs[3].value
            if( _.isEmpty(inputs[0].value) || _.isEmpty(inputs[1].value) || _.isEmpty(inputs[2].value) || _.isEmpty(inputs[3].value) ) { 
                data = false;
            } else {
                data.push(emptyObject)
            }
        })
        if(data == false) {
            return false;
        } else {
            return data;
        }   
    }
}); 
