// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

import { firebaseConfig } from '../firebaseConfig.js';
import { showMessage } from '../showMessage.js';
import { isLogin } from '../isLogin.js';
import { fillBannerValue } from './fillBannerValue.js';
import { fillPlanValue } from './fillPlanValue.js';

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

    document.getElementById('locked-banner').addEventListener("click", function() {
        lockedBtn();
    })

    /***  登入 && 登出 end    ****/
    
    /***  輪播圖 start    ****/
   
    // set url to input
    function setUrlInput() {
        const db = firebase.firestore();
        db.collection("img").doc('bannerData').get().then(function(doc) {
            fillBannerValue(doc.data())
        });
        db.collection('img').doc('planAnnounces').get().then(function(doc) {
            fillPlanValue(doc.data())
        })
    }

    setUrlInput()

    // 送出按鈕監控
    document.getElementById('modify-btn').addEventListener('click', function() {
        sendUrlModify();
    })

    function sendUrlModify() {
        var db = firebase.firestore();
        const bannerRef = db.collection('img').doc('bannerData');
        const AnnouncesRef = db.collection('img').doc('planAnnounces');
        var bannerBox = {
            url: checkBannerTextsValue()
        }
        var plansBox = {
            announces: checkPlansValue()
        }

        if(checkBannerTextsValue() === false || checkPlansValue() === false ) {
            showMessage("有欄位未填 請檢查", false);
            return ;
        } else {
            return db.runTransaction( async transaction => {
                let isSuccess = true
                await transaction.get(bannerRef).then(function(banDoc) {
                    if (!banDoc.exists) {
                        return  isSuccess = false;
                    }   else {                        
                        // console.log('bannerBox:', bannerBox)
                        bannerRef.set(bannerBox);
                    };
                })

                await transaction.get(AnnouncesRef).then(function(planDoc) {
                    if (!planDoc.exists) {
                        return isSuccess = false;
                    }else {
                        // console.log('plansBox:', plansBox)
                        AnnouncesRef.set(plansBox);
                    };  
                })
                isSuccess ?showMessage('修改成功',true) : showMessage('修改失敗',false)
            });
        }
    }

    function checkBannerTextsValue() {
        let bannerTextsBox = [];
        var allBanner= document.querySelectorAll('#bannerContainer [class*="banner"]');
        allBanner.forEach(function(bannerDiv) {
            const inputs = bannerDiv.querySelectorAll('input')
            const emptyObject = {};
            emptyObject.bankName = inputs[0].value
            emptyObject.text = inputs[1].value
            emptyObject.link = inputs[2].value
            emptyObject.imgUrl = inputs[3].value
            if( _.isEmpty(inputs[0].value) || _.isEmpty(inputs[1].value) || _.isEmpty(inputs[2].value) || _.isEmpty(inputs[3].value) ) { 
                return bannerTextsBox = false;
            } else {
                return bannerTextsBox.push(emptyObject)
            }
        })
        return bannerTextsBox;
    }

    function checkPlansValue() {
        let planBox = [];
        var plansInput = document.querySelectorAll('#plansNotice input');
        plansInput.forEach(item=> {
            if(_.isEmpty(item.value) ) {
                return planBox = false;
            } else {
                return planBox.push(item.value);
            }
        })
        return planBox;
    }

    
    function lockedBtn() {
        var allInputs = document.querySelectorAll('#bannerForm input[type=text]')
        var allBtn = document.querySelectorAll('#bannerForm button')
 
        allInputs.forEach(item => {
            item.classList.toggle('readonly')
            item.toggleAttribute("readonly");
        })

        allBtn.forEach(item=>{
            item.toggleAttribute("disabled"); 
        })


    }


}); 
