// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

import { showMessage } from './showMessage.js';
// import { searchBar } from '.searchBar.js';
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
    const confirmBtn = document.getElementById('confirm-btn')
    selectBtn.addEventListener('click', function() {
        sendSearch();
    })
    confirmBtn.addEventListener('click', function() {
        sendModify();
    })


   

    /***  Search Bar   1. sendSearch (C)  start ****/ 
    // 送出查詢
    function sendSearch() {
        let selectValue = document.getElementById("custom-select").value
        let docRef = firebase.firestore().collection("card").doc(selectValue);

        docRef.get().then(function(doc) {
            if (doc.exists) {
              
                
                /***  Form  (C) ****/ 
               
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



    // bankIsShow、刷卡滿額禮(二、) ～ 紅利折扣(四、) isShow
    // function checkDataIsShow(id) {
    //     var dataIsChecked = $('#'+id+' input:checked');
    //     console.log('dataIsChecked:', dataIsChecked)
    //     return dataIsChecked[0].value;
    // }


    function sendModify() {
        showMessage("已送出修改", true);
        console.log('目前修改中...');
        // var dataBa = {
        //     id: document.getElementById('id').value,
        //     isShow: checkDataIsShow("bankIsShow"),
        //     name: document.getElementById('name').value,
        //     iconUrl: document.getElementById('iconUrl').value,
        //     logoUrl: document.getElementById('logoUrl').value,
        //     link: document.getElementById('link').value,
        //     plans: plansCount(),
        //     gift: {
        //         isShow: checkDataIsShow("gift"),
        //         texts:  checkGiftTextsValue(),
        //         begDt: document.getElementById('begDt').value,
        //         endDt: document.getElementById('endDt').value,
        //         announce: document.getElementById('announce').value,
        //         qualify: document.getElementById('qualify').value,
        //     },

        //     promo: {
        //         isShow: checkDataIsShow("promo"),
        //         projects: checkPromoProjectValue()
        //     },
        //     discount: {
        //         isShow: checkDataIsShow("discount"),
        //         content: {
        //             point: document.getElementById('point').value,
        //             back: document.getElementById('back').value,
        //             upper: document.getElementById('upper').value,
        //             lower: document.getElementById('lower').value,
        //         },
        //         detail: {
        //             announces: announceCount(),
        //             texts: detailCount()
        //         }
        //     }
        // };
        // console.log('dataBa:', dataBa);
        // let ID = document.getElementById('id').value;
        // // ID: mega
        // var db = firebase.firestore();
        // var sfDocRef = db.collection("card").doc(ID);

        // return db.runTransaction(function(transaction) {
        //     return transaction.get(sfDocRef).then(function(sfDoc) {
        //         if (!sfDoc.exists) {
        //             throw "Document does not exist!";
        //         }
        //         console.log('sfDoc:', sfDoc.data())
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
