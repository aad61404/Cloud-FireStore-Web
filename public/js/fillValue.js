

export function fillValue(data) {
        /***  Form   (M) ****/ 
        let dataBox = []; // firebase.get 資料儲存區
        dataBox = data// 資料儲存區
        console.log('dataBox:', dataBox);


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


    setAllValue();

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
        deleteBtn.addEventListener('click', function() {
            createGift.remove();
            checkGiftTextsValue(); // 更新 dataBox
        })
        createGift.prepend(deleteBtn);
        document.getElementById('giftContainer').appendChild(createGift);
        // 更新 dataBox
    }



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

    function Promo_Input_Button() {
        const PromoTemplate = `
        <label class="col-md-3">專案名稱</label><input type="text" class="col-md-10">
        <label class="col-md-3">專案連結</label><input type="text" class="col-md-10">
        `;
        const createPromoCard = document.createElement('div');
        const deleteBtn = document.createElement('button');
        
        createPromoCard.classList.add("promo");
        createPromoCard.innerHTML = PromoTemplate;
        
        deleteBtn.setAttribute('class', 'remove btn-danger');
        deleteBtn.innerText = "一";
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
            addDelBtn.innerText = "一";
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
}