// import { setDraggable } from './setDraggable.js';

export function fillBannerValue(data) {

    // drag 
    let dragSrcEl = null;
    
    // input 綁定 html tag value
    document.querySelector('#bannerContainer').addEventListener('change', function (event) {
        event.target.setAttribute("value", `${event.target.value}`);
    });

    // 繪製外層div
    function initBannerDiv() {
        const addBannerBtn = document.getElementById("addBannerBtn")
        const bannerImgLength = data.banner.length;

        // 新增按鈕監控
        addBannerBtn.addEventListener('click', function () {
            Banner_Input_Button('new');
            bannerOrder();
            // 新增拖曳
        })
        // 根據資料長度 繪製模板(div input空得沒有值)
        for (let i = 0; i < bannerImgLength; i++) {
            Banner_Input_Button('initial');
        }
        // 將banner 資料填入
        fillBannerInput()
        bannerOrder()
    }

    initBannerDiv()

    function Banner_Input_Button(param) {
 
        const InputTemplate = `
            <h3>橫幅圖片</h3>
            <div class="tr row">
                <label class="col-md-2 ml-2">銀行名稱</label>
                <input class="col-md-9" type="text" value="">
            </div>
            <div class="tr row">
                <label class="col-md-2 ml-2">內容</label>
                <input class="col-md-9" type="text"  value="">
            </div>
            <div class="tr row">
                <label class="col-md-2 ml-2">活動連結</label>
                <input class="col-md-9" type="text"  value="">
            </div>
            <div class="tr row">
                <label class="col-md-2 ml-2">圖片連結</label>
                <input class="col-md-9" type="text"  value="">
            </div>
            <div class="row">
                <label class="col-md-2 ml-2"></label>
                <label class="ml-3" style="color: orange;">註: 圖片尺寸1920 x 600</label>
            </div>
        `;
        const createBanner = document.createElement('div');
        const deleteBtn = document.createElement('button');

        createBanner.draggable = true;
        createBanner.classList.add("banner");
        createBanner.classList.add("box");
        createBanner.innerHTML = InputTemplate;

        deleteBtn.setAttribute('class', 'remove btn btn-danger');
        deleteBtn.innerText = "—";
        deleteBtn.addEventListener('click', function () {
            createBanner.remove();
            bannerOrder();
        })
        createBanner.prepend(deleteBtn);

        if(param === 'initial') {
            document.getElementById('bannerContainer').appendChild(createBanner);
        } else if(param === 'new') {
            document.getElementById('bannerContainer').prepend(createBanner);
        }
        // setDraggable(createBanner)
        //  start -------------------------------------
  
        let items = document.querySelectorAll('#bannerContainer .banner');
 
        function handleDragStart(e) {
            dragSrcEl = this;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML);
        }

        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.dataTransfer.dropEffect = 'move';
            return false;
        }

        function handleDragEnter(e) {
            let items = document.querySelectorAll('#bannerContainer .banner');
            items.forEach(function (item) {
                item.classList.remove('over');
            });
            this.classList.add('over');
        }

        function handleDragLeave(e) {
            if (e.target.className == "banner box") {
                e.target.classList.remove('over');
            }
        }

        function handleDrop(e) {
            if (e.stopPropagation) {
                e.stopPropagation(); // stops the browser from redirecting.
            }
            if (dragSrcEl != this) {
                dragSrcEl.innerHTML = this.innerHTML;
                this.innerHTML = e.dataTransfer.getData('text/html');
            }
            items.forEach(function (item) {
                item.classList.remove('over');
            });

            bannerOrder();

            return false;
        }

        function handleDragEnd(e) {
            this.style.opacity = '1';
            items.forEach(function (item) {
                item.classList.remove('over');
            });
        }

        createBanner.classList.add('transparent');
        createBanner.addEventListener('dragstart', handleDragStart, false);
        createBanner.addEventListener('dragenter', handleDragEnter, false);
        createBanner.addEventListener('dragover', handleDragOver, false);
        createBanner.addEventListener('dragleave', handleDragLeave, false);
        createBanner.addEventListener('dragend', handleDragEnd, false);
        createBanner.addEventListener('drop', handleDrop, false);

        // setDraggable(createBanner)  end -------------------------------------
    }

    function bannerOrder() {
        const allbanner = document.querySelectorAll('#bannerContainer .banner.box.transparent h3')
        allbanner.forEach( (item,index) => {
          item.innerText = `橫幅圖片${index+1}`;
        })
    }


    function fillBannerInput() {
        const bannerInputs = document.querySelectorAll('#bannerContainer [class*="banner"]');

        for (let i = 0; i < bannerInputs.length; i++) {
            const banner_input = bannerInputs[i].querySelectorAll('input');
            banner_input[0].setAttribute("value", _.get(data, `banner.${i}.bankName`))
            banner_input[1].setAttribute("value", _.get(data, `banner.${i}.text`))
            banner_input[2].setAttribute("value", _.get(data, `banner.${i}.link`))
            banner_input[3].setAttribute("value", _.get(data, `banner.${i}.imgUrl`))
        }
    }

}