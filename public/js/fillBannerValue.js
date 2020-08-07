

export function fillBannerValue(data) {
    console.log('data:', data);

    // 繪製外層div
    function initBannerDiv() {
        const addBanner = document.getElementById("addBanner")
        const bannerImgLength = data.url.length;
        
        // 新增按鈕監控
        addBanner.addEventListener('click', function() {
            Banner_Input_Button();
        })
        // 根據資料長度 繪製模板(div input空得沒有值)
        for (let i = 0; i < bannerImgLength; i++) {
            Banner_Input_Button();
        }
        // 將banner 資料填入
        fillBannerInput()
    }


    function Banner_Input_Button() {
        const InputTemplate = `
            <h3>橫幅圖片</h3>
            <div class="tr row">
                <label class="col-md-2 ml-2">bankName</label>
                <input class="col-md-9" type="text">
            </div>
            <div class="tr row">
                <label class="col-md-2 ml-2">text</label>
                <input class="col-md-9" type="text">
            </div>
            <div class="tr row">
                <label class="col-md-2 ml-2">link</label>
                <input class="col-md-9" type="text">
            </div>
            <div class="tr row">
                <label class="col-md-2 ml-2">imgUrl</label>
                <input class="col-md-9" type="text">
            </div> 
        `;
        const createBanner = document.createElement('div');
        const deleteBtn = document.createElement('button');

        createBanner.classList.add("banner");
        createBanner.innerHTML = InputTemplate;

        deleteBtn.setAttribute('class', 'remove btn btn-danger');
        deleteBtn.innerText = "一";
        deleteBtn.addEventListener('click', function() {
            createBanner.remove();
        })
        createBanner.prepend(deleteBtn);
        document.getElementById('bannerContainer').appendChild(createBanner);
    }

    function fillBannerInput() {
        const bannerInputs = document.querySelectorAll('#bannerContainer [class*="banner"]');

        for (let i = 0; i < bannerInputs.length; i++) {
            const banner_input = bannerInputs[i].querySelectorAll('input');
            banner_input[0].value = _.get(data, `url.${i}.bankName`)
            banner_input[1].value = _.get(data, `url.${i}.text`)
            banner_input[2].value = _.get(data, `url.${i}.link`)
            banner_input[3].value = _.get(data, `url.${i}.imgUrl`)

            
        }
    }

    initBannerDiv()

    // 寫入表單 
    function setAllValue() {
        setPlansNotice(); // 分期注意事項
    }
    setAllValue();

    // render  注意事項 Input , Button
    function setPlansNotice() {
        const plansNotice = document.getElementById('plansNotice');
        var data = {
            announces : ["三期分期付款適用東南全商品；六/十/十二期分期分期付款僅適用國外團體行程(促銷、折扣、專案、同業等專案產品不適用)。",
          "兆豐商銀之政府網路採購卡、公司商務卡及VISA金融卡不適用分期付款活動。",
          "信用卡分期付款交易係由各家銀行一次墊付消費款予特約商店，並由持卡人分期繳付消費帳款予各家銀行。各家銀行並未介入商品之交付或商品瑕疵等買賣之實體關係，相關商品退貨或服務取消之退款事宜，持卡人應先洽東南旅行社尋求解決，如無法解決，得要求發卡銀行就該筆交易以『帳款疑義之處理程序』辦理，不得因此拒付信用卡款項。",
          "各家銀行對持卡人使用分期交易購買商品時，會依持卡人之當時信用及往來狀況來核給使用，並保留最後授權與否之權利。",
          "以上各家發卡行之專案活動內容，請參照東南旅遊網站及各發卡銀行網站；如遇爭議，以東南旅行社或各發卡行釋意為準。",
          "分期付款不得與信用卡紅利折抵同時併用。",
          "東南旅行社保留本分期專案接單與否之權利。",
          "永豐Prestige美國運通卡、公司卡、虛擬卡、銀聯卡不適用分期付款活動。"]
        };
        const noticeLength = data.announces.length;
        const addBtn = document.createElement('button');

        plansNotice.innerHTML = '';  

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
            plansNotice.append(addInput,addDelBtn);
        }
        
        plansNotice.prepend(addBtn)

        // Set Inputs Texts
        for (let i = 0; i <noticeLength; i++) {
            let announceTemplate = document.createElement('input');
            announceTemplate.setAttribute("type", "text");
            announceTemplate.classList.add('detail');
            announceTemplate.classList.add('col-md-11');
            announceTemplate.value =  data.announces[i];
            
            let detailDelBtn = document.createElement('button');
            detailDelBtn.setAttribute('class', 'btn btn-danger');
            detailDelBtn.innerText = "一";
            detailDelBtn.addEventListener('click', function() {
                announceTemplate.remove()
                detailDelBtn.remove();
            })

            plansNotice.appendChild(announceTemplate);      
            plansNotice.appendChild(detailDelBtn);      
        }
    }


}