function plansCount() {
  var plansBox = [];
  var plansChecked = $('#plans input:checked');

  for (var i = 0; i < plansChecked.length; i++) {
    plansBox.push(plansChecked[i].value);
  }
  console.log('plansBox:', plansBox);
  return plansBox;
}

function giftCount() {
  var giftChecked = $('#gift input:checked');
  console.log('giftChecked', giftChecked[0].value);
  return giftChecked[0].value;
}
function promoCount() {
  var promoChecked = $('#promo input:checked');
  console.log('promoChecked', promoChecked[0].value);
  return promoChecked[0].value;
}

function parsingObj() {}

// 一、
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
    console.log('texts',dataBox.gift.texts);
}

// 初始畫面 活動日期 結束日期帶入
function setBegEndDt() {
  document.getElementById('begDt').value = dataBox.gift.begDt;
  document.getElementById('endDt').value = dataBox.gift.endDt;
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
    console.log('promo.length',val);
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

// 四、
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

function setAllValue() {
  // 把值代入 render完成的 表單
  // 一.分期
  setFanchiCheckbox(); // 分期checkbox
  // 二.刷卡滿額禮
  setGiftRadiobox(); // 刷卡滿額禮radio box
  setGiftDiv(dataBox.gift.texts.length);
  // 優惠
  setBegEndDt();
  // 三.卡友優惠專案
  setPromoRadio(); // 卡友優惠專案狀態
  setPromoProjectDiv(dataBox.promo.project.length); // render專案數量div
  // 專案數量
  // 四.紅利折扣
  setDiscountRadio(); // 紅利折扣狀態
  setDiscountContent(); // 紅淚折扣內容
}

function drawTable() {
  var tbl = document.getElementById('bank-table');

  tbl.innerHTML = `
        <div class="thead">
            <div class="tr row">
                <div class="col-md-2 cornflowerblue">id</div>
                <textarea class="col-md-9 readonly" readonly>${
                  dataBox.id
                }</textarea>
            </div>
            <div class="tr row">
                <div class="col-md-2 cornflowerblue">name</div>
                <textarea class="col-md-9 readonly" readonly>${
                  dataBox.name
                }</textarea>
            </div>


            <div class="tr row" id="plans">
                <div class="col-md-2 cornflowerblue">適用無息分期<span class="form-required">*</span></div>
                <div class="col-md-9 d-block">

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
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="true" onclick="giftCount()">
                    <label class="form-check-label" for="inlineRadio1">上架</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="false" onclick="giftCount()">
                    <label class="form-check-label" for="inlineRadio2">下架</label>
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
                <textarea class="col-md-9 readonly" readonly>${JSON.stringify(
                  dataBox.gift.注意事項
                )}</textarea>
            </div>
            <div class="tr row">
                <div class="col-md-2 cornflowerblue">領取條件</div>
                <textarea class="col-md-9 readonly" readonly>${JSON.stringify(
                  dataBox.gift.領取條件
                )}</textarea>
            </div>
            <div class="tr row">
                <div class="col-md-2 cornflowerblue">活動詳情連結</div>
                <textarea class="col-md-9 readonly" readonly>${JSON.stringify(
                  dataBox.link
                )}</textarea>
            </div>

            <h2>三. 卡友優惠專案</h2>
            <hr />
            <div class="tr" id="promo">
                <label class="form-label" style="display: block;">卡友優惠專案狀態<span class="form-required">*</span></label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio1" value="true" onclick="promoCount()">
                    <label class="form-check-label" for="inlineRadio1">上架</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio2" value="false" onclick="promoCount()">
                    <label class="form-check-label" for="inlineRadio2">下架</label>
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
                    <input class="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio1" value="true" onclick="discountCount()">
                    <label class="form-check-label" for="inlineRadio1">上架</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio2" value="false" onclick="discountCount()">
                    <label class="form-check-label" for="inlineRadio2">下架</label>
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


            <div class="tr row">
                <div class="col-md-2 cornflowerblue">詳細說明</div>
                <textarea class="col-md-9 readonly" readonly>${JSON.stringify(
                  dataBox.discount.詳細說明.text
                )}</textarea>
            </div>
            <div class="tr row">
                <div class="col-md-2 cornflowerblue">詳細說明 - 注意事項</div>
                <textarea class="col-md-9 readonly" readonly>${JSON.stringify(
                  dataBox.discount.詳細說明.注意事項
                )}</textarea>
            </div>

        </div>
        `;
}
