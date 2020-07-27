function plansCount() {
  var plansBox = [];
  var plansChecked = $('#plans input:checked');

  for (var i = 0; i < plansChecked.length; i++) {
    plansBox.push(plansChecked[i].value);
  }
  console.log('plansBox:', plansBox);
  return plansBox;
}

function checkGiftIsShow() {
  var giftChecked = $('#gift input:checked');
//   console.log('giftChecked', giftChecked[0].value);
  return giftChecked[0].value;
}
function checkPromoIsShow() {
  var promoChecked = $('#promo input:checked');
  console.log('promoChecked', promoChecked[0].value);
  return promoChecked[0].value;
}

function checkDiscountIsShow() {
    var discountChecked = $('#discount input:checked');
    console.log('discountChecked', discountChecked[0].value);
    return discountChecked[0].value;
  }

function parsingObj() {}

// 一、

function setIdInput() {
    document.getElementById('id').value  = dataBox.id
    document.getElementById('name').value  = dataBox.name
}

// 初始畫面 收到資料後將分期checkbox 設true
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
// 二、
// 初始畫面 刷卡滿額禮radio box 設true

function setGiftRadiobox() {
  var gift = document.querySelectorAll('#gift input');

  if (dataBox.gift.isShow) {
    gift[0].checked = true;
  } else {
    gift[1].checked = true;
  }
}

// 第一次查詢 加入優惠數量的值
var initGift = true;
function setGiftDiv(num) {
    if(initGift == true) {
        initGift == false;
        var giftSelector = document.getElementById("giftSelector");
        giftSelector.addEventListener("change", giftNumChange);
        giftSelector.value = num;
    }
    
    var gitfId = document.getElementById('gift-container');
    // clear All child elements
    gitfId.innerHTML = '';
    for(var i=1; i<=num; i++) {
        var giftTemplate = document.createElement('div');
        giftTemplate.classList.add('gift-'+ i );
        giftTemplate.innerHTML = `
            <h5>優惠 ${i}</h5>
            <div class="row">
                <label class="col-md-2">消費條件</label>
                <input class="col-md-9" type="text">
            </div>
            <div class="row">
                <label class="col-md-2">贈送</label>
                <input class="col-md-9" type="text">
            </div>
            <div class="row">
                <label class="col-md-2">備註</label>
                <input class="col-md-9" type="text">
            </div>
        `
        gitfId.appendChild(giftTemplate);
    }
    fillGiftValue(num);
}

function giftNumChange() {
    var numChange = document.getElementById('giftSelector').value;
    console.log('numChange:', numChange)
    setGiftDiv(numChange);
}

function fillGiftValue(num) {
    for (let i = 0; i < dataBox.gift.texts.length; i++) {
            // 優惠數量 比 資料少時 不要寫入避免跳error
            if(i == num) { return ;}
            var giftInputs = document.querySelectorAll('.gift-'+(i+1)+' input');
            giftInputs[0].value = dataBox.gift.texts[i]['條件']
            giftInputs[1].value = dataBox.gift.texts[i]['贈送']
            giftInputs[2].value = dataBox.gift.texts[i]['備註']
    }
}

function checkGiftTextsValue() {
   var giftTextsBox = [];
   var allGifts=  document.querySelectorAll('#gift-container [class*="gift"]');

   for (let i = 0; i < allGifts.length; i++) {
       var giftInputsValue = allGifts[i].querySelectorAll('input')
       var emptyObject = {};
       emptyObject.條件 =giftInputsValue[0].value
       emptyObject.贈送 =giftInputsValue[1].value
       emptyObject.備註 =giftInputsValue[2].value    
       if(giftInputsValue[0].value == "" || giftInputsValue[1].value == "") { 
            showToast("刷卡滿額禮 有欄位未填", false);
            return;
        }
       giftTextsBox.push(emptyObject);
   }
   return giftTextsBox;
}

// 初始畫面 活動日期 結束日期帶入
// 注意事項 領取條件 活動詳情連結
function setGiftsValue() {
  document.getElementById('begDt').value = dataBox.gift.begDt;
  document.getElementById('endDt').value = dataBox.gift.endDt;
  document.getElementById('notices').value = dataBox.gift.注意事項;
  document.getElementById('requisitions').value = dataBox.gift.領取條件;
  document.getElementById('link').value = dataBox.link;
}


// 三、
// 優惠狀態 radio box set true
function setPromoRadio() {
  var promo = document.querySelectorAll('#promo input');

  if (dataBox.promo.isShow) {
    promo[0].checked = true;
  } else {
    promo[1].checked = true;
  }
}

// 第一次查詢 加入專案數量的值
var initPromo = true;
function setPromoProjectDiv(num) {
    if(initPromo == true) {
        initPromo == false;
        var promoSelector = document.getElementById("promoSelector");
        promoSelector.addEventListener("change", promoNumChange);
        promoSelector.value = num;
    }
    var promoDiv = document.getElementById('promo-container');
     // clear All child elements
    promoDiv.innerHTML = '';
    for(var i=1; i<=num; i++) {
        var promoTemplate = document.createElement('div');
        promoTemplate.classList.add('promo-'+ i);
        promoTemplate.innerHTML = `
        <label class="col-md-3">專案名稱</label><input type="text" class="col-md-9">
        <label class="col-md-3">專案連結</label><input type="text" class="col-md-9">
        `;
        promoDiv.appendChild(promoTemplate);
    }
    fillPromoValue(num);
}

function fillPromoValue(val) {

    for (let i = 0; i < dataBox.promo.project.length; i++) {
        // 專案數量 比 資料少時 不要寫入避免跳error
        if(i == val) { return ;}
        var promoInputs  =document.querySelectorAll('.promo-1'+ ' input');
        promoInputs[0].value = dataBox.promo.project[i]['text'];
        promoInputs[1].value = dataBox.promo.project[i]['link'];
    }

}

function promoNumChange() {
    var promoNumChange = document.getElementById('promoSelector').value;
    console.log('PromonumChange:', promoNumChange)
    setPromoProjectDiv(promoNumChange);
}



function checkPromoProjectValue() {
    var promoBox = [];
    var allPromos=  document.querySelectorAll('#promo-container [class*="promo"]');
 
    for (let i = 0; i < allPromos.length; i++) {
        var promoInputsValue = allPromos[i].querySelectorAll('input');
        var emptyObject = {};
        emptyObject.專案名稱 =promoInputsValue[0].value
        emptyObject.專案連結 =promoInputsValue[1].value
        if(promoInputsValue[0].value == "" || promoInputsValue[1].value == "") { 
            showToast("卡友優惠專案 有欄位未填", false);
            return;
        }
        promoBox.push(emptyObject);
    }

    return promoBox;
 }



// 四、

function setGiftRadiobox() {
    var gift = document.querySelectorAll('#gift input');
  
    if (dataBox.gift.isShow) {
      gift[0].checked = true;
    } else {
      gift[1].checked = true;
    }
  }
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
  document.getElementById('yen').value = dataBox.discount.content.yen;
  document.getElementById('bi').value = dataBox.discount.content.bi;
  document.getElementById('limit').value = dataBox.discount.content.limit;
}

var initDetailed = true;
function setDetailed(num) {
    if(initDetailed == true) {
        initDetailed == false;
        var detailedSelector = document.getElementById("detailedNums");
        detailedSelector.addEventListener("change", detailNumChange);
        detailedSelector.value = num;
    }
   var detailed =  document.getElementById('detailed');
   detailed.innerHTML = '';
   var detailLength = dataBox.discount.詳細說明.text.length;

   for (let i = 0; i < num; i++) {
        var detailTemplate = document.createElement('input');
        detailTemplate.setAttribute("type", "text");
        detailTemplate.classList.add('detail-'+i);
        detailTemplate.classList.add('col-md-12');
        detailTemplate.value = dataBox.discount.詳細說明.text[i]
        // console.log('detailTemplate:', detailTemplate)
        detailed.appendChild(detailTemplate);
   }
   
}

function setDetailedNotice() {
    var detailedNotice = document.getElementById('detailedNotice');
    var noticeLength = dataBox.discount.詳細說明.注意事項.length;

    for (let i = 0; i <noticeLength; i++) {
        var noticeTemplate = document.createElement('input');
        noticeTemplate.setAttribute("type", "text");
        noticeTemplate.classList.add('notice-'+i);
        noticeTemplate.classList.add('col-md-12');
        noticeTemplate.value = dataBox.discount.詳細說明.注意事項[i];
        detailedNotice.appendChild(noticeTemplate);      
    }
}
 
function detailNumChange() {
    var detailNumChange = document.getElementById('detailedNums').value;
    console.log('detailNumChange:', detailNumChange)
    setDetailed(detailNumChange);
}





// 寫入表單 

function setAllValue() {
  // 把值代入 render完成的 表單
  // 一.分期
  setIdInput();
  setFanchiCheckbox(); // 分期checkbox
  // 二.刷卡滿額禮
  setGiftRadiobox(); // 刷卡滿額禮radio box
  setGiftDiv(dataBox.gift.texts.length);
  // 優惠
  setGiftsValue();
  // 三.卡友優惠專案
  setPromoRadio(); // 卡友優惠專案狀態
  setPromoProjectDiv(dataBox.promo.project.length); // render專案數量div
  // 專案數量
  // 四.紅利折扣
  setDiscountRadio(); // 紅利折扣狀態
  setDiscountContent(); // 紅利折扣內容
  detailNumChange(dataBox.discount.詳細說明.text.length); // 詳細說明
  setDetailedNotice(dataBox.discount.詳細說明.注意事項.length); // 詳細說明-注意事項
}

function drawTable() {
  var tbl = document.getElementById('bank-table');

  tbl.innerHTML = `
        <div class="thead">
            <div class="tr row">
                <div class="col-md-2 cornflowerblue">id</div>
                <input type="text" class="col-md-9" id="id">
            </div>
            <div class="tr row">
                <div class="col-md-2 cornflowerblue">name</div>
                <input type="text" class="col-md-9" id="name">
            </div>


            <div class="tr row">
                <div class="col-md-2 cornflowerblue">適用無息分期<span class="form-required">*</span></div>
                <div class="col-md-9 d-block"  id="plans">

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



            <div class="form-group">
                <label for="giftSelector">優惠數量</label>
                <select class="form-control" id="giftSelector">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>

            <div class="tr row">
                <div class="col-md-2 cornflowerblue">專案</div>
                <div class="col-md-9 d-block" id="gift-container">

                </div>
            </div>

            <div class="tr row">
                <div class="col-md-2 cornflowerblue">活動日期</div>
                <div class="col-md-9 d-block">
                    <label>活動日期</label>
                    <input type="text" class="col-md-12" id="begDt">
                    <input type="text" class="col-md-12" id="endDt">
                </div>
            </div>

            <div class="tr row">
                <div class="col-md-2 cornflowerblue">注意事項</div>
                <input type="text" class="col-md-9" id="notices">
            </div>
            <div class="tr row">
                <div class="col-md-2 cornflowerblue">領取條件</div>
                <input type="text" class="col-md-9" id="requisitions">
            </div>
            <div class="tr row">
                <div class="col-md-2 cornflowerblue">活動詳情連結</div>
                <input type="text" class="col-md-9" id="link">
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

            <div class="form-group">
                <label for="promoSelector">專案數量</label>
                <select class="form-control" id="promoSelector">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>

            <div class="tr row">
                <div class="col-md-2 cornflowerblue">專案</div>
                <div class="col-md-9 d-block" id="promo-container">

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
              <div class="col-md-9 d-block">
                  <label>紅利折扣內容</label>
                  <input type="text" class="col-md-12" id="point">
                  <label>折抵</label>
                  <input type="text" class="col-md-12" id="yen">
                  <label>最高上限折抵</label>
                  <input type="text" class="col-md-12" id="bi">
                  <label>刷卡最低限制</label>
                  <input type="text" class="col-md-12" id="limit">
              </div>
            </div>

            <div class="form-group">
                <label for="detailedNums">詳細說明數量</label>
                <select class="form-control" id="detailedNums">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div class="tr row">
                <div class="col-md-2 cornflowerblue">詳細說明</div>
                <div class="col-md-9 d-block" id="detailed">

                </div>
            </div>
            <div class="form-group">
                <label for="NoticeNums"> 注意事項數量</label>
                <select class="form-control" id="NoticeNums">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div class="tr row">
                <div class="col-md-2 cornflowerblue">詳細說明 - 注意事項</div>
                <div class="col-md-9 d-block" id="detailedNotice">

                </div>
            </div>

        </div>
        `;
}
