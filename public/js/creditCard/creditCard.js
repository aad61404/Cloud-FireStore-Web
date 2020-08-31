// creditCardSpecial.js (firestore && Auth && 搜尋資料和送出)
// searchEditComfirm.js (表單資料內容操作)
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

import { firebaseConfig } from '../firebaseConfig.js';
import { initLogin } from '../initLogin.js';
import { showMessage } from '../showMessage.js';
import { searchEditComfirm } from './searchEditComfirm.js';
import { initForm } from './initForm.js';

document.addEventListener('DOMContentLoaded', function () {
  /***  Initialize Firebase ***/
  firebase.initializeApp(firebaseConfig);
  /***  登入 && 登出 start    ****/
  initLogin();

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        window.location = '/info/cardAdmin/index.html';
      });
  }

  /***  登入 && 登出 end    ****/

  /***  addEventListener start    ****/
  document.getElementById('signOut').addEventListener('click', function () {
    signOut();
  });
  document.getElementById('newbank-btn').addEventListener('click', function () {
    sendNewBank(); // 新增銀行
  });
  document.getElementById('select-btn').addEventListener('click', function () {
    sendSearch(); // 送出查詢
  });
  document.getElementById('edit-btn').addEventListener('click', function () {
    unLocked(); // 開放編輯
  });
  document.getElementById('edit-btn2').addEventListener('click', function () {
    discardChange(); // 放棄編輯
  });
  document.getElementById('confirm-btn').addEventListener('click', function () {
    sendModify(); // 送出
  });

  /***  addEventListener end    ****/

  //------------------------
  // /***  variable    ****/
  //------------------------

  /***  Search Bar  (V) ****/
  let lockedStat = 1; // 按鈕狀態
  let MessageTexts = ''; // 錯誤提示儲存 空間

  /*** Cookie 與 Selector 操作 邏輯  ***/
  /*** 有allBankName 在cookie -> 印出 ， 若cookie 沒有 allBankName -> queryBankName (撈資料) 再印出  ***/
  if (_.isEmpty(getCookie('allBankName'))) {
    console.log('no cookie');
    queryBankName();
  } else {
    const allBankName = JSON.parse(getCookie('allBankName'));
    const customSelect = document.getElementById('custom-select');
    allBankName.forEach((element) => {
      const option = document.createElement('option');
      option.value = element.id;
      option.text = element.text;
      customSelect.appendChild(option);
    });
  }

  //------------------------
  // /***  function    ****/
  //------------------------

  /***  selector value 存在cookie  start ****/
  // 新增 cookie
  function createCookie(name, value) {
    const date = new Date();
    date.setTime(date.getTime() + 1000 * 1000);
    const expires = '; expires=' + date.toGMTString();

    document.cookie = name + '=' + value + expires + '; path=/';
  }
  // 讀取 cookie
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  //刪除cookie
  function delCookie(name) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = getCookie(name);
    if (cval != null)
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
  }

  // firestore 拿資料 存入selector
  function queryBankName() {
    const db = firebase.firestore();
    const customSelect = document.getElementById('custom-select');
    const bankNameBox = [];

    db.collection('CreditCards')
      .get()
      .then(function (querySnapshot) {
        /***  Search Bar  (M) ****/
        querySnapshot.forEach(function (doc) {
          const smallbox = {};
          smallbox.id = doc.id;
          smallbox.text = doc.data().name;
          bankNameBox.push(smallbox);
        });
      })
      .then(function () {
        createCookie('allBankName', JSON.stringify(bankNameBox));
        const allBankName = JSON.parse(getCookie('allBankName'));
        console.log('allBankName:', allBankName);
        allBankName.forEach((element) => {
          const option = document.createElement('option');
          option.value = element.id;
          option.text = element.text;
          customSelect.appendChild(option);
        });
      });
  }
  /***  selector value 存在cookie  end ****/

  /***  Click Bar  (C)  start ****/

  // show div
  function showDisplay() {
    const tbl = document.getElementById('bank-Form');
    // tbl.classList.toggle('hidden')
    if (tbl.classList.contains('hidden')) {
      tbl.classList.add('show');
      tbl.classList.remove('hidden');
    }
  }

  // 新增銀行
  function sendNewBank() {
    showDisplay();
    initForm();
    // 新增銀行 radio預設
    const confirmBtn = document.getElementById('confirm-btn');
    const bankRadio = document.querySelectorAll('#bankIsShow input[type="radio"]');
    const allRadio = document.querySelectorAll('#bank-Form input[type="radio"]');
    const lockedBtn = document.getElementById('edit-btn');
    const discardBtn = document.getElementById('edit-btn2');

    bankRadio[0].checked = true; // 信用卡優惠專區 true
    allRadio[3].checked = true; // 刷卡滿額禮 false
    allRadio[5].checked = true; // 卡友優惠專案 false
    allRadio[7].checked = true; // 紅利折扣 false
    
    // BTN 消失 
    lockedBtn.classList.add('invisible');
    confirmBtn.classList.remove('invisible');
    discardBtn.classList.add('invisible');
    // select 設為預設
    document.getElementById('custom-select').value = 'default';
  }

  // 送出查詢
  function sendSearch() {
    const selectValue = document.getElementById('custom-select').value;
    const docRef = firebase.firestore().collection('CreditCards').doc(selectValue);

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          showDisplay();
          initForm();
          searchEditComfirm(doc.data());
          Locked();
          showEditBtn();
        } else {
          showMessage('No such document!', false);
        }
      })
      .catch(function (error) {
        // showMessage(error, false)
        console.log('Error getting document:', error);
      });
  }

  function showEditBtn() {
    const confirmBtn = document.getElementById('confirm-btn');
    const lockedBtn = document.getElementById('edit-btn');
    const discardBtn = document.getElementById('edit-btn2');

    confirmBtn.classList.add('invisible');
    lockedBtn.classList.remove('invisible');
    discardBtn.classList.add('invisible');

    lockedStat = 1;
  }

  // 送出編輯
  function sendModify() {
    const db = firebase.firestore();
    const ID = document.getElementById('id').value; // ID: mega
    const bankRef = db.collection('CreditCards').doc(ID);
    const idIsReadOnly = document.getElementById('id').readOnly;
    const confirmBtn = document.getElementById('confirm-btn');
    if (checkAllDataIsEmpty() == null) return;

    const dataBa = {
      id: document.getElementById('id').value,
      name: document.getElementById('name').value,
      isShow: checkDataIsShow('bankIsShow'),
      link: document.getElementById('link').value,
      plans: calcPlans(), // calc => Calculate
      gift: {
        isShow: checkDataIsShow('gift'),
        begDt: document.getElementById('begDt').value,
        endDt: document.getElementById('endDt').value,
        announce: document.getElementById('announce').value,
        qualify: document.getElementById('qualify').value,
        desc: checkGiftDescValue(),
      },
      promo: {
        isShow: checkDataIsShow('promo'),
        projects: checkPromoProjectValue(),
      },
      discount: {
        isShow: checkDataIsShow('discount'),
        content: {
          point: document.getElementById('point').value,
          amount: document.getElementById('amount').value,
          upper: document.getElementById('upper').value,
          lower: document.getElementById('lower').value,
        },
        detail: {
          desc: calcDesc(), // 詳細說明
          notice: calcNotice(), // 注意事項
        },
      },
    };

    if (
      dataBa.gift.desc === false ||
      dataBa.promo.projects === false ||
      dataBa.discount.detail.desc === false ||
      dataBa.discount.detail.notice === false
    ) {
      showMessage('請再檢查上架內容是否有空欄位', false);
      return null;
    }

    // 1.  id 是readOnly -> 新增
    // 2.  id 不是readOnly 編輯
    if (idIsReadOnly === false) {
      let dataSize;
      let allId = [];

      db.collection('CreditCards')
        .get()
        .then(function (querySnapshot) {
          dataSize = querySnapshot.size;
          dataBa.seqNo = dataSize;
          querySnapshot.forEach((doc) => {
            allId.push(doc.id);
          });

          // 資料庫裡沒有該id -> 新增資料 ， 有的話跳 ->錯誤視窗
          const idExist = allId.includes(document.getElementById('id').value);
          if (idExist) {
            showMessage('這個id已經存在', false);
            return;
          } else {
            db.collection('CreditCards')
              .doc(ID)
              .set(dataBa)
              .then(function () {
                showMessage('新增成功', true);
                console.log('Document successfully written!');
                // 08/20
                // selector 改用 cookie 讀取 在cookie 重新render前
                delCookie('allBankName');
                // end ------------------
                setTimeout(() => {
                  window.location.reload();
                }, 1300);
              })
              .catch(function (error) {
                showMessage(error, false);
                console.log('Transaction failed: ', error);
              });
          }
        });
    } else {
      // update 編輯

      return db
        .runTransaction(function (transaction) {
          return transaction.get(bankRef).then(function (sfDoc) {
            if (!sfDoc.exists) {
              throw 'Document does not exist!';
            } else {
              showMessage('編輯成功!', true);
              bankRef
                .set(dataBa, {
                  merge: true,
                })
                .then(function () {
                  showMessage('編輯成功!', true);
                })
                .catch(function (error) {
                  showMessage(error, false);
                });
            }
          });
        })
        .then(function () {
          initForm();
          sendSearch();
          confirmBtn.classList.add('invisible');
          console.log('Transaction successfully committed!');
        })
        .catch(function (error) {
          console.log('Transaction failed: ', error);
        });
    }
  }

  // ----------------------------------
  /**** 渲染下方 form 的function    start ****/
  // ----------------------------------

  // Radio isShow value
  function checkDataIsShow(id) {
    const dataIsChecked = $('#' + id + ' input:checked');
    if (dataIsChecked.length === 0) {
      return;
    }
    const isTrueSet = dataIsChecked[0].value == 'true'; // 將"true" 轉成 true

    return isTrueSet;
  }

  //  3,6,10,12 點擊後觸發 (databox.plans)
  function calcPlans() {
    const plansBox = [];
    const plansChecked = $('#plans input:checked');

    for (let i = 0; i < plansChecked.length; i++) {
      plansBox.push(plansChecked[i].value);
    }
    return plansBox;
  }

  // 送出時 檢查 二、刷卡滿額禮所有欄位 (databox.gift.texts)
  function checkGiftDescValue() {
    let giftDescBox = [];
    const allGifts = document.querySelectorAll(
      '#giftContainer [class*="gift"]'
    );

    for (let i = 0; i < allGifts.length; i++) {
      const giftInputs = allGifts[i].querySelectorAll('input');
      const emptyObject = {};
      emptyObject.condition = giftInputs[0].value;
      emptyObject.receive = giftInputs[1].value;
      emptyObject.remark = giftInputs[2].value;
      if (_.isEmpty(giftInputs[0].value) || _.isEmpty(giftInputs[1].value)) {
        // MessageTexts += '刷卡滿額禮優惠  未填請檢查 <br />'
        // showMessage("刷卡滿額禮 有欄位未填", false);
        return (giftDescBox = false);
      }
      giftDescBox.push(emptyObject);
    }
    return giftDescBox;
  }

  // 檢查 三、卡友優惠專案 欄位
  function checkPromoProjectValue() {
    let promoBox = [];
    const allPromos = document.querySelectorAll(
      '#promoContainer [class*="promo"]'
    );

    for (let i = 0; i < allPromos.length; i++) {
      const promoInputs = allPromos[i].querySelectorAll('input');
      const emptyObject = {};
      emptyObject.text = promoInputs[0].value;
      emptyObject.link = promoInputs[1].value;
      emptyObject.imgUrl = promoInputs[2].value;
      if (_.isEmpty(promoInputs[0].value) || _.isEmpty(promoInputs[1].value)) {
        return (promoBox = false);
      }
      promoBox.push(emptyObject);
    }
    // console.log('promoBox:', promoBox)
    return promoBox;
  }

  // 四、紅利折扣 詳細說明  送出
  function calcDesc() {
    let descBox = [];
    const detailInputs = document.querySelectorAll('#detailedDesc input');
    detailInputs.forEach(function (item) {
      if (_.isEmpty(item.value)) {
        // showMessage("詳細說明 有欄位未填 <br />編輯未送出", false);
        return (descBox = false);
      }
      descBox.push(item.value);
    });
    return descBox;
  }

  // 四、紅利折扣  注意事項  送出 ,  calc => Calculate
  function calcNotice() {
    let noticeBox = [];
    const noticeInputs = document.querySelectorAll('#detailedNotice input');
    noticeInputs.forEach(function (item) {
      if (_.isEmpty(item.value)) {
        // showMessage("詳細說明-注意事項 有欄位未填 <br />編輯未送出", false);
        return (noticeBox = false);
      }
      noticeBox.push(item.value);
    });
    return noticeBox;
  }
  /**** 渲染下方 form 的function  end  ****/
  //------------------------

  /**** 其他 新增 start ****/
  //------------------------

  // readonly input
  function Locked() {
    const allInputs = document.querySelectorAll('#bank-Form input[type=text]');
    const allBtn = document.querySelectorAll('#bank-Form button');
    const allRadiobox = document.querySelectorAll(
      '#bank-Form input[type=radio]'
    );
    const allCheckbox = document.querySelectorAll(
      '#bank-Form input[type=checkbox]'
    );
    const confirmBtn = document.getElementById('confirm-btn');

    allInputs[0].setAttribute('class', 'form-control deepGreen readonly');
    allInputs[0].setAttribute('readonly', true);
    allInputs[1].setAttribute('class', 'form-control deepGreen readonly');
    // allInputs[1].setAttribute('class', 'col-md-10 readonly');
    allInputs[1].setAttribute('readonly', true);

    for (let i = 2; i < allInputs.length; i++) {
      allInputs[i].classList.add('readonly');
      allInputs[i].setAttribute('readonly', true);
    }

    allBtn.forEach((item) => {
      item.setAttribute('disabled', true);
    });

    allRadiobox.forEach((item) => {
      item.setAttribute('disabled', true);
    });
    allCheckbox.forEach((item) => {
      item.setAttribute('disabled', true);
    });

  }

  function unLocked() {
    const allInputs = document.querySelectorAll('#bank-Form input[type=text]');
    const allBtn = document.querySelectorAll('#bank-Form button');
    const allRadiobox = document.querySelectorAll(
      '#bank-Form input[type=radio]'
    );
    const allCheckbox = document.querySelectorAll(
      '#bank-Form input[type=checkbox]'
    );
    const confirmBtn = document.getElementById('confirm-btn');
    const lockedBtn = document.getElementById('edit-btn');
    const discardBtn = document.getElementById('edit-btn2');
    for (let i = 2; i < allInputs.length; i++) {
      allInputs[i].classList.toggle('readonly');
      allInputs[i].toggleAttribute('readonly');
    }

    allBtn.forEach((item) => {
      item.toggleAttribute('disabled');
    });

    allRadiobox.forEach((item) => {
      item.toggleAttribute('disabled');
    });
    allCheckbox.forEach((item) => {
      item.toggleAttribute('disabled');
    });

    // confirmBtn.classList.remove('invisible');
    lockedStat++;
    // 第一次點擊編輯
    if (lockedStat == 2) {
      lockedBtn.classList.add('invisible');
      discardBtn.classList.remove('invisible');
      // if(confirmBtn.classList.contains('invisible')) {
        confirmBtn.classList.remove('invisible');
      // }  
    }
    // 點擊放棄編輯
    if (lockedStat >= 3) {
      confirmBtn.classList.add('invisible');
      discardChange()
    }
  }

  function discardChange() {
    const confirmBtn = document.getElementById('confirm-btn');
    const lockedBtn = document.getElementById('edit-btn');
    const discardBtn = document.getElementById('edit-btn2');
    discardBtn.classList.add('invisible');
    lockedBtn.classList.remove('invisible');
    lockedStat = 1;
    initForm();
    sendSearch();
  }

  /***  檢查是否未填       start ***/
  function checkAllDataIsEmpty() {
    // 信用卡優惠專區
    if (_.isEmpty(document.getElementById('id').value))
      MessageTexts += 'id 未填請檢查 <br />';
    if (_.isEmpty(document.getElementById('name').value))
      MessageTexts += 'name 未填請檢查 <br />';
    if (_.isEmpty(document.querySelectorAll('#plans input[type="checkbox"]:checked')))
      MessageTexts += '適用無息分期 未填請檢查 <br />';

    // 二. 刷卡滿額禮
    if (document.querySelectorAll('#gift input')[0].checked == true) {
      if (checkGiftInputs() === false)
        MessageTexts += '刷卡滿額禮優惠  未填請檢查 <br />';
      if (
        _.isEmpty(document.getElementById('begDt').value) ||
        _.isEmpty(document.getElementById('endDt').value)
      )
        MessageTexts += '活動日期 未填請檢查 <br />';
      if (_.isEmpty(document.getElementById('announce').value))
        MessageTexts += '注意事項 未填請檢查 <br />';
      if (_.isEmpty(document.getElementById('qualify').value))
        MessageTexts += '領取條件 未填請檢查 <br />';
      if (_.isEmpty(document.getElementById('link').value))
        MessageTexts += '活動詳情連結 未填請檢查 <br />';
    }
    // 三. 卡友優惠專案
    if (document.querySelectorAll('#promo input')[0].checked == true) {
      if (checkPromoInputs() === false)
        MessageTexts += '卡友優惠專案  未填請檢查 <br />';
    }
    // 四. 紅利折扣
    if (document.querySelectorAll('#discount input')[0].checked == true) {
      if (
        _.isEmpty(document.getElementById('point').value) ||
        _.isEmpty(document.getElementById('amount').value) ||
        _.isEmpty(document.getElementById('upper').value)
      ) {
        MessageTexts += '紅利折扣內容 未填請檢查 <br />';
      }
      if (checkDetailedInputs() === false)
        MessageTexts += '詳細說明 未填請檢查 <br />';
    }

    // show text
    if (MessageTexts.length > 0) {
      showMessage(MessageTexts, false);
      MessageTexts = '';
      console.log('null', null);
      return null;
    }
    return true;
  }

  function checkGiftInputs() {
    const allGiftInputs = document.querySelectorAll(
      '#giftContainer .gift input'
    );
    for (let index = 0; index < allGiftInputs.length; index++) {
      // 只檢查前兩個欄位
      if ((index + 1) % 3 == 0) {
        continue;
      }
      if (_.isEmpty(allGiftInputs[index].value)) {
        return false;
      }
    }
  }

  function checkPromoInputs() {
    const promoInputs = document.querySelectorAll('#promoContainer input');
    for (let index = 0; index < promoInputs.length; index++) {
      if (_.isEmpty(promoInputs[index].value)) {
        return false;
      }
    }
  }

  function checkDetailedInputs() {
    const descInputs = document.querySelectorAll('#detailedDesc input');
    const noticeInputs = document.querySelectorAll('#detailedNotice input');
    if (descInputs.length === 0 && noticeInputs.length === 0) {
      return true;
    }
    for (let index = 0; index < descInputs.length; index++) {
      if (_.isEmpty(descInputs[index].value)) {
        return false;
      }
    }
    for (let index = 0; index < noticeInputs.length; index++) {
      if (_.isEmpty(noticeInputs[index].value)) {
        return false;
      }
    }
  }

  /***  檢查是否未填 end ***/
});

