// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

import { firebaseConfig } from '../firebaseConfig.js';
import { showMessage } from '../showMessage.js';
import { initLogin } from '../initLogin.js';
import { fillBannerValue } from './fillBannerValue.js';
import { fillPlanValue } from './fillPlanValue.js';

document.addEventListener('DOMContentLoaded', function () {  

    /***  Initialize Firebase ***/
    firebase.initializeApp(firebaseConfig);
    
    /***  登入 && 登出 start    ****/
    initLogin();
    
    function signOut() {
        firebase.auth().signOut().then(function() {
            localStorage.setItem("authStorage", `Log out!`);
            window.location = '/info/cardAdmin/index.html';
        })
    }

    document.getElementById('signOut').addEventListener("click", function() {
        signOut();
    })

    document.getElementById('locked-btn').addEventListener("click", function() {
        lockedBtn();
    })

    // 送出按鈕監控
    document.getElementById('comfirm').addEventListener('click', function() {
        sendUrlModify();
    })

    /***  登入 && 登出 end    ****/

    /***  輪播圖 start    ****/
   
    // set url to input
    const db = firebase.firestore();
    let lockedStat = 0;
    db.collection("CreditCardsSummary").doc('info').get().then(function(doc) {
        fillBannerValue(doc.data())
        fillPlanValue(doc.data())
        lockedBtn(); // open editable and draggable
        // setDraggable();
    });

    function sendUrlModify() {
        const db = firebase.firestore();
        const bannerRef = db.collection('CreditCardsSummary').doc('info');
        const bannerBox = {
            banner: checkBannerTextsValue(),
            instalmentDesc: checkPlansValue(), 
        }

        console.log('bannerBox:', bannerBox)
        
        const refresh = () => window.location.reload();
        
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
                        bannerRef.set(bannerBox);
                    };
                })

                isSuccess ?  showMessage('編輯成功',true)  : showMessage('編輯失敗',false)
                isSuccess ?  setTimeout(refresh,1000) : false;
            });
        }
    }

    function checkBannerTextsValue() {
        let bannerTextsBox = [];
        const allBanner= document.querySelectorAll('#bannerContainer [class*="banner"]');
        for (let index = 0; index < allBanner.length; index++) {
            const inputs = allBanner[index].querySelectorAll('input')
            const emptyObject = {};
            emptyObject.bankName = inputs[0].value
            emptyObject.text = inputs[1].value
            emptyObject.link = inputs[2].value
            emptyObject.imgUrl = inputs[3].value
            if( _.isEmpty(inputs[0].value) || _.isEmpty(inputs[1].value) || _.isEmpty(inputs[2].value) || _.isEmpty(inputs[3].value) ) {
                return bannerTextsBox = false;
            } else {
                bannerTextsBox.push(emptyObject)
            }
        }
        return bannerTextsBox;
    }

    function checkPlansValue() {
        let planBox = [];
        const plansInput = document.querySelectorAll('#plansNotice input');
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
        
        const allInputs = document.querySelectorAll('#bannerForm input[type=text]')
        const lockedBtn = document.getElementById('locked-btn');
        const addPlanBtn = document.getElementById('addPlanBtn');
        const addBannerBtn = document.getElementById('addBannerBtn');
        const comfirmBtn = document.getElementById('comfirm')
        const allDangerBtn = document.querySelectorAll('.btn-danger')
        const allBannerDrag = document.querySelectorAll('#bannerContainer .banner.box')   

        allInputs.forEach(item => {
            item.classList.toggle('readonly')
            item.toggleAttribute("readonly");
        })

        allDangerBtn.forEach(item => {
            item.toggleAttribute('disabled')
        })

        
        allBannerDrag.forEach(item => {
             (item.getAttribute('draggable') === "true" ) ?  
             item.setAttribute('draggable', false) : 
             item.setAttribute('draggable', true)
        })

        lockedStat++;
        if(lockedStat >= 2) {
            lockedBtn.innerText = '取消編輯';
            addPlanBtn.classList.toggle('invisible');
            addBannerBtn.classList.toggle('invisible');
            comfirmBtn.classList.toggle('invisible');
        }  
        if ( lockedStat >= 3) {
            window.location.reload();
        }
    }


    // -----------------------------

}); 


