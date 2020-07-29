
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

//  bankIsShow radio box 設true
function setBankRadiobox() {
    var bankIsShow = document.querySelectorAll('#bankIsShow input');

    if (dataBox.isShow) {
        bankIsShow[0].checked = true;
    } else {
        bankIsShow[1].checked = true;
    }
}

/**********
ㄧ、分期
**********/
// 3,6,10,12 收到資料後將分期checkbox 設true
function setFanchiCheckbox() {
    dataBox.plans.forEach((item) => {
        document.querySelectorAll('#plans input').forEach((item2) => {
        item = String(item);
        if (item == item2.value) {
            item2.checked = true;
        }
        });
    });
}

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
function checkBankIsShow() {
    var bankChecked = $('#bankIsShow input:checked');
    return bankChecked[0].value;
}

function checkGiftIsShow() {
  var giftChecked = $('#gift input:checked');
  return giftChecked[0].value;
}

function checkPromoIsShow() {
  var promoChecked = $('#promo input:checked');
  return promoChecked[0].value;
}

function checkDiscountIsShow() {
    var discountChecked = $('#discount input:checked');
    return discountChecked[0].value;
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
//  刷卡 radio box 設true
function setGiftRadiobox() {
  var gift = document.querySelectorAll('#gift input');

  if (dataBox.gift.isShow) {
    gift[0].checked = true;
  } else {
    gift[1].checked = true;
  }
}

// 文字欄 跟 按鈕 模板
function Gift_Input_Button() {
    const createGift = document.createElement('div');
    const deleteBtn = document.createElement('button');

    createGift.classList.add("gift");
    createGift.innerHTML = GiftTemplate;
    
    deleteBtn.setAttribute('class', 'remove btn-danger');
    deleteBtn.innerText = "X";
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
             showToast("刷卡滿額禮 有欄位未填", false);
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
function setPromoRadio() {
  var promo = document.querySelectorAll('#promo input');

  if (dataBox.promo.isShow) {
    promo[0].checked = true;
  } else {
    promo[1].checked = true;
  }
}

function Promo_Input_Button() {
    const createPromoCard = document.createElement('div');
    const deleteBtn = document.createElement('button');
    
    createPromoCard.classList.add("promo");
    createPromoCard.innerHTML = PromoTemplate;
    
    deleteBtn.setAttribute('class', 'remove btn-danger');
    deleteBtn.innerText = "X";
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
            showToast("卡友優惠專案 有欄位未填", false);
            return;
        }
        promoBox.push(emptyObject);
    }

    return promoBox;
}

/**********
四、紅利折扣
**********/

function setDiscountRadio() {
    var discount = document.querySelectorAll('#discount input');
    if (dataBox.discount.isShow) {
        discount[0].checked = true;
      } else {
        discount[1].checked = true;
    }
}

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
    addBtn.innerText = '+';
    addBtn.onclick = function () {
        let addInput = document.createElement('input');
        let addDelBtn = document.createElement('button');
        
        addInput.setAttribute("type", "text");
        addInput.setAttribute("class", "detail col-md-11");
 
        addDelBtn.setAttribute('class', 'btn btn-danger');
        addDelBtn.innerText = "X";
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
         detailDelBtn.innerText = "X";
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
    addBtn.innerText = '+';
    addBtn.onclick = function () {
        let addInput = document.createElement('input');
        let addDelBtn = document.createElement('button');
        
        addInput.setAttribute("type", "text");
        addInput.setAttribute("class", "detail col-md-11");

        addDelBtn.setAttribute('class', 'btn btn-danger');
        addDelBtn.innerText = "X";
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
        detailDelBtn.setAttribute('class', 'btn-danger');
        detailDelBtn.innerText = "X";
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
            showToast("詳細說明 有欄位未填", false);
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
            showToast("詳細說明-注意事項 有欄位未填", false);
            return ;
        }
       announceBox.push(item.value);
    })
    return announceBox;
}

// 寫入表單 
function setAllValue() {
    // 把值代入 render完成的 表單
    setBankRadiobox();
    // 一.分期
    setIdInput();
    setFanchiCheckbox(); // 分期checkbox

    // 二.刷卡滿額禮
    setGiftRadiobox(); // 刷卡滿額禮radio box
    clickGiftEvent();
    initGiftDiv();
    setGiftsValue(); // 活動日期 注意事項 領取條件 活動詳情連結

    // 三.卡友優惠專案
    setPromoRadio(); // 卡友優惠專案狀態
    clickPromoEvent();
    initPromoDiv();

    // 四.紅利折扣
    setDiscountRadio(); // 紅利折扣狀態
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
                    <input class="form-check-input" type="radio" name="bankIsShow1" id="bankIsShow1" value="true" onclick="checkBankIsShow()">
                    <label class="form-check-label" for="bankIsShow1">上架</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="bankIsShow1" id="bankIsShow2" value="false" onclick="checkBankIsShow()">
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
                        <input class="form-check-input message" type="checkbox" id="inlineCheckbox1" value="3" onclick="plansCount()">
                        <label class="form-check-label" for="inlineCheckbox1">3期</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input message" type="checkbox" id="inlineCheckbox2" value="6" onclick="plansCount()">
                        <label class="form-check-label" for="inlineCheckbox2">6期</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input message" type="checkbox" id="inlineCheckbox3" value="10" onclick="plansCount()">
                        <label class="form-check-label" for="inlineCheckbox3">10期</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input message" type="checkbox" id="inlineCheckbox4" value="12" onclick="plansCount()">
                        <label class="form-check-label" for="inlineCheckbox4">12期</label>
                    </div>

                </div>
            </div>


            <h2>二. 刷卡滿額禮</h2>
            <hr />

            <div class="tr" id="gift">
                <label class="form-label" style="display: block;">刷卡滿額禮狀態<span class="form-required">*</span></label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="giftIsShow1" id="giftIsShow1" value="true" onclick="checkGiftIsShow()">
                    <label class="form-check-label" for="giftIsShow1">上架</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="giftIsShow1" id="giftIsShow2" value="false" onclick="checkGiftIsShow()">
                    <label class="form-check-label" for="giftIsShow2">下架</label>
                </div>
            </div>

            <div class="tr row">
                <div class="col-md-2 cornflowerblue">專案</div>
                <div class="col-md-10">
                    <div class="addSection">
                        <button id="newProject" class="btn btn-info">新增專案</button>
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
                    <input class="form-check-input" type="radio" name="promoIsShow1" id="promoIsShow1" value="true" onclick="checkPromoIsShow()">
                    <label class="form-check-label" for="promoIsShow1">上架</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="promoIsShow1" id="promoIsShow2" value="false" onclick="checkPromoIsShow()">
                    <label class="form-check-label" for="promoIsShow2">下架</label>
                </div>
            </div>

            <div class="tr row">
                <div class="col-md-2 cornflowerblue">卡友優惠專案</div>
                <div class="col-md-10">
                    <div class="addSection">
                        <button id="newPromo" class="btn btn-info">新增卡友優惠專案</button>
                    </div>

                    <div id="promoContainer"></div>
                </div>
            </div>

            <h2>四. 紅利折扣</h2>
            <hr />
            <div class="tr" id="discount">
                <label class="form-label" style="display: block;">紅利折扣狀態<span class="form-required">*</span></label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="discountIsShow1" id="discountIsShow1" value="true" onclick="checkDiscountIsShow()">
                    <label class="form-check-label" for="discountIsShow1">上架</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="discountIsShow1" id="discountIsShow2" value="false" onclick="checkDiscountIsShow()">
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
                <div class="col-md-2 cornflowerblue">詳細說明 - 注意事項</div>
                <div class="col-md-10 d-block" id="detailedNotice">

                </div>
            </div>

        </div>
        `;
}
