// creditCardSpecial.js (firestore && Auth && 表單外層function)
// searchEditComfirm.js (表單資料內容操作)

export function searchEditComfirm(data) {
  /***  Form   (M) ****/

  /***  資料undefined  防呆 start ***/
  console.log('data:', data);
  function checkfoolProof(pro) {
    if (_.isUndefined(pro.plans)) {
      return (pro.plans = []);
    }
  }
  checkfoolProof(data);
  /***  資料undefined  防呆 end ***/

  // 寫入表單
  function setAllValue() {
    initFillRadio('bankIsShow'); // (data.isShow)
    // 一.分期
    setIdInput();
    setFanchiCheckbox(); // 分期checkbox

    // 二.刷卡滿額禮
    initFillRadio('gift'); // 刷卡滿額禮radio box (data.gift.isShow)
    initGiftDiv(); // create div + fill value  + 監控

    // 三.卡友優惠專案
    initFillRadio('promo');
    initPromoDiv();

    // 四.紅利折扣
    initFillRadio('discount'); // 紅利折扣狀態
    setDiscountContent(); // 紅利折扣內容
    setDetailed(); // 詳細說明
    setDetailedNotice(); // 詳細說明-注意事項
  }
  setAllValue();

  /*****   Radio - 表格初始繪完 把資料填入Radio   *****/
  function initFillRadio(radioName) {
    const isShowRadios = document.querySelectorAll(`#${radioName} input`);
    // _.get 防呆
    const firstFloorIsShow = _.get(data, 'isShow', true);
    const secondFloorIsShow = _.get(data, `${radioName}.isShow`, false);
    if (radioName == 'bankIsShow') {
      if (firstFloorIsShow == true) {
        isShowRadios[0].checked = true;
      } else {
        isShowRadios[1].checked = true;
      }
    } else if (secondFloorIsShow == true) {
      isShowRadios[0].checked = true;
    } else if (secondFloorIsShow == false) {
      isShowRadios[1].checked = true;
    }
  }

  /***  一、分期 Input  ***/
  function setIdInput() {
    document.getElementById('id').value = data.id;
    document.getElementById('name').value = data.name;
    // document.getElementById('logoUrl').value  = data.logoUrl
  }

  /***  一、分期 checkbox ***/
  function setFanchiCheckbox() {
    // 將 data 裡面有的值寫進 Input
    data.plans.forEach((item) => {
      document.querySelectorAll('#plans input').forEach((item2) => {
        item = String(item);
        if (item == item2.value) {
          item2.checked = true;
          // console.log('item2:', item2)
        }
      });
    });
  }

  /**** 二、刷卡滿額禮 start ***/
  function initGiftDiv() {
    const giftTextsLength = data.gift.desc.length;

    // 根據資料長度 繪製模板(div input空得沒有值)
    for (let i = 0; i < giftTextsLength; i++) {
      Gift_Input_Button();
    }
    // 將模板內填入資料
    fillGiftInput();
  }

  // 文字欄 跟 按鈕 模板
  function Gift_Input_Button() {
    const GiftTemplate = `
            <h5>優惠 </h5>
            <div class="tr row">
                <label class="col-md-2">消費條件</label>
                <div class="col-md-9">
                    <input class="form-control deepGreen" type="text" required>
                    <div class="invalid-feedback">
                        請輸入 消費條件
                    </div>
                </div>
            </div>
            <div class="tr row">
                <label class="col-md-2">贈送</label>
                <div class="col-md-9">
                    <input class="form-control deepGreen" type="text" required>
                    <div class="invalid-feedback">
                        請輸入 贈送
                    </div>
                </div>
            </div>
            <div class="tr row">
                <label class="col-md-2">備註</label>
                <div class="col-md-9">
                    <input class="form-control deepGreen" type="text">
                </div>
            </div>
        `;
    const createGift = document.createElement('div');
    const deleteBtn = document.createElement('button');

    createGift.classList.add('gift');
    createGift.innerHTML = GiftTemplate;

    deleteBtn.setAttribute('class', 'remove btn btn-danger');
    deleteBtn.innerText = '一';
    deleteBtn.addEventListener('click', function () {
      createGift.remove();
    });
    createGift.prepend(deleteBtn);
    document.getElementById('giftContainer').appendChild(createGift);
  }

  function fillGiftInput() {
    const giftInputs = document.querySelectorAll(
      '#giftContainer [class*="gift"]'
    );

    for (let i = 0; i < giftInputs.length; i++) {
      const single_input = giftInputs[i].querySelectorAll('input');
      single_input[0].value = _.get(data , `gift.desc[${i}].condition`,'')
      single_input[1].value = _.get(data , `gift.desc[${i}].receive`,'')
      single_input[2].value = _.get(data , `gift.desc[${i}].remark`,'')
    }

    // 初始畫面 活動日期 結束日期帶入
    // 注意事項 領取條件 活動詳情連結
    document.getElementById('begDt').value = _.get(data , 'gift.begDt','');
    document.getElementById('endDt').value = _.get(data , 'gift.endDt','');
    document.getElementById('announce').value = _.get(data , 'gift.announce','');
    document.getElementById('qualify').value = _.get(data , 'gift.qualify','');
    document.getElementById('link').value = _.get(data , 'link','');
  }

  /**** 二、刷卡滿額禮 end  ***/

  /**** 三、卡友優惠專案 start ****/
  function initPromoDiv() {
    const promoTextsLength = data.promo.projects.length;

    // 卡友專案 生成div
    for (let i = 0; i < promoTextsLength; i++) {
      Promo_Input_Button();
    }
    fillPromoValue();
  }

  function Promo_Input_Button() {
    const PromoTemplate = `
            <h4>專案</h4>
            <label class="col-md-3">標題</label><input type="text" class="col-md-10 form-control deepGreen" required>
            <div class="invalid-feedback">
                請輸入 標題
            </div>
            <label class="col-md-3">活動URL</label><input type="text" class="col-md-10 form-control deepGreen" required>
            <div class="invalid-feedback">
                請輸入 活動URL
            </div>
            <label class="col-md-3">圖片</label><input type="text" class="col-md-10 form-control deepGreen" required>
            <div class="invalid-feedback">
                請輸入 圖片
            </div>
        `;
    const createPromoCard = document.createElement('div');
    const deleteBtn = document.createElement('button');

    createPromoCard.classList.add('promo');
    createPromoCard.innerHTML = PromoTemplate;

    deleteBtn.setAttribute('class', 'remove btn btn-danger');
    deleteBtn.innerText = '一';
    deleteBtn.addEventListener('click', function () {
      createPromoCard.remove();
    });
    createPromoCard.prepend(deleteBtn);
    document.getElementById('promoContainer').appendChild(createPromoCard);
  }

  function fillPromoValue() {
    const promoInputs = document.querySelectorAll(
      '#promoContainer [class*="promo"]'
    );

    for (let i = 0; i < promoInputs.length; i++) {
      const single_Input = promoInputs[i].querySelectorAll('input');
      single_Input[0].value = data.promo.projects[i].text;
      single_Input[1].value = data.promo.projects[i].link;
      single_Input[2].value = data.promo.projects[i].imgUrl;
    }
  }

  /**** 三、卡友優惠專案 end ****/

  /**********
    四、紅利折扣
    **********/

  function setDiscountContent() {
    document.getElementById('point').value = data.discount.content.point;
    document.getElementById('amount').value = data.discount.content.amount;
    document.getElementById('upper').value = data.discount.content.upper;
    document.getElementById('lower').value = data.discount.content.lower;
  }

  // render 詳細說明 Input , X
  function setDetailed() {
    const detailedDesc = document.getElementById('detailedDesc');
    const detailLength = data.discount.detail.desc.length;

    detailedDesc.innerHTML = '';

    // Set Inputs Texts
    for (let i = 0; i < detailLength; i++) {
      let addDiv = document.createElement('div');
      let addInvalid = document.createElement('div');
      let addInput = document.createElement('input');
      let addDelBtn = document.createElement('button');

      addDiv.setAttribute('class', 'col-md-12 mb-2 pl-0');
      addInvalid.setAttribute('class', 'invalid-feedback');
      addInput.setAttribute('type', 'text');
      addInput.setAttribute('class', 'col-md-11 form-control2 deepGreen');
      addInput.value = data.discount.detail.desc[i];
      addInput.required = true;

      addDelBtn.setAttribute('class', 'btn btn-danger');
      addDelBtn.innerText = '一';
      addDelBtn.addEventListener('click', function () {
        addInput.remove();
        addDelBtn.remove();
      });

      addInvalid.innerText = '請輸入 詳細說明';

      addDiv.append(addInput, addDelBtn, addInvalid);
      detailedDesc.appendChild(addDiv);
    }
  }

  // render  注意事項 Input , Button
  function setDetailedNotice() {
    const detailedNotice = document.getElementById('detailedNotice');
    const noticeLength = data.discount.detail.notice.length;

    detailedNotice.innerHTML = '';

    // Set Inputs Texts
    for (let i = 0; i < noticeLength; i++) {
      let addDiv = document.createElement('div');
      let addInvalid = document.createElement('div');
      let addInput = document.createElement('input');
      let addDelBtn = document.createElement('button');

      addDiv.setAttribute('class', 'col-md-12 mb-2 pl-0');
      addInvalid.setAttribute('class', 'invalid-feedback');
      addInput.setAttribute('type', 'text');
      addInput.setAttribute('class', 'col-md-11 form-control2 deepGreen');
      addInput.value = data.discount.detail.notice[i];
      addInput.required = true;

      addDelBtn.setAttribute('class', 'btn btn-danger');
      addDelBtn.innerText = '一';
      addDelBtn.addEventListener('click', function () {
        addInput.remove();
        addDelBtn.remove();
      });

      addInvalid.innerText = '請輸入 注意事項';

      addDiv.append(addInput, addDelBtn, addInvalid);
      detailedNotice.appendChild(addDiv);
    }
  }
}
