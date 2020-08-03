// dashboard.js (firestore && Auth && 搜尋資料和送出)
// dataForm.js  (搜尋後 生成表單template)
// fillValue.js (表單資料內容操作)

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

import { showMessage } from './showMessage.js';
import { drawForm } from './drawForm.js';
import { fillValue } from './fillValue.js';

document.addEventListener('DOMContentLoaded', function () {  
    /***  登入 && 登出 start    ****/
    let detect = false;

    // 確認是否登入
    firebase.auth().onAuthStateChanged(function (userInfo) {
      // User is signed in.
      if (userInfo) {
          var user = firebase.auth().currentUser;
          user.providerData.forEach(function (profile) {
              console.log("Provider-specific UID: " + profile.uid);
              showMessage('Success signIn', true);
          });
      } else {
        // No user is signed in
        if (detect == false) {
            localStorage.setItem("authStorage", `You have not signIn`);
            console.error('user is null');
            window.location = "/";
        } else {
            localStorage.setItem("authStorage", `Sign out!`);
            window.location = "/";
        }
      }
    });

    function signOut() {
        detect = true;
        firebase.auth().signOut().then(function() {
            localStorage.setItem("authStorage", `Sign out !`);
        })
    }

    document.getElementById('signOut').addEventListener("click", function() {
        signOut();
    })

    /***  登入 && 登出 end    ****/


    /***  Search Bar  (V) ****/ 
    // Selector
    function setbankSelector() {
        const db = firebase.firestore();
        db.collection("card").get().then(function(querySnapshot) {
            let bankBox = [];  /***  Search Bar  (M) ****/ 
            let customSelect = document.getElementById('custom-select');

            querySnapshot.forEach(function(doc) {
                var option = document.createElement("option");
                
                bankBox.push(doc.data());
                option.value = doc.id;
                option.text = doc.data().name;
                customSelect.appendChild(option)
            });
        });
    }
    
    setbankSelector()

    /***  Search Bar  (C)  start ****/ 
    const selectBtn = document.getElementById('select-btn')


    selectBtn.addEventListener('click', function() {
        sendSearch();
    })


    // 送出查詢
    function sendSearch() {
        let selectValue = document.getElementById("custom-select").value
        let docRef = firebase.firestore().collection("card").doc(selectValue);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                drawForm(); // import from  ./drawForm.js
                fillValue(doc.data());
            } else {
                showMessage("No such document!", false)
            }
        }).catch(function(error) {
            // showMessage(error, false)
            console.log("Error getting document:", error);
        });
    }
    const confirmBtn = document.getElementById('confirm-btn')
    confirmBtn.addEventListener('click', function() {
        sendModify();
    })
    // 送出修改
    function sendModify() {
        showMessage("已送出修改", true);
        console.log('目前修改中...');
        var dataBa = {
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
        console.log('dataBa:', dataBa);
        var ID = document.getElementById('id').value;
        // // ID: mega
        var db = firebase.firestore();
        var sfDocRef = db.collection("card").doc(ID);

        return db.runTransaction(function(transaction) {
            return transaction.get(sfDocRef).then(function(sfDoc) {
                if (!sfDoc.exists) {
                    throw "Document does not exist!";
                }
                // console.log('sfDoc:', sfDoc.data())
                sfDocRef.set(dataBa).then(function() {
                    console.log("Document successfully written!");
                });
            });
        }).then(function() {
            console.log("Transaction successfully committed!");
        }).catch(function(error) {
            console.log("Transaction failed: ", error);
        });
    }


    /**** sendModify 用到的function  start ****/
    
    // Radio isShow value
    function checkDataIsShow(id) {
        var dataIsChecked = $('#'+id+' input:checked');
        var isTrueSet = (dataIsChecked[0].value == 'true'); // 將"true" 轉成 true 

        return isTrueSet;
    }

    //  3,6,10,12 點擊後觸發 (databox.plans)
    function plansCount() {
        var plansBox = [];
        var plansChecked = $('#plans input:checked');

        for (var i = 0; i < plansChecked.length; i++) {
            plansBox.push(plansChecked[i].value);
        }
        return plansBox;
    }

   // 送出時 檢查 (二)刷卡滿額禮所有欄位 (databox.gift.texts)
   function checkGiftTextsValue() {
        const giftTextsBox = [];
        const allGifts=  document.querySelectorAll('#giftContainer [class*="gift"]');

        for (let i = 0; i < allGifts.length; i++) {
            const giftInputsValue = allGifts[i].querySelectorAll('input')
            const emptyObject = {};
            emptyObject.condition =giftInputsValue[0].value
            emptyObject.receive =giftInputsValue[1].value
            emptyObject.remark =giftInputsValue[2].value    
            if(giftInputsValue[0].value == "" || giftInputsValue[1].value == "") { 
                 showMessage("刷卡滿額禮 有欄位未填", false);
                 return;
             }
            giftTextsBox.push(emptyObject);
        }
        // console.log('giftTextsBox:', giftTextsBox)
        return giftTextsBox;
    }


    function checkPromoProjectValue() {
        var promoBox = [];
        var allPromos=  document.querySelectorAll('#promoContainer [class*="promo"]');
    
        for (let i = 0; i < allPromos.length; i++) {
            var promoInputsValue = allPromos[i].querySelectorAll('input');
            var emptyObject = {};
            emptyObject.text =promoInputsValue[0].value
            emptyObject.link =promoInputsValue[1].value
            if(promoInputsValue[0].value == "" || promoInputsValue[1].value == "") { 
                showMessage("卡友優惠專案 有欄位未填", false);
                return;
            }
            promoBox.push(emptyObject);
        }
        // console.log('promoBox:', promoBox)
        return promoBox;
    }

    // 詳細說明  送出
    function detailCount() {
        var detailBox = [];
        var detailInputs = document.querySelectorAll("#detailed input");
        detailInputs.forEach(function(item) {
            if(item.value == "") {
                showMessage("詳細說明 有欄位未填 <br />修改未送出", false);
                return ;
            }
            detailBox.push(item.value);
        })
        return detailBox;
    }

    // 詳細說明 - 注意事項  送出
    function announceCount() {
        var announceBox = [];
        var announceInputs = document.querySelectorAll("#detailedNotice input");
        announceInputs.forEach(function(item) {
            if(item.value == "") {
                showMessage("詳細說明-注意事項 有欄位未填 <br />修改未送出", false);
                return ;
            }
        announceBox.push(item.value);
        })
        return announceBox;
    }

    /* sendModify 用到的function  end */

}); 
