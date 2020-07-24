

function plansCount() {
    var plansBox = [];
    var plansChecked = $('#plans input:checked');

    for(var i=0;  i < plansChecked.length; i++){
        plansBox.push(plansChecked[i].value);
    }
    console.log('plansBox:', plansBox)
    return plansBox;
}

function giftCount() {
    var giftChecked = $("#gift input:checked");
    console.log('giftChecked', giftChecked[0].value)
    return giftChecked[0].value;
}
function promoCount() {
    var promoChecked = $("#promo input:checked");
    console.log('promoChecked', promoChecked[0].value)
    return promoChecked[0].value;
}

function parsingObj() {

}

// 初始畫面 收到資料後將分期checkbox 設true
function setFanchiCheckbox() {
    dataBox.plans.forEach(item =>{ 
        document.querySelectorAll('#plans input').forEach(item2 =>{
            item = String(item)
            if(item == item2.value) {
                item2.checked = true;
            };
        })
    })
}
// 初始畫面 刷卡滿額禮radio box 設true
function setGiftRadiobox() {
    var gift = document.querySelectorAll('#gift input');

    if(dataBox.gift.isShow) {
        gift[0].checked =true
    } else {
        gift[1].checked =true
    }
}

// 初始畫面 活動日期 結束日期帶入
function setBegEndDt() {
    document.getElementById('begDt').value = dataBox.gift.begDt
    document.getElementById('endDt').value = dataBox.gift.endDt
}

function setAllValue() {
    // 把值代入 render完成的 表單
    // 一.
    setFanchiCheckbox(); // 分期checkbox
    // 二.
    setGiftRadiobox(); // 刷卡滿額禮radio box
                       // 優惠
    setBegEndDt();
    // 三.
}

function drawTable() {
        var tbl = document.getElementById('bank-table');
        
        tbl.innerHTML = `
        <div class="thead">
            <div class="tr row">
                <div class="col-md-2 cornflowerblue">id</div>
                <textarea class="col-md-9 readonly" readonly>${dataBox.id}</textarea>
            </div>
            <div class="tr row">
                <div class="col-md-2 cornflowerblue">name</div>
                <textarea class="col-md-9 readonly" readonly>${dataBox.name}</textarea>
            </div>

            <div class="tr" id="plans">
                <label class="form-label" style="display: block;">適用無息分期<span class="form-required">*</span></label>
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
                <label for="exampleFormControlSelect1">優惠數量</label>
                <select class="form-control" id="exampleFormControlSelect1">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>

            <div id="gift-container">
                <div class="gitf-">
                    <h3>優惠<span></span></h3>
                    消費條件
                    <input type="text" >
                    <br />
                    贈送
                    <input type="text" >
                    <br />
                    備註
                    <input type="text ">
                </div>
            </div>
            <br />
            <br />

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
                <textarea class="col-md-9 readonly" readonly>${JSON.stringify(dataBox.gift.注意事項)}</textarea>
            </div>
            <div class="tr row">
                <div class="col-md-2 cornflowerblue">領取條件</div>
                <textarea class="col-md-9 readonly" readonly>${JSON.stringify(dataBox.gift.領取條件)}</textarea>
            </div>
            <div class="tr row">
                <div class="col-md-2 cornflowerblue">活動詳情連結</div>
                <textarea class="col-md-9 readonly" readonly>${JSON.stringify(dataBox.link)}</textarea>
            </div>

            <h2>三. 卡友優惠專案</h2>
            <hr />
            <div class="tr" id="promo">
                <label class="form-label" style="display: block;">卡友優惠專案狀態<span class="form-required">*</span></label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="true" onclick="promoCount()">
                    <label class="form-check-label" for="inlineRadio1">上架</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="false" onclick="promoCount()">
                    <label class="form-check-label" for="inlineRadio2">下架</label>
                </div>
            </div>

            <div class="form-group">
                <label for="exampleFormControlSelect1">專案數量</label>
                <select class="form-control" id="exampleFormControlSelect1">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <tr><th><label for="input0">專案名稱1</label></th><td><input type="text" id="input0"></td></tr>

            <h2>四. 紅利折扣</h2>
            <hr />

            <div class="tr" id="discount">
                <label class="form-label" style="display: block;">紅利折扣狀態<span class="form-required">*</span></label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="true" onclick="discountCount()">
                    <label class="form-check-label" for="inlineRadio1">上架</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="false" onclick="discountCount()">
                    <label class="form-check-label" for="inlineRadio2">下架</label>
                </div>
            </div>

            <div class="tr row">
              <div class="col-md-2 cornflowerblue">紅利折扣內容</div>
              <div class="col-md-9 d-block">
                  <label>紅利折扣內容</label>
                  <br>
                  <input type="text" class="col-md-12 begDt" name="point">
                  折抵<input type="text" class="col-md-12 endDt" name="yen">
                  最高上限折抵<input type="text" class="col-md-12 endDt" name="bi">
                  刷卡最低限制<input type="text" class="col-md-12 endDt" name="limit">
              </div>
            </div>


            <div class="tr row">
                <div class="col-md-2 cornflowerblue">詳細說明</div>
                <textarea class="col-md-9 readonly" readonly>${JSON.stringify(dataBox.discount.詳細說明.text)}</textarea>
            </div>
            <div class="tr row">
                <div class="col-md-2 cornflowerblue">詳細說明 - 注意事項</div>
                <textarea class="col-md-9 readonly" readonly>${JSON.stringify(dataBox.discount.詳細說明.注意事項)}</textarea>
            </div>

        </div>
        `;
}

