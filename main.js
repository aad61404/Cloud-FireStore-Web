
/**
 * @param databox 暫存資料變數(顯示、修改、送出)
 * @param readonly 閱讀模式(true : 不能修改, false : 可以修改)
 * 
 * */ 

var dataBox = [];
var readonly = true;
var tbody = document.getElementById('tbody');

// 前面須引入 toast.js
document.getElementById('signOut').addEventListener("click", function() {
    signOut();
})

// 查詢按鈕 function
function inquiry() {
    var selectValue = document.getElementById("custom-select").value
    sendInquiry(selectValue);
    
}

function clearTable() {
    var bankTable = document.getElementById('bank-table').children[0];
    if(bankTable) {
        bankTable.remove();
    }
}
// 送出查詢
function sendInquiry(param) {
    var docRef = firebase.firestore().collection("card").doc(param);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            clearTable();
            dataBox = doc.data();
            drawTable();
            setAllValue();

        } else {
            showToast("No such document!", false)
        }
    }).catch(function(error) {
        // showToast(error, false)
        console.log("Error getting document:", error);
    });
}

function editData() {
    var allTextarea = document.querySelectorAll("textarea");
    if(readonly == true)   {
        readonly = !readonly;
        allTextarea.forEach((item) => {
            item.classList.remove("readonly")
            item.readOnly = false;
            showToast("您現在可以修改資料了 ! <br /> 完成後請點擊確認", true);
        })
    } else {
        readonly = !readonly;
        allTextarea.forEach((item) => {
            item.classList.add("readonly");
            item.readOnly = true;
            showToast("閱讀模式不能修改資料", false);
        })
    }
}


function confirmData() {
    // if (readonly == true) {
    //     showToast("閱讀模式不能修改資料", false);
    //     alert("閱讀模式不能修改資料");
    //     return ;
    // } else {
        showToast("已送出修改", true);
        console.log('dataBox',dataBox);
        var dataBa = {
            id: document.getElementById('id').value,
            isShow: checkBankIsShow(),
            name: document.getElementById('name').value,
            iconUrl: document.getElementById('iconUrl').value,
            logoUrl: document.getElementById('logoUrl').value,
            link: document.getElementById('link').value,
            plans: plansCount(),
            gift: {
                isShow: checkGiftIsShow(),
                texts:  checkGiftTextsValue(),
                begDt: document.getElementById('begDt').value,
                endDt: document.getElementById('endDt').value,
                announce: document.getElementById('announce').value,
                qualify: document.getElementById('qualify').value,
            },

            promo: {
                isShow: checkPromoIsShow(),
                projects: checkPromoProjectValue()
            },
            discount: {
                isShow: checkDiscountIsShow(),
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
        const ID = document.getElementById('id').value;
        // ID: mega
        var db = firebase.firestore();
        var sfDocRef = db.collection("card").doc(ID);

        return db.runTransaction(function(transaction) {
            // This code may get re-run multiple times if there are conflicts.
            return transaction.get(sfDocRef).then(function(sfDoc) {
                if (!sfDoc.exists) {
                    throw "Document does not exist!";
                }
                console.log('sfDocRef:', sfDocRef)
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


function signOut() {
    detect = true;
    firebase.auth().signOut().then(function() {
        localStorage.setItem("authStorage", `Sign out !`);
    })
}

document.addEventListener('DOMContentLoaded', function () {
    var db = firebase.firestore();
    var detect = false;

    // firebase
    // 確認是否登入
    firebase.auth().onAuthStateChanged(function (userInfo) {
        // User is signed in.
        if (userInfo) {
            var user = firebase.auth().currentUser;
            user.providerData.forEach(function (profile) {
                console.log("Provider-specific UID: " + profile.uid);
                showToast('Success signIn', true);
            });
        } else {
            // No user is signed in
            if (detect == false) {
                localStorage.setItem("authStorage", `You have not signIn`);
                console.error('user is null');
                window.location = "/";
            } else {
                localStorage.setItem("authStorage", `Sign out!`);
                window.location = "/";
            }
        }
    });

});

// bankSelect 載入後 將bank資料載入
function bankListInquiry() {
    var db = firebase.firestore();
    db.collection("bankList").get().then(function(querySnapshot) {
        var bankBox = [];
        querySnapshot.forEach(function(doc) {
            bankBox.push(doc.data());
        });
         createBankSelect(bankBox[0]);
    });
}

function createBankSelect(obj) {
    var customSelect = document.getElementById('custom-select');
    Object.keys(obj).sort().forEach(function(item) {
        var option = document.createElement("option");
        option.value = item;
        option.text  = obj[item];
        customSelect.appendChild(option);
    })
}
bankListInquiry()

/**
 
firebase.auth().signInWithEmailAndPassword('settour@gmail.com', 'settour').then(function(res) { 
    console.log('res',res);
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // …
});
 
 */