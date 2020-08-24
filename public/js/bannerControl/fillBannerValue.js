import { setDraggable } from './setDraggable.js';

export function fillBannerValue(data) {
    console.log('data:', data)
    // 繪製外層div
    function initBannerDiv() {
        const addBanner = document.getElementById("addBanner")
        const bannerImgLength = data.banner.length;
        
        // 新增按鈕監控
        addBanner.addEventListener('click', function() {
            Banner_Input_Button();
            // 新增拖曳
            setDraggable()
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
                <input class="col-md-9" type="text" value="">
            </div>
            <div class="tr row">
                <label class="col-md-2 ml-2">text</label>
                <input class="col-md-9" type="text"  value="">
            </div>
            <div class="tr row">
                <label class="col-md-2 ml-2">link</label>
                <input class="col-md-9" type="text"  value="">
            </div>
            <div class="tr row">
                <label class="col-md-2 ml-2">imgUrl</label>
                <input class="col-md-9" type="text"  value="">
            </div> 
        `;
        const createBanner = document.createElement('div');
        const deleteBtn = document.createElement('button');

        createBanner.draggable = true;
        createBanner.classList.add("banner");
        createBanner.classList.add("box");
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
            banner_input[0].setAttribute("value", _.get(data, `banner.${i}.bankName`))
            banner_input[1].setAttribute("value", _.get(data, `banner.${i}.text`))
            banner_input[2].setAttribute("value", _.get(data, `banner.${i}.link`))
            banner_input[3].setAttribute("value", _.get(data, `banner.${i}.imgUrl`))
            // banner_input[0].value = _.get(data, `banner.${i}.bankName`)
            // banner_input[1].value = _.get(data, `banner.${i}.text`)
            // banner_input[2].value = _.get(data, `banner.${i}.link`)
            // banner_input[3].value = _.get(data, `banner.${i}.imgUrl`)
        }
    }

    initBannerDiv()

 


}