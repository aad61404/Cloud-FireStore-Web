// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

import { firebaseConfig } from '../firebaseConfig.js';
import { showMessage } from '../showMessage.js';
import { initLogin } from '../initLogin.js';


document.addEventListener('DOMContentLoaded', function () {

    /***  Initialize Firebase ***/
    firebase.initializeApp(firebaseConfig);

    /***  登入 && 登出 start    ****/
    initLogin();

    function signOut() {
        firebase.auth().signOut().then(function () {
            localStorage.setItem("authStorage", `Log out!`);
            window.location = '/';
        })
    }

    document.getElementById('signOut').addEventListener("click", function () {
        signOut();
    })
    document.getElementById('locked-btn').addEventListener("click", function () {
        toogleLockedBtn();
    })

    document.getElementById('autoSort-btn').addEventListener('click', function () {
        autoSortBtn(); // 自動排列
    })

    document.getElementById('comfirm').addEventListener('click', function () {
        sendCalcOrder(); // 確認
    })



    /***  登入 && 登出 end    ****/

    /***  initial set start    ****/
    const db = firebase.firestore();
    const ori_SeqNoArray = [];
    
    let lockedStat = 0;
    db.collection("CreditCards").orderBy("seqNo", "asc").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            ori_SeqNoArray.push({
                id: doc.id,
                name: doc.data().name,
                gift: {
                    isShow: doc.data().gift.isShow
                },
                promo: {
                    isShow: doc.data().promo.isShow
                },
                seqNo: doc.data().seqNo
            });
        });

        opsCmd(ori_SeqNoArray)
        toogleLockedBtn();
    });

    /***  initial set end    ****/


    function opsCmd(data) {
        console.log('ori_SeqNoArray:', data)
        initUlLi(data)
        setDragFunction()
    }


    /***  set data to ul li start    ****/
    function initUlLi(data) {
        const dragContainer = document.getElementById('dragContainer');
        dragContainer.innerHTML = '';
        console.log('initUlLi data:', data)
        const ul = document.createElement('ul');
        ul.setAttribute('class', 'drag-sort-enable');
        ul.setAttribute('id', 'dragList');
        data.forEach((item) => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name}`;
            li.setAttribute('draggable', true);
            li.setAttribute('class', 'draggable li-item');
            li.setAttribute('value', `${item.id}`);
            ul.appendChild(li);
        });
        dragContainer.appendChild(ul);
    }

    /***  set data to ul li end    ****/

    /***  drag 功能 start    ****/

    function setDragFunction() {
        //  來自 https://codepen.io/fitri/pen/VbrZQm  start
        function enableDragSort(listClass) {
            const sortableLists = document.getElementsByClassName(listClass);
            Array.prototype.map.call(sortableLists, (list) => {enableDragList(list)});
          }
          
          function enableDragList(list) {
            Array.prototype.map.call(list.children, (item) => {enableDragItem(item)});
          }
          
          function enableDragItem(item) {
            item.setAttribute('draggable', true)
            item.ondrag = handleDrag;
            item.ondragend = handleDrop;
          }
          
          function handleDrag(item) {
            const selectedItem = item.target,
                  list = selectedItem.parentNode,
                  x = event.clientX,
                  y = event.clientY;
            
            selectedItem.classList.add('drag-sort-active');
            let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);
            
            if (list === swapItem.parentNode) {
              swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
              list.insertBefore(selectedItem, swapItem);
            }
          }
          
          function handleDrop(item) {
            item.target.classList.remove('drag-sort-active');
          }
          
          (()=> {enableDragSort('drag-sort-enable')})();
         //  來自 https://codepen.io/fitri/pen/VbrZQm  end
    }
    /***  drag 功能 end    ****/

    /***  自動排序  start    ****/
    function autoSortBtn() {
        const weightBox = ori_SeqNoArray.map(card => {
            const newCard = card;
            if (card.gift.isShow && card.promo.isShow) {
                newCard.weight = 2;
                return newCard;
            } else if (card.gift.isShow) {
                newCard.weight = 1;
                return newCard;
            } else {
                newCard.weight = 0;
                return newCard;
            }
        }).sort((a, b) => {
            if (a.weight < b.weight) {
                return 1;
            }
            if (a.weight > b.weight) {
                return -1;
            }
            return 0;
        })
        // 清空
        console.log('weightBox:', weightBox)
        initUlLi(weightBox)
        setDragFunction()
    }
     /***  自動排序  end    ****/

     /***  送出  start    ****/
     function sendCalcOrder() {
        const listLi = document.querySelectorAll('#dragList li');
        const bankOrder = [];

        listLi.forEach(function (item) {
            bankOrder.push(item.getAttribute("value"));
        })

        bankOrder.forEach(function (item, index) {
            const db = firebase.firestore();
            const bankRef = db.collection('CreditCards').doc(item);
            bankRef.set({
                seqNo: index
            }, {
                merge: true
            }).then(function () {
                showMessage('修改成功', true);
                const refresh = () => window.location.reload();
                setTimeout(refresh,1000); // 1秒後刷新
            }).catch(function (error) {
                showMessage(error, false);
            })
        })
        console.log('bankOrder:', bankOrder)
    }
    /***  送出  end   ****/

    // 
    function toogleLockedBtn() {
        const allBtn = document.querySelectorAll('#dragList li')
        const comfirmBtn = document.getElementById('comfirm');
        const sortBtn = document.getElementById('autoSort-btn');
        const lockedBtn = document.getElementById('locked-btn');

        allBtn.forEach(item => {
            item.classList.toggle('readonly')
            item.classList.toggle('liLocked')
        })
        comfirmBtn.toggleAttribute("disabled");
        sortBtn.toggleAttribute("disabled");
        lockedStat++;
        if (lockedStat >= 2) {
            lockedBtn.innerText = '取消修改'
        }
        if (lockedStat >= 3) {
            window.location.reload();
        }
    }

});