// dashboard.js (firestore && Auth && 表單外層function)
// dataForm.js  (搜尋後 生成表單template)
// fillValue.js (表單資料內容操作)

/***  Form  (V) ****/ 
export function drawForm() {
    // (第二次送出查詢時) 清除 bank-Form 舊的 內容
    function clearForm() {
        var bankForm = document.getElementById('bank-Form').children[0];
        if(bankForm) {
            bankForm.remove();
        }
    }

    clearForm();


    var tbl = document.getElementById('bank-Form');
    
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