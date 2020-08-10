// creditCardSpecial.js (firestore && Auth && 搜尋資料和送出)
// fillCreditCardValue.js (表單資料內容操作)
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

import { firebaseConfig } from '../firebaseConfig.js';
import { isLogin } from '../isLogin.js';
import { showMessage } from '../showMessage.js';
import { fillCreditCardValue } from './fillCreditCardValue.js';


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


    /***  Search Bar  (V) ****/ 
    document.getElementById('select-btn').addEventListener('click', function() {
        sendSearch(); // ↓ ↓
    })
    document.getElementById('confirm-btn').addEventListener('click', function() {
        sendModify();
    })
    document.getElementById('edit-btn').addEventListener('click', function() {
        isLocked();
    })
    

    // Selector
    function setbankSelector() {
        const db = firebase.firestore();
        db.collection("card").get().then(function(querySnapshot) {
            /***  Search Bar  (M) ****/ 
            const customSelect = document.getElementById('custom-select');

            querySnapshot.forEach(function(doc) {
                const option = document.createElement("option");
                option.value = doc.id;
                option.text = doc.data().name;
                customSelect.appendChild(option)
            });
        });
    }
    
    setbankSelector()

    /***  Search Bar  (C)  start ****/ 

    // 送出查詢
    function sendSearch() {
        const selectValue = document.getElementById("custom-select").value
        const docRef = firebase.firestore().collection("card").doc(selectValue);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                showDisplay();
                fillCreditCardValue(doc.data());
            } else {
                showMessage("No such document!", false)
            }
        }).catch(function(error) {
            // showMessage(error, false)
            console.log("Error getting document:", error);
        });
    }
    
    // open
    function showDisplay() {
        var tbl = document.getElementById('bank-Form');
        if( tbl.classList.contains('hidden')) {
            tbl.classList.add('show');
            tbl.classList.remove('hidden');
        }
    }

    // 送出修改
    function sendModify() {
        
        console.log('目前修改中...');
        const dataBa = {
            id: document.getElementById('id').value,
            isShow: checkDataIsShow("bankIsShow"),
            name: document.getElementById('name').value,
            iconUrl: document.getElementById('iconUrl').value,
            logoUrl: document.getElementById('logoUrl').value,
            link: document.getElementById('link').value,
            plans: plansCount(),
            gift: {
                isShow: checkDataIsShow("gift"),
                texts:  checkGiftTextsValue(),
                begDt: document.getElementById('begDt').value,
                endDt: document.getElementById('endDt').value,
                announce: document.getElementById('announce').value,
                qualify: document.getElementById('qualify').value,
            },
            promo: {
                isShow: checkDataIsShow("promo"),
                projects: checkPromoProjectValue()
            },
            discount: {
                isShow: checkDataIsShow("discount"),
                content: {
                    point: document.getElementById('point').value,
                    back: document.getElementById('back').value,
                    upper: document.getElementById('upper').value,
                    lower: document.getElementById('lower').value,
                },
                detail: {
                    announces: announceCount(),
                    texts: detailCount()
                }
            }
        };

        function sendCheckIsValue () {
            if(dataBa.gift.texts === false || dataBa.promo.projects === false || dataBa.discount.detail.announces === false || dataBa.discount.detail.texts === false) {
                return false;
            }
        }
        console.log('dataBa:', dataBa);
        const db = firebase.firestore();
        const ID = document.getElementById('id').value; // ID: mega
        const bankRef = db.collection("card").doc(ID);

        return db.runTransaction(function(transaction) {
            return transaction.get(bankRef).then(function(sfDoc) {
                if (!sfDoc.exists) {
                    throw "Document does not exist!";
                }
                if (sendCheckIsValue() == false) {
                    console.log('at here');
                    return ;
                } else {
                    console.log('in else');
                    showMessage("修改成功!", true);
                    // bankRef.set(dataBa ,{merge : true}).then(function() {
                    //     showMessage("修改成功!", true);
                    // }).catch(function(error) {
                    //     showMessage(error, false);
                    // });
                }
            });
        })
        .then(function() {
            console.log("Transaction successfully committed!");
        }).catch(function(error) {
            console.log("Transaction failed: ", error);
        });
    }


    /**** sendModify 用到的function  start ****/
    
    // Radio isShow value
    function checkDataIsShow(id) {
        const dataIsChecked = $('#'+id+' input:checked');
        const isTrueSet = (dataIsChecked[0].value == 'true'); // 將"true" 轉成 true 

        return isTrueSet;
    }

    //  3,6,10,12 點擊後觸發 (databox.plans)
    function plansCount() {
        const plansBox = [];
        const plansChecked = $('#plans input:checked');

        for (let i = 0; i < plansChecked.length; i++) {
            plansBox.push(plansChecked[i].value);
        }
        return plansBox;
    }

   // 送出時 檢查 (二)刷卡滿額禮所有欄位 (databox.gift.texts)
   function checkGiftTextsValue() {
        let giftTextsBox = [];
        const allGifts=  document.querySelectorAll('#giftContainer [class*="gift"]');

        for (let i = 0; i < allGifts.length; i++) {
            const giftInputs = allGifts[i].querySelectorAll('input')
            const emptyObject = {};
            emptyObject.condition = giftInputs[0].value
            emptyObject.receive = giftInputs[1].value
            emptyObject.remark = giftInputs[2].value    
            if( _.isEmpty(giftInputs[0].value) || _.isEmpty(giftInputs[1].value) ) { 
                 showMessage("刷卡滿額禮 有欄位未填", false);
                 return giftTextsBox = false;
             }
            giftTextsBox.push(emptyObject);
        }
        return giftTextsBox;
    }


    function checkPromoProjectValue() {
        let promoBox = [];
        const allPromos=  document.querySelectorAll('#promoContainer [class*="promo"]');
    
        for (let i = 0; i < allPromos.length; i++) {
            const promoInputs = allPromos[i].querySelectorAll('input');
            const emptyObject = {};
            emptyObject.text = promoInputs[0].value
            emptyObject.link = promoInputs[1].value
            if( _.isEmpty(promoInputs[0].value)  || _.isEmpty(promoInputs[1].value) ) { 
                showMessage("卡友優惠專案 有欄位未填", false);
                return promoBox = false;
            }
            promoBox.push(emptyObject);
        }
        // console.log('promoBox:', promoBox)
        return promoBox;
    }

    // 詳細說明  送出
    function detailCount() {
        let detailBox = [];
        const detailInputs = document.querySelectorAll("#detailed input");
        detailInputs.forEach(function(item) {
            if( _.isEmpty(item.value) ) {
                showMessage("詳細說明 有欄位未填 <br />修改未送出", false);
                return detailBox = false;
            }
            detailBox.push(item.value);
        })
        return detailBox;
    }

    // 詳細說明 - 注意事項  送出
    function announceCount() {
        let announceBox = [];
        const announceInputs = document.querySelectorAll("#detailedNotice input");
        announceInputs.forEach(function(item) {
            if( _.isEmpty(item.value) ) {
                showMessage("詳細說明-注意事項 有欄位未填 <br />修改未送出", false);
                return  announceBox = false;
            }
            announceBox.push(item.value);
        })
        return announceBox;
    }

    /* sendModify 用到的function  end */


    function isLocked() {
        var allInputs = document.querySelectorAll('#bank-Form input[type=text]')
        var allBtn = document.querySelectorAll('#bank-Form button')
        var allRadiobox = document.querySelectorAll('#bank-Form input[type=radio]')
        var allCheckbox = document.querySelectorAll('#bank-Form input[type=checkbox]')
        allInputs.forEach(item => {
            item.classList.toggle('readonly')
            item.toggleAttribute("readonly");
        })

        allBtn.forEach(item=>{
            item.toggleAttribute("disabled"); 
        })

        allRadiobox.forEach(item=> {
            item.toggleAttribute("disabled"); 
        })
        allCheckbox.forEach(item=> {
            item.toggleAttribute("disabled"); 
        })
    }


}); 



// var detectUndefined = 
// Object.keys(mega_Data).map(function(objectKey, index) {
//     var value = mega_Data[objectKey];
//     // 第一層檢查 isShow
//     if(_.isUndefined(value) ) {
//         // console.log(objectKey+ ' is empty');
//         return false;
//     }
//     // 第二層檢查 gift.texts , promo.projects 
//     if(typeof mega_Data[objectKey] == 'object') {
//         for(var prop in mega_Data[objectKey]){
//             if( _.isUndefined(mega_Data[objectKey][prop])) {
//                 // console.log(objectKey ,prop+ ' isUndefined')
//                 return false;
//             }
//         }
//     }
//     // 第三層檢查 discount.detail.texts , discount.detail.announces
//     if( _.isUndefined(mega_Data['discount']['detail']['texts']) || _.isUndefined(mega_Data['discount']['detail']['announces']) ) {
//         return false;
//     }
//     return true;
// });

// var detect2 = function() {
    
// }