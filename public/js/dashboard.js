// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

import { showMessage } from './showMessage.js';
// import { searchBar } from '.searchBar.js';
import { drawForm } from './drawForm.js';

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

    /***  Form   (M) ****/ 
    let dataBox = []; // firebase.get 資料儲存區

    /***  Search Bar   1. sendSearch (C)  start ****/ 
    // 送出查詢
    function sendSearch() {
        let selectValue = document.getElementById("custom-select").value
        let docRef = firebase.firestore().collection("card").doc(selectValue);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                dataBox = doc.data(); // 資料儲存區
                console.log('dataBox:', dataBox)
                /***  Form  (C) ****/ 
                clearForm();
                drawForm(); // import from  ./drawForm.js
                setAllValue();
            } else {
                showMessage("No such document!", false)
            }
        }).catch(function(error) {
            // showMessage(error, false)
            console.log("Error getting document:", error);
        });
    }


    // 清除 bank-Form 內容(第二次送出查詢)
    function clearForm() {
        var bankForm = document.getElementById('bank-Form').children[0];
        if(bankForm) {
            bankForm.remove();
        }
    }

    // 寫入表單 
    function setAllValue() {
        
        initFillRadio('bankIsShow')
        // 一.分期
        setIdInput();
        setFanchiCheckbox(); // 分期checkbox
    
        // 二.刷卡滿額禮
        initFillRadio('gift'); // 刷卡滿額禮radio box
        initGiftDiv(); // create div + fill value  + 監控
    
        // 三.卡友優惠專案
        initFillRadio('promo');
        clickPromoEvent();
        initPromoDiv();
    
        // 四.紅利折扣
        initFillRadio('discount');
        // setDiscountRadio(); // 紅利折扣狀態
        setDiscountContent(); // 紅利折扣內容
        setDetailed(); // 詳細說明
        setDetailedNotice(); // 詳細說明-注意事項
    
    }
    
    /*****   Radio - 表格初始繪完 把資料填入Radio   *****/
    function initFillRadio(radioName) {

        var  isShowRadios = document.querySelectorAll(`#${radioName} input`)

        // 特殊處理 bankIsShow 在 dataBox.isShow
        if(radioName == "bankIsShow") {
            if(dataBox.isShow) {
                isShowRadios[0].checked = true;
            } else {
                isShowRadios[1].checked = true;
            }
        } 
        else if (dataBox[radioName].isShow) {
            isShowRadios[0].checked = true;
        } else {
            isShowRadios[1].checked = true;
        }

        // radio true || false 寫進 databox
        isShowRadios.forEach(function(item) {
            item.addEventListener("click", function() {
                var dataIsChecked =  document.querySelectorAll(`#${radioName} input:checked`);
                if(radioName == "bankIsShow") {
                    dataBox.isShow = dataIsChecked[0].value;
                } else {
                    dataBox[radioName].isShow = dataIsChecked[0].value;
                }
            })
        })
    }

    /***  一、分期 Input  ***/
    function setIdInput() {
        document.getElementById('id').value  = dataBox.id
        document.getElementById('name').value  = dataBox.name
        document.getElementById('iconUrl').value  = dataBox.iconUrl
        document.getElementById('logoUrl').value  = dataBox.logoUrl
    }

    /***  一、分期 checkbox ***/
    function setFanchiCheckbox() {
        // 將 data 裡面有的值寫進 Input       
        dataBox.plans.forEach((item) => {
            document.querySelectorAll('#plans input').forEach((item2) => {
                item = String(item);
                if (item == item2.value) {
                    item2.checked = true;
                    // console.log('item2:', item2)
                }
            });
        });

        // 把每個Input 加上 監控並回傳 dataBox
        document.querySelectorAll('#plans input').forEach((item) => {
            // console.log('item:', item)
            item.addEventListener("click",function() {
                var plansBox = [];
                var plansChecked = $('#plans input:checked');
            
                for (var i = 0; i < plansChecked.length; i++) {
                    plansBox.push(plansChecked[i].value);
                }
                dataBox.plans = plansBox;
                // console.log('plansBox:', plansBox)
            })
        })
    }

    /**** 二、刷卡滿額禮 start ***/
    /**** Template 樣板 ***/
    
    function initGiftDiv() {
        const newProject = document.getElementById("newProject");
        const giftTextsLength = dataBox.gift.texts.length;
        
        // 新增按鈕監控
        newProject.addEventListener('click', function() {
            Gift_Input_Button();
            checkGiftTextsValue(); // 更新 dataBox
        })
        // 根據資料長度 繪製模板(div input空得沒有值)
        for (let i = 0; i < giftTextsLength; i++) {
            Gift_Input_Button();
        }
        // 將模板內填入資料
        fillGiftValue()
    }
    
    // 文字欄 跟 按鈕 模板
    function Gift_Input_Button() {
        const createGift = document.createElement('div');
        const deleteBtn = document.createElement('button');
    
        createGift.classList.add("gift");
        createGift.innerHTML = GiftTemplate;
        
        deleteBtn.setAttribute('class', 'remove btn btn-danger');
        deleteBtn.innerText = "ㄧ";
        deleteBtn.addEventListener('click', function() {
            createGift.remove();
            checkGiftTextsValue(); // 更新 dataBox
        })
        createGift.prepend(deleteBtn);
        document.getElementById('giftContainer').appendChild(createGift);
        // 更新 dataBox
    }

    var GiftTemplate = `
        <h5>優惠 </h5>
        <div class="tr row">
            <label class="col-md-2">消費條件</label>
            <input class="col-md-9" type="text">
        </div>
        <div class="tr row">
            <label class="col-md-2">贈送</label>
            <input class="col-md-9" type="text">
        </div>
        <div class="tr row">
            <label class="col-md-2">備註</label>
            <input class="col-md-9" type="text">
        </div>
    `;


    function fillGiftValue() {
        const giftInputs = document.querySelectorAll('#giftContainer [class*="gift"]');
    
        for (let i = 0; i < giftInputs.length; i++) {
            const single_input = giftInputs[i].querySelectorAll('input')
            single_input[0].value = dataBox.gift.texts[i].condition
            single_input[1].value = dataBox.gift.texts[i].receive
            single_input[2].value = dataBox.gift.texts[i].remark        
        }
        // 初始畫面 活動日期 結束日期帶入
        // 注意事項 領取條件 活動詳情連結
        document.getElementById('begDt').value = dataBox.gift.begDt;
        document.getElementById('endDt').value = dataBox.gift.endDt;
        document.getElementById('announce').value = dataBox.gift.announce;
        document.getElementById('qualify').value = dataBox.gift.qualify;
        document.getElementById('link').value = dataBox.link;
    }

    /***  Search Bar - sendSearch (C)  END ****/ 
    /***  Search Bar  (C)  end ****/ 

    



    

    // 送出時 檢查 (二)刷卡滿額禮所有欄位
    function checkGiftTextsValue() {
        const giftTextsBox = [];
        const allGifts=  document.querySelectorAll('#giftContainer [class*="gift"]');
     
        for (let i = 0; i < allGifts.length; i++) {
            const giftInputsValue = allGifts[i].querySelectorAll('input')
            const emptyObject = {};
            emptyObject.condition =giftInputsValue[0].value
            emptyObject.receive =giftInputsValue[1].value
            emptyObject.remark =giftInputsValue[2].value    
            // if(giftInputsValue[0].value == "" || giftInputsValue[1].value == "") { 
            //      showMessage("刷卡滿額禮 有欄位未填", false);
            //      return;
            //  }
            giftTextsBox.push(emptyObject);
        }
        console.log('giftTextsBox:', giftTextsBox)
        // return giftTextsBox;
     }

     /**** 二、刷卡滿額禮 end  ***/

    
    /**********
    三、卡友優惠專案
    **********/
    // 優惠狀態 radio box set true
    var PromoTemplate = `
        <label class="col-md-3">專案名稱</label><input type="text" class="col-md-10">
        <label class="col-md-3">專案連結</label><input type="text" class="col-md-10">
    `;
    function Promo_Input_Button() {
        const createPromoCard = document.createElement('div');
        const deleteBtn = document.createElement('button');
        
        createPromoCard.classList.add("promo");
        createPromoCard.innerHTML = PromoTemplate;
        
        deleteBtn.setAttribute('class', 'remove btn-danger');
        deleteBtn.innerText = "ㄧ";
        deleteBtn.addEventListener('click', function() {
            createPromoCard.remove();
        })
        createPromoCard.prepend(deleteBtn);
        document.getElementById('promoContainer').appendChild(createPromoCard);
    }
    
    
    function clickPromoEvent() {
        const newPromo = document.getElementById("newPromo");
    
        newPromo.addEventListener('click', function() {
            Promo_Input_Button()
        })
    }
    
    function initPromoDiv() {
        const newPromo = document.getElementById("newPromo");
    
        const promoTextsLength = dataBox.promo.projects.length;
    
        for (let i = 0; i < promoTextsLength; i++) {
            Promo_Input_Button()
        }
        fillPromoValue()
    }
    
    function fillPromoValue() {
        const promoInputs = document.querySelectorAll('#promoContainer [class*="promo"]');
    
        for (let i = 0; i < promoInputs.length; i++) {
            const single_Input = promoInputs[i].querySelectorAll('input');
            single_Input[0].value = dataBox.promo.projects[i].text
            single_Input[1].value = dataBox.promo.projects[i].link
            
        }
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
    
        return promoBox;
    }
    
    /**********
    四、紅利折扣
    **********/
    
    function setDiscountContent() {
      document.getElementById('point').value = dataBox.discount.content.point;
      document.getElementById('back').value = dataBox.discount.content.back;
      document.getElementById('upper').value = dataBox.discount.content.upper;
      document.getElementById('lower').value = dataBox.discount.content.lower;
    }
    
    
    // render 詳細說明 Input , X
    function setDetailed() {
        const detailed =  document.getElementById('detailed');
        const detailLength = dataBox.discount.detail.texts.length;
        const addBtn = document.createElement('button')
        
        detailed.innerHTML = '';
     
        addBtn.setAttribute("class","btn btn-success d-block mb-3");
        addBtn.innerText = '＋';
        addBtn.onclick = function () {
            let addInput = document.createElement('input');
            let addDelBtn = document.createElement('button');
            
            addInput.setAttribute("type", "text");
            addInput.setAttribute("class", "detail col-md-11");
     
            addDelBtn.setAttribute('class', 'btn btn-danger');
            addDelBtn.innerText = "ㄧ";
            addDelBtn.addEventListener('click', function() {
                this.previousSibling.remove();
                this.remove();
            })
     
            detailed.append(addInput,addDelBtn);
        }
        detailed.prepend(addBtn)
     
         // Set Inputs Texts 
        for (let i = 0; i < detailLength; i++) {
             let detailTemplate = document.createElement('input');
             detailTemplate.setAttribute("type", "text");
             detailTemplate.classList.add('detail');
             detailTemplate.classList.add('col-md-11');
             detailTemplate.value = dataBox.discount.detail.texts[i]
     
             let detailDelBtn = document.createElement('button');
             detailDelBtn.setAttribute('class', 'btn btn-danger');
             detailDelBtn.innerText = "一";
             detailDelBtn.addEventListener('click', function() {
                 detailTemplate.remove()
                 detailDelBtn.remove();
             })
             detailed.appendChild(detailTemplate);
             detailed.appendChild(detailDelBtn);
        }
     
     }
     
    
     // render  注意事項 Input , Button
    function setDetailedNotice() {
        const detailedNotice = document.getElementById('detailedNotice');
        const noticeLength = dataBox.discount.detail.announces.length;
        const addBtn = document.createElement('button');
    
        detailedNotice.innerHTML = '';  
    
        addBtn.setAttribute("class","btn btn-success d-block mb-3");
        addBtn.innerText = '＋';
        addBtn.onclick = function () {
            let addInput = document.createElement('input');
            let addDelBtn = document.createElement('button');
            
            addInput.setAttribute("type", "text");
            addInput.setAttribute("class", "detail col-md-11");
    
            addDelBtn.setAttribute('class', 'btn btn-danger');
            addDelBtn.innerText = "ㄧ";
            addDelBtn.addEventListener('click', function() {
                this.previousSibling.remove();
                this.remove();
            })
            detailedNotice.append(addInput,addDelBtn);
        }
        
        detailedNotice.prepend(addBtn)
    
        // Set Inputs Texts
        for (let i = 0; i <noticeLength; i++) {
            let announceTemplate = document.createElement('input');
            announceTemplate.setAttribute("type", "text");
            announceTemplate.classList.add('detail');
            announceTemplate.classList.add('col-md-11');
            announceTemplate.value = dataBox.discount.detail.announces[i];
    
            let detailDelBtn = document.createElement('button');
            detailDelBtn.setAttribute('class', 'btn btn-danger');
            detailDelBtn.innerText = "一";
            detailDelBtn.addEventListener('click', function() {
                announceTemplate.remove()
                detailDelBtn.remove();
            })
    
            detailedNotice.appendChild(announceTemplate);      
            detailedNotice.appendChild(detailDelBtn);      
        }
    
    }
    
     // 詳細說明  送出
     function detailCount() {
        var detailBox = [];
        var detailInputs = document.querySelectorAll("#detailed input");
        detailInputs.forEach(function(item) {
            if(item.value == "") {
                showMessage("詳細說明 有欄位未填", false);
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
                showMessage("詳細說明-注意事項 有欄位未填", false);
                return ;
            }
           announceBox.push(item.value);
        })
        return announceBox;
    }
    
    // bankIsShow、刷卡滿額禮(二、) ～ 紅利折扣(四、) isShow
    // function checkDataIsShow(id) {
    //     var dataIsChecked = $('#'+id+' input:checked');
    //     console.log('dataIsChecked:', dataIsChecked)
    //     return dataIsChecked[0].value;
    // }


    function sendModify() {
        showMessage("已送出修改", true);
        console.log('dataBox',dataBox);
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






