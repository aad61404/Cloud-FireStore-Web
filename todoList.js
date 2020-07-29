function setValue() {
    const Box = {
        gift: {
            texts:  checkGiftTextsValue(),
        },
        promo: {
            project: checkPromoProjectValue()
        },
        discount: {
            detail: {
              texts: detailCount(),
              announces: announceCount()
            }
        }
    };
    console.log('Box:', Box)

}

// render div 刷卡滿額禮
var newProject = document.getElementById("newProject");

newProject.addEventListener('click', function() {

    var createGift = document.createElement('div');
    createGift.classList.add("gift");
    createGift.innerHTML = `
            <h5>優惠 </h5>
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
    `;
    
    var deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'remove btn-danger');
    deleteBtn.innerText = "X";
    deleteBtn.addEventListener('click', function() {
        createGift.remove();
    })
    createGift.prepend(deleteBtn);
    document.getElementById('giftWrapper').appendChild(createGift);

})


// render div 卡友優惠專案
var newPromo = document.getElementById("newPromo");

newPromo.addEventListener('click', function() {

    var createPromoCard = document.createElement('div');
    createPromoCard.classList.add("promo");
    createPromoCard.innerHTML = `
        <label class="col-md-3">專案名稱</label><input type="text" class="col-md-9">
        <label class="col-md-3">專案連結</label><input type="text" class="col-md-9">
    `;
    
    var deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'remove btn-danger');
    deleteBtn.innerText = "X";
    deleteBtn.addEventListener('click', function() {
        createPromoCard.remove();
    })
    createPromoCard.prepend(deleteBtn);
    document.getElementById('promoContainer').appendChild(createPromoCard);

})


// render div 詳細說明

function setDetailed() {
   const detailed =  document.getElementById('detailed');
   const detailLength = dataBox.discount.detail.texts.length;
   const addBtn = document.createElement('button')
   
   detailed.innerHTML = '';

   addBtn.setAttribute("class","btn btn-success d-block");
   addBtn.innerText = '+';
   addBtn.onclick = function () {
       let addInput = document.createElement('input');
       let addDelBtn = document.createElement('button');
       
       addInput.setAttribute("type", "text");
       addInput.setAttribute("class", "detail col-md-10");

       addDelBtn.setAttribute('class', 'btn btn-danger');
       addDelBtn.innerText = "X";
       addDelBtn.addEventListener('click', function() {
           this.previousSibling.remove();
           this.remove();
       })

       detailed.append(addInput,addDelBtn);
   }
   detailed.prepend(addBtn)

    // render Input and X
   for (let i = 0; i < detailLength; i++) {
        let detailTemplate = document.createElement('input');
        detailTemplate.setAttribute("type", "text");
        detailTemplate.classList.add('detail');
        detailTemplate.classList.add('col-md-10');
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

setDetailed()


// render div 注意事項
function setDetailedNotice() {
    const detailedNotice = document.getElementById('detailedNotice');
    const noticeLength = dataBox.discount.detail.announces.length;
    const addBtn = document.createElement('button');

    detailedNotice.innerHTML = '';  

    addBtn.setAttribute("class","btn btn-success d-block");
    addBtn.innerText = '+';
    addBtn.onclick = function () {
        let addInput = document.createElement('input');
        let addDelBtn = document.createElement('button');
        
        addInput.setAttribute("type", "text");
        addInput.setAttribute("class", "detail col-md-10");

        addDelBtn.setAttribute('class', 'btn btn-danger');
        addDelBtn.innerText = "X";
        addDelBtn.addEventListener('click', function() {
            this.previousSibling.remove();
            this.remove();
        })
 
        detailedNotice.append(addInput,addDelBtn);

    }
    detailedNotice.prepend(addBtn)

    // 表單 Input X
    for (let i = 0; i <noticeLength; i++) {
        let announceTemplate = document.createElement('input');
        announceTemplate.setAttribute("type", "text");
        announceTemplate.classList.add('detail');
        announceTemplate.classList.add('col-md-10');
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

setDetailedNotice()


// 刷卡滿額禮  送出
function checkGiftTextsValue() {
    var giftTextsBox = [];
    var allGifts=  document.querySelectorAll('#giftWrapper [class*="gift"]');
 
    for (let i = 0; i < allGifts.length; i++) {
        var giftInputsValue = allGifts[i].querySelectorAll('input')
        var emptyObject = {};
        emptyObject.condition =giftInputsValue[0].value // 條件
        emptyObject.receive =giftInputsValue[1].value   // 贈送
        emptyObject.remark =giftInputsValue[2].value    // 備註
        if(giftInputsValue[0].value == "" || giftInputsValue[1].value == "") { 
             showToast("刷卡滿額禮 有欄位未填", false);
             return;
         }
        giftTextsBox.push(emptyObject);
    }
    return giftTextsBox;
 }


 // 卡友優惠專案  送出
function checkPromoProjectValue() {
    var promoBox = [];
    var allPromos=  document.querySelectorAll('#promoContainer [class*="promo"]');
 
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

 // 詳細說明  送出
 function detailCount() {
     var detailBox = [];
     var detailInputs = document.querySelectorAll("#detailed input");
     detailInputs.forEach(function(item) {
        detailBox.push(item.value);
     })
     return detailBox;
 }

  // 詳細說明 - 注意事項  送出
 function announceCount() {
     var announceBox = [];
     var announceInputs = document.querySelectorAll("#detailedNotice input");
     announceInputs.forEach(function(item) {
        announceBox.push(item.value);
     })
     return announceBox;
 }