// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

import { showMessage } from './showMessage.js';
// import { searchBar} from '.searchBar.js';


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


    /***  Search Bar  ****/
    let dataBox = []; // firebase.get 資料儲存區


    // 進入 dashboard.html 將bank資料載入 select
    function bankListInquiry() {
        const db = firebase.firestore();
        db.collection("bankList").get().then(function(querySnapshot) {
            let bankBox = [];
            querySnapshot.forEach(function(doc) {
                bankBox.push(doc.data());
            });

            let customSelect = document.getElementById('custom-select');
            Object.keys(bankBox[0]).sort().forEach(function(item) {
                var option = document.createElement("option");
                option.value = item;
                option.text  = bankBox[0][item];
                customSelect.appendChild(option);
            })
        });
    }

    bankListInquiry()

    // 清除 bank-table 內容(第二次送出查詢)
    function clearTable() {
        var bankTable = document.getElementById('bank-table').children[0];
        if(bankTable) {
            bankTable.remove();
        }
    }
    // 送出查詢
    function sendSearch() {
        let selectValue = document.getElementById("custom-select").value
        let docRef = firebase.firestore().collection("card").doc(selectValue);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                clearTable();
                dataBox = doc.data(); // 資料儲存區
                console.log('dataBox:', dataBox)
                drawTable();
                setAllValue();

            } else {
                showMessage("No such document!", false)
            }
        }).catch(function(error) {
            // showMessage(error, false)
            console.log("Error getting document:", error);
        });
    }

    function sendModify() {
        showMessage("已送出修改", true);
        console.log('dataBox',dataBox);
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
        let ID = document.getElementById('id').value;
        // ID: mega
        var db = firebase.firestore();
        var sfDocRef = db.collection("card").doc(ID);

        return db.runTransaction(function(transaction) {
            return transaction.get(sfDocRef).then(function(sfDoc) {
                if (!sfDoc.exists) {
                    throw "Document does not exist!";
                }
                console.log('sfDoc:', sfDoc.data())
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



    const selectBtn = document.getElementById('select-btn')
    const confirmBtn = document.getElementById('confirm-btn')
    selectBtn.addEventListener('click', function() {
        sendSearch();
    })
    confirmBtn.addEventListener('click', function() {
        sendModify();
    })
      
    
    /*****************
    **  Template 樣板
    *****************/
    
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
    
    var PromoTemplate = `
    <label class="col-md-3">專案名稱</label><input type="text" class="col-md-10">
    <label class="col-md-3">專案連結</label><input type="text" class="col-md-10">
    `;
    
    /*****************
    **  function
    *****************/

    /*****   Radio   *****/
    // 表格初始繪完 把資料填入Radio
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

        isShowRadios[0].addEventListener("click", function() {
            var dataIsChecked =  document.querySelectorAll(`#${radioName} input:checked`);
            if(radioName == "bankIsShow") {
                dataBox.isShow = dataIsChecked[0].value;
            } else {
                dataBox[radioName].isShow = dataIsChecked[0].value;
            }
        })

        isShowRadios[1].addEventListener("click", function() {
            var dataIsChecked =  document.querySelectorAll(`#${radioName} input:checked`);
            if(radioName == "bankIsShow") {
                dataBox.isShow = dataIsChecked[0].value;
            } else {
                dataBox[radioName].isShow = dataIsChecked[0].value;
            }
        })
    }

    /**********
    ㄧ、分期
    **********/
    // 3,6,10,12 收到資料後將分期checkbox 設true
    function setFanchiCheckbox() {
        // dataBox.plans.forEach((item) => {
        //     document.querySelectorAll('#plans input').forEach((item2) => {
        //     item = String(item);
        //     if (item == item2.value) {
        //         item2.checked = true;
        //         console.log('item2:', item2)
        //     }
        //     });
        // });

        // document.querySelectorAll('#plans input').forEach((item) => {
        //     item = String(item);
        //     console.log('item:', item)
        //     if(dataBox.)
        // })

    }
    console.log('dataBox:', dataBox)
    //  3,6,10,12 點擊後觸發
    function plansCount() {
        var plansBox = [];
        var plansChecked = $('#plans input:checked');
    
        for (var i = 0; i < plansChecked.length; i++) {
            plansBox.push(plansChecked[i].value);
        }
        return plansBox;
    }
    
    
    // bankIsShow、刷卡滿額禮(二、) ～ 紅利折扣(四、) isShow
    function checkDataIsShow(id) {
        var dataIsChecked = $('#'+id+' input:checked');
        console.log('dataIsChecked:', dataIsChecked)
        return dataIsChecked[0].value;
    }

    function setIdInput() {
        document.getElementById('id').value  = dataBox.id
        document.getElementById('name').value  = dataBox.name
        document.getElementById('iconUrl').value  = dataBox.iconUrl
        document.getElementById('logoUrl').value  = dataBox.logoUrl
    }
    
    /**********
    二、刷卡滿額禮
    **********/

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
        })
        createGift.prepend(deleteBtn);
        document.getElementById('giftContainer').appendChild(createGift);
    }
    
    // click to add gift
    function clickGiftEvent() {
        const newProject = document.getElementById("newProject");
    
        newProject.addEventListener('click', function() {
            Gift_Input_Button();
        })
    }
    
    function initGiftDiv() {
        const newProject = document.getElementById("newProject");
    
        const giftTextsLength = dataBox.gift.texts.length;
    
        for (let i = 0; i < giftTextsLength; i++) {
            Gift_Input_Button();
        }
        fillGiftValue()
    }
    
    function fillGiftValue() {
        const giftInputs = document.querySelectorAll('#giftContainer [class*="gift"]');
    
        for (let i = 0; i < giftInputs.length; i++) {
            const single_input = giftInputs[i].querySelectorAll('input')
            single_input[0].value = dataBox.gift.texts[i].condition
            single_input[1].value = dataBox.gift.texts[i].receive
            single_input[2].value = dataBox.gift.texts[i].remark        
        }
    }
    
    // 初始畫面 活動日期 結束日期帶入
    // 注意事項 領取條件 活動詳情連結
    function setGiftsValue() {
      document.getElementById('begDt').value = dataBox.gift.begDt;
      document.getElementById('endDt').value = dataBox.gift.endDt;
      document.getElementById('announce').value = dataBox.gift.announce;
      document.getElementById('qualify').value = dataBox.gift.qualify;
      document.getElementById('link').value = dataBox.link;
    }
    
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
            if(giftInputsValue[0].value == "" || giftInputsValue[1].value == "") { 
                 showMessage("刷卡滿額禮 有欄位未填", false);
                 return;
             }
            giftTextsBox.push(emptyObject);
        }
        return giftTextsBox;
     }
    
    /**********
    三、卡友優惠專案
    **********/
    // 優惠狀態 radio box set true
    
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
    
    // 寫入表單 
    function setAllValue() {
        // 把值代入 render完成的 表單
        // setBankRadiobox();
        initFillRadio('bankIsShow')
        // 一.分期
        setIdInput();
        setFanchiCheckbox(); // 分期checkbox
    
        // 二.刷卡滿額禮
        initFillRadio('gift'); // 刷卡滿額禮radio box
        clickGiftEvent();
        initGiftDiv();
        setGiftsValue(); // 活動日期 注意事項 領取條件 活動詳情連結
    
        // 三.卡友優惠專案
        initFillRadio('promo');
        // setPromoRadio(); // 
        clickPromoEvent();
        initPromoDiv();
    
        // 四.紅利折扣
        initFillRadio('discount');
        // setDiscountRadio(); // 紅利折扣狀態
        setDiscountContent(); // 紅利折扣內容
        setDetailed(); // 詳細說明
        setDetailedNotice(); // 詳細說明-注意事項
    
    }
    
    function drawTable() {
      var tbl = document.getElementById('bank-table');
    
      tbl.innerHTML = `
            <div class="thead">
                <div class="tr" id="bankIsShow">
                    <label class="form-label" style="display: block;">銀行顯示狀態<span class="form-required">*</span></label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="bankIsShow1" id="bankIsShow1" value="true">
                        <label class="form-check-label" for="bankIsShow1">上架</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="bankIsShow1" id="bankIsShow2" value="false">
                        <label class="form-check-label" for="bankIsShow2">下架</label>
                    </div>
                </div>
                <div class="tr row">
                    <div class="col-md-2 cornflowerblue">id</div>
                    <input type="text" class="col-md-10 readonly" id="id" readonly>
                </div>
                <div class="tr row">
                    <div class="col-md-2 cornflowerblue">name</div>
                    <input type="text" class="col-md-10 readonly" id="name" readonly>
                </div>
                <div class="tr row">
                    <div class="col-md-2 cornflowerblue">iconUrl</div>
                    <input type="text" class="col-md-10" id="iconUrl">
                </div>
                <div class="tr row">
                    <div class="col-md-2 cornflowerblue">logoUrl</div>
                    <input type="text" class="col-md-10" id="logoUrl">
                </div>
                <div class="tr row">
                    <div class="col-md-2 cornflowerblue">適用無息分期<span class="form-required">*</span></div>
                    <div class="col-md-10 d-block"  id="plans">
                        <div class="form-check">
                        <input class="form-check-input message" type="checkbox" id="inlineCheckbox1" value="3">
                        <label class="form-check-label" for="inlineCheckbox1">3期</label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input message" type="checkbox" id="inlineCheckbox2" value="6">
                        <label class="form-check-label" for="inlineCheckbox2">6期</label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input message" type="checkbox" id="inlineCheckbox3" value="10">
                        <label class="form-check-label" for="inlineCheckbox3">10期</label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input message" type="checkbox" id="inlineCheckbox4" value="12">
                        <label class="form-check-label" for="inlineCheckbox4">12期</label>
                        </div>
                    </div>
                </div>
                <h2>二. 刷卡滿額禮</h2>
                <hr />
                <div class="tr" id="gift">
                    <label class="form-label" style="display: block;">刷卡滿額禮狀態<span class="form-required">*</span></label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="giftIsShow1" id="giftIsShow1" value="true">
                        <label class="form-check-label" for="giftIsShow1">上架</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="giftIsShow1" id="giftIsShow2" value="false">
                        <label class="form-check-label" for="giftIsShow2">下架</label>
                    </div>
                </div>
                <div class="tr row">
                    <div class="col-md-2 cornflowerblue">專案</div>
                    <div class="col-md-10">
                        <div class="addSection">
                        <button id="newProject" class="btn btn-info">新增專案 ＋</button>
                        </div>
                        <div id="giftContainer"></div>
                    </div>
                </div>
                <div class="tr row">
                    <div class="col-md-2 cornflowerblue">活動日期</div>
                    <div class="col-md-10 d-block">
                        <label>活動日期</label>
                        <input type="text" class="col-md-12 mb-3" id="begDt">
                        <input type="text" class="col-md-12" id="endDt">
                    </div>
                </div>
                <div class="tr row">
                    <div class="col-md-2 cornflowerblue">注意事項</div>
                    <input type="text" class="col-md-10" id="announce">
                </div>
                <div class="tr row">
                    <div class="col-md-2 cornflowerblue">領取條件</div>
                    <input type="text" class="col-md-10" id="qualify">
                </div>
                <div class="tr row">
                    <div class="col-md-2 cornflowerblue">活動詳情連結</div>
                    <input type="text" class="col-md-10" id="link">
                </div>
                <h2>三. 卡友優惠專案</h2>
                <hr />
                <div class="tr" id="promo">
                    <label class="form-label" style="display: block;">卡友優惠專案狀態<span class="form-required">*</span></label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="promoIsShow1" id="promoIsShow1" value="true">
                        <label class="form-check-label" for="promoIsShow1">上架</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="promoIsShow1" id="promoIsShow2" value="false">
                        <label class="form-check-label" for="promoIsShow2">下架</label>
                    </div>
                </div>
                <div class="tr row">
                    <div class="col-md-2 cornflowerblue">卡友優惠專案</div>
                    <div class="col-md-10">
                        <div class="addSection">
                        <button id="newPromo" class="btn btn-info">新增卡友優惠專案 ＋</button>
                        </div>
                        <div id="promoContainer"></div>
                    </div>
                </div>
                <h2>四. 紅利折扣</h2>
                <hr />
                <div class="tr" id="discount">
                    <label class="form-label" style="display: block;">紅利折扣狀態<span class="form-required">*</span></label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="discountIsShow1" id="discountIsShow1" value="true">
                        <label class="form-check-label" for="discountIsShow1">上架</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="discountIsShow1" id="discountIsShow2" value="false">
                        <label class="form-check-label" for="discountIsShow2">下架</label>
                    </div>
                </div>
                <div class="tr row">
                    <div class="col-md-2 cornflowerblue">紅利折扣內容</div>
                    <div class="col-md-10 d-block">
                        <label class="d-block">紅利折扣內容</label>
                        <input type="text" class="col-md-10" id="point">
                        <label class="d-block">折抵</label>
                        <input type="text" class="col-md-10" id="back">
                        <label class="d-block">最高上限折抵</label>
                        <input type="text" class="col-md-10" id="upper">
                        <label class="d-block">刷卡最低限制</label>
                        <input type="text" class="col-md-10" id="lower">
                    </div>
                </div>
                <div class="tr row">
                    <div class="col-md-2 cornflowerblue">詳細說明</div>
                    <div class="col-md-10 d-block" id="detailed">
                    </div>
                </div>
                <div class="tr row">
                    <div class="col-md-2 cornflowerblue">詳細說明ㄧ注意事項</div>
                    <div class="col-md-10 d-block" id="detailedNotice">
                    </div>
                </div>
            </div>
        `;
    }
    







}); 






