export function initForm() {
  function clearAllValue() {
    clearAllInputs();
    clearAllRadioBtn();
    clearAllCheckbox();
    clearBtn();
    clearContainer();
  }
  clearAllValue();

  // 增加 BTN 跟 監控addEventListener
  function addBtnAEL() {
    initGiftDiv();
    initPromoDiv();
    setDetailed();
    setDetailedNotice();
  }
  addBtnAEL();

  /***  清除空 所有欄位 start  ***/

  function clearAllInputs() {
    const allInputs = document.querySelectorAll(
      '#bank-Form input[type="text"]'
    );
    allInputs.forEach((input) => {
      input.value = '';
      input.classList.remove('readonly');
      input.removeAttribute('readonly');
    });
  }

  function clearAllRadioBtn() {
    const allRadioBtn = document.querySelectorAll(
      '.form-check input[type="radio"]'
    );
    allRadioBtn.forEach((radio) => {
      radio.checked = false;
      radio.classList.remove('disabled');
      radio.removeAttribute('disabled');
    });
  }

  function clearAllCheckbox() {
    const allPlansBtn = document.querySelectorAll(
      '#plans input[type="checkbox"]'
    );
    allPlansBtn.forEach((checkbox) => {
      checkbox.checked = false;
      checkbox.classList.remove('disabled');
      checkbox.removeAttribute('disabled');
    });
  }

  function clearBtn() {
    const bankForm = document.querySelectorAll('#bank-Form button');
    bankForm.forEach((button) => {
      button.classList.remove('disabled');
      button.removeAttribute('disabled');
    });
  }

  function clearContainer() {
    const giftContainer = document.getElementById('giftContainer');
    giftContainer.innerHTML = '';
    const promoContainer = document.getElementById('promoContainer');
    promoContainer.innerHTML = '';
    const detailedDesc = document.getElementById('detailedDesc');
    detailedDesc.innerHTML = '';
    const detailedNotice = document.getElementById('detailedNotice');
    detailedNotice.innerHTML = '';
  }

  /***  清除空 所有欄位 end  ***/

  /**** 二、刷卡滿額禮 start ***/
  function initGiftDiv() {
    const newProject = document.getElementById('newProject');
    const giftContainer = document.getElementById('giftContainer');
    // 生成div前 先清除舊資料
    while (giftContainer.firstChild) {
      giftContainer.removeChild(giftContainer.firstChild);
    }
    // 新增刷卡滿額禮 按鈕監控
    newProject.onclick = Gift_Input_Button;
    // newProject.removeEventListener('click', Gift_Input_Button, true);
    // newProject.addEventListener('click', Gift_Input_Button,true)
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
    deleteBtn.innerText = '—';
    deleteBtn.addEventListener('click', function () {
      createGift.remove();
    });
    createGift.prepend(deleteBtn);
    document.getElementById('giftContainer').appendChild(createGift);
  }

  /**** 二、刷卡滿額禮 end  ***/

  /**** 三、卡友優惠專案 start ****/
  function initPromoDiv() {
    const addPromo = document.getElementById('addPromo');
    const promoContainer = document.getElementById('promoContainer');

    // 生成div 前先清除舊的
    while (promoContainer.firstChild) {
      promoContainer.removeChild(promoContainer.firstChild);
    }

    // 新增卡友優惠按鈕監控
    addPromo.onclick = Promo_Input_Button;
    // addPromo.addEventListener('click', function () {
    //     Promo_Input_Button
    // })
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
            <label style="padding-left: 15px;">圖片<span class="remarks-label" style="padding-left: 15px;">( 圖片尺寸1920 x 600 )</span></label><input type="text" class="col-md-10 form-control deepGreen" required>
            <label class="remarks-label">備註: 請輸入銀行專頁內此活動的BN網址</label>
            <div class="invalid-feedback">
                請輸入 圖片
            </div>
            <div class="imgWrapper">
            </div>
        `;
    const createPromoCard = document.createElement('div');
    const deleteBtn = document.createElement('button');

    createPromoCard.classList.add('promo');
    createPromoCard.innerHTML = PromoTemplate;

    deleteBtn.setAttribute('class', 'remove btn btn-danger');
    deleteBtn.innerText = '—';
    deleteBtn.addEventListener('click', function () {
      createPromoCard.remove();
    });
    createPromoCard.prepend(deleteBtn);
    document.getElementById('promoContainer').appendChild(createPromoCard);
    
    // promo.projects.imgUrl -> 顯示圖片預覽
    const thirdInput = createPromoCard.querySelector('input:nth-of-type(3)');
    thirdInput.addEventListener('change', function(e) {
      createPromoCard.querySelector('.imgWrapper').innerHTML = `<img src="${e.target.value}" />`
    })
   
  }

  /**** 三、卡友優惠專案 end ****/

  /**********
    四、紅利折扣
  **********/

  // render 詳細說明 Input , X
  function setDetailed() {
    const detailedDesc = document.getElementById('detailedDesc');
    const detailedDescBtn = document.getElementById('detailedDesc-btn');
    detailedDesc.innerHTML = '';

    detailedDescBtn.onclick = function () {
      let addDiv = document.createElement('div');
      let addInvalid = document.createElement('div');
      let addInput = document.createElement('input');
      let addDelBtn = document.createElement('button');

      addDiv.setAttribute('class', 'col-md-12 mb-2 pl-0');
      addInvalid.setAttribute('class', 'invalid-feedback');
      addInput.setAttribute('type', 'text');
      addInput.setAttribute('class', 'col-md-11 form-control2 deepGreen');
      addInput.required = true;

      // addInput.setAttribute("type", "text");
      // addInput.setAttribute("class", "mb-2 col-md-11 form-control2 deepGreen");

      addDelBtn.setAttribute('class', 'btn btn-danger');
      addDelBtn.innerText = 'ㄧ';
      addDelBtn.addEventListener('click', function () {
        this.previousSibling.remove();
        this.remove();
      });

      addInvalid.innerText = '請輸入 詳細說明';

      addDiv.append(addInput, addDelBtn, addInvalid);
      detailedDesc.append(addDiv);
    };
  }

  // render  注意事項 Input , Button
  function setDetailedNotice() {
    const detailedNotice = document.getElementById('detailedNotice');
    const detailedDescBtn = document.getElementById('detailedNotice-btn');

    detailedNotice.innerHTML = '';

    detailedDescBtn.onclick = function () {
      let addDiv = document.createElement('div');
      let addInvalid = document.createElement('div');
      let addInput = document.createElement('input');
      let addDelBtn = document.createElement('button');

      addDiv.setAttribute('class', 'col-md-12 mb-2 pl-0');
      addInvalid.setAttribute('class', 'invalid-feedback');
      addInput.setAttribute('type', 'text');
      addInput.setAttribute('class', 'col-md-11 form-control2 deepGreen');
      addInput.required = true;

      addDelBtn.setAttribute('class', 'btn btn-danger');
      addDelBtn.innerText = '—';
      addDelBtn.addEventListener('click', function () {
        this.previousSibling.remove();
        this.remove();
      });

      addInvalid.innerText = '請輸入 注意事項';

      addDiv.append(addInput, addDelBtn, addInvalid);
      detailedNotice.append(addDiv);
    };
  }
}
