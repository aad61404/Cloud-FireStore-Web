  // 進入 dashboard.html 將bank資料載入 select
export  function bankListInquiry() {
    const db = firebase.firestore();
    db.collection("bankList").get().then(function(querySnapshot) {
        let bankBox = [];
        querySnapshot.forEach(function(doc) {
            bankBox.push(doc.data());
        });

        let customSelect = document.getElementById('custom-select');
        Object.keys(bankBox[0]).sort().forEach(function(item) {
            var option = document.createElement("option");
            option.value = item;
            option.text  = bankBox[0][item];
            customSelect.appendChild(option);
        })
    });
}

bankListInquiry()

// 清除 bank-table 內容(第二次送出查詢)
export function clearTable() {
    var bankTable = document.getElementById('bank-table').children[0];
    if(bankTable) {
        bankTable.remove();
    }
}

// 送出查詢
export function sendSearch() {
    let selectValue = document.getElementById("custom-select").value
    let docRef = firebase.firestore().collection("card").doc(selectValue);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            clearTable();
            dataBox = doc.data(); // 資料儲存區
            drawTable();
            setAllValue();

        } else {
            showMessage("No such document!", false)
        }
    }).catch(function(error) {
        // showMessage(error, false)
        console.log("Error getting document:", error);
    });
}

export function sendModify() {
    showMessage("已送出修改", true);
    console.log('dataBox',dataBox);
    var dataBa = {
        id: document.getElementById('id').value,
        isShow: checkDataIsShow("bankIsShow"),
        name: document.getElementById('name').value,
        iconUrl: document.getElementById('iconUrl').value,
        logoUrl: document.getElementById('logoUrl').value,
        link: document.getElementById('link').value,
        plans: plansCount(),
        gift: {
            isShow: checkDataIsShow("gift"),
            texts:  checkGiftTextsValue(),
            begDt: document.getElementById('begDt').value,
            endDt: document.getElementById('endDt').value,
            announce: document.getElementById('announce').value,
            qualify: document.getElementById('qualify').value,
        },

        promo: {
            isShow: checkDataIsShow("promo"),
            projects: checkPromoProjectValue()
        },
        discount: {
            isShow: checkDataIsShow("discount"),
            content: {
                point: document.getElementById('point').value,
                back: document.getElementById('back').value,
                upper: document.getElementById('upper').value,
                lower: document.getElementById('lower').value,
            },
            detail: {
                announces: announceCount(),
                texts: detailCount()
            }
        }
    };
    console.log('dataBa:', dataBa);
    let ID = document.getElementById('id').value;
    // ID: mega
    var db = firebase.firestore();
    var sfDocRef = db.collection("card").doc(ID);

    return db.runTransaction(function(transaction) {
        return transaction.get(sfDocRef).then(function(sfDoc) {
            if (!sfDoc.exists) {
                throw "Document does not exist!";
            }
            console.log('sfDoc:', sfDoc.data())
            sfDocRef.set(dataBa).then(function() {
                console.log("Document successfully written!");
            });
        });
    }).then(function() {
        console.log("Transaction successfully committed!");
    }).catch(function(error) {
        console.log("Transaction failed: ", error);
    });
}



const selectBtn = document.getElementById('select-btn')
const confirmBtn = document.getElementById('confirm-btn')
selectBtn.addEventListener('click', function() {
    sendSearch();
})
confirmBtn.addEventListener('click', function() {
    sendModify();
})
  