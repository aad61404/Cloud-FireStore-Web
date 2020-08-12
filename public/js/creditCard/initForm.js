export function initForm() {

    function clearAllValue() {
        clearAllInputs()
        clearAllRadioBtn()
        clearAllCheckbox()
        clearBtn()
        clearContainer()
    }
    clearAllValue();

    // 增加 BTN 跟 監控addEventListener
    function addBtnAEL() {
        initGiftDiv()
        initPromoDiv()
        setDetailed()
        setDetailedNotice()
    }
    addBtnAEL()


    /***  清除空 所有欄位 start  ***/

    function clearAllInputs() {
        const allInputs = document.querySelectorAll('#bank-Form input[type="text"]')
        allInputs.forEach((input) => {
            input.value = '';
            input.classList.remove('readonly');
            input.removeAttribute('readonly');
        })
    }

    function clearAllRadioBtn() {
        const allRadioBtn = document.querySelectorAll('.form-check input[type="radio"]')
        allRadioBtn.forEach((radio) => {
            radio.checked = false;
            radio.classList.remove('disabled');
            radio.removeAttribute("disabled");
        })
    }

    function clearAllCheckbox() {
        const allPlansBtn = document.querySelectorAll('#plans input[type="checkbox"]')
        allPlansBtn.forEach((checkbox) => {
            checkbox.checked = false;
            checkbox.classList.remove('disabled');
            checkbox.removeAttribute("disabled");
        })
    }

    function  clearBtn() {
        const bankForm = document.querySelectorAll('#bank-Form button')
        bankForm.forEach((button) => {
            button.classList.remove('disabled');
            button.removeAttribute("disabled");
        })
    }

    function clearContainer() {
        const giftContainer = document.getElementById('giftContainer')
        giftContainer.innerHTML = '';
        const promoContainer = document.getElementById('promoContainer')
        promoContainer.innerHTML = '';
        const detailedDesc = document.getElementById('detailedDesc')
        detailedDesc.innerHTML = '';
        const detailedNotice = document.getElementById('detailedNotice')
        detailedNotice.innerHTML = '';
    }

    /***  清除空 所有欄位 end  ***/

    /**** 二、刷卡滿額禮 start ***/
    function initGiftDiv() {
        const newProject = document.getElementById("newProject");
        const giftContainer = document.getElementById("giftContainer");
        // 生成div前 先清除舊資料
        while (giftContainer.firstChild) {
            giftContainer.removeChild(giftContainer.firstChild);
        }
        // newProject.removeEventListener('click', Gift_Input_Button);
        newProject.removeEventListener('click', Gift_Input_Button, false);
        // 新增按鈕監控
        newProject.addEventListener('click', Gift_Input_Button)
    }


    // 文字欄 跟 按鈕 模板
    function Gift_Input_Button() {
        const GiftTemplate = `
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
        const createGift = document.createElement('div');
        const deleteBtn = document.createElement('button');

        createGift.classList.add("gift");
        createGift.innerHTML = GiftTemplate;

        deleteBtn.setAttribute('class', 'remove btn btn-danger');
        deleteBtn.innerText = "一";
        deleteBtn.addEventListener('click', function () {
            createGift.remove();
        })
        createGift.prepend(deleteBtn);
        document.getElementById('giftContainer').appendChild(createGift);
    }

    /**** 二、刷卡滿額禮 end  ***/


    /**** 三、卡友優惠專案 start ****/
    function initPromoDiv() {
        const addPromo = document.getElementById("addPromo");
        const promoContainer = document.getElementById("promoContainer");

        // 生成div 前先清除舊的 
        while (promoContainer.firstChild) {
            promoContainer.removeChild(promoContainer.firstChild);
        }

        // 新增按鈕 
        addPromo.addEventListener('click', function () {
            Promo_Input_Button
        })

    }

    function Promo_Input_Button() {
        const PromoTemplate = `
        <label class="col-md-3">標題</label><input type="text" class="col-md-10">
        <label class="col-md-3">活動URL</label><input type="text" class="col-md-10">
        <label class="col-md-3">圖片</label><input type="text" class="col-md-10">
        `;
        const createPromoCard = document.createElement('div');
        const deleteBtn = document.createElement('button');

        createPromoCard.classList.add("promo");
        createPromoCard.innerHTML = PromoTemplate;

        deleteBtn.setAttribute('class', 'remove btn btn-danger');
        deleteBtn.innerText = "一";
        deleteBtn.addEventListener('click', function () {
            createPromoCard.remove();
        })
        createPromoCard.prepend(deleteBtn);
        document.getElementById('promoContainer').appendChild(createPromoCard);
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
            let addInput = document.createElement('input');
            let addDelBtn = document.createElement('button');

            addInput.setAttribute("type", "text");
            addInput.setAttribute("class", "detail col-md-11");

            addDelBtn.setAttribute('class', 'btn btn-danger');
            addDelBtn.innerText = "ㄧ";
            addDelBtn.addEventListener('click', function () {
                this.previousSibling.remove();
                this.remove();
            })
            detailedDesc.append(addInput, addDelBtn);
        }
    }


    // render  注意事項 Input , Button
    function setDetailedNotice() {
        const detailedNotice = document.getElementById('detailedNotice');
        const detailedDescBtn = document.getElementById('detailedNotice-btn');

        detailedNotice.innerHTML = '';

        detailedDescBtn.onclick = function () {
            let addInput = document.createElement('input');
            let addDelBtn = document.createElement('button');

            addInput.setAttribute("type", "text");
            addInput.setAttribute("class", "detail col-md-11");

            addDelBtn.setAttribute('class', 'btn btn-danger');
            addDelBtn.innerText = "一";
            addDelBtn.addEventListener('click', function () {
                this.previousSibling.remove();
                this.remove();
            })
            detailedNotice.append(addInput, addDelBtn);
        }
    }


}