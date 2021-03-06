export function fillPlanValue(data) {
    console.log('data:', data)
  // 寫入表單
  function setAllValue() {
    setPlansNotice(); // 分期注意事項
  }
  setAllValue();

  // render  注意事項 Input , Button
  function setPlansNotice() {
    const plansNotice = document.getElementById('plansNotice');
    const noticeLength = data.instalmentDesc.length;
    const addPlanBtn = document.getElementById('addPlanBtn');
    plansNotice.innerHTML = '';

    // addPlanBtn.setAttribute('class', 'btn btn-info d-block mb-3');
    // addPlanBtn.innerText = '分期注意事項 ＋';
    addPlanBtn.onclick = function () {
      let addInput = document.createElement('input');
      let addDelBtn = document.createElement('button');

      addInput.setAttribute('type', 'text');
      addInput.setAttribute('class', 'detail col-md-11');

      addDelBtn.setAttribute('class', 'btn btn-danger');
      addDelBtn.innerText = '—';
      addDelBtn.addEventListener('click', function () {
        this.previousSibling.remove();
        this.remove();
      });
      plansNotice.append(addInput, addDelBtn);
    };

    // Set Inputs Texts
    for (let i = 0; i < noticeLength; i++) {
      let announceTemplate = document.createElement('input');
      announceTemplate.setAttribute('type', 'text');
      announceTemplate.classList.add('detail');
      announceTemplate.classList.add('col-md-11');
      announceTemplate.value = data.instalmentDesc[i];

      let detailDelBtn = document.createElement('button');
      detailDelBtn.setAttribute('class', 'btn btn-danger');
      detailDelBtn.innerText = '—';
      detailDelBtn.addEventListener('click', function () {
        announceTemplate.remove();
        detailDelBtn.remove();
      });

      plansNotice.appendChild(announceTemplate);
      plansNotice.appendChild(detailDelBtn);
    }
  }
}
