export function fenchi() {
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
    setIdInput()
    setFanchiCheckbox()
  return `
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
            <div class="col-md-10 d-block" id="plans">
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
    </div>`;
}
