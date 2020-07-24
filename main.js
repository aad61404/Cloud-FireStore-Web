
/**
 * @param databox 暫存資料變數(顯示、修改、送出)
 * @param readonly 閱讀模式(true : 不能修改, false : 可以修改)
 * 
 *  
 * */ 

var dataBox = [];
var readonly = true;
var tbody = document.getElementById('tbody');

// 前面須引入 toast.js
// document.getElementById('select-btn').addEventListener("click", function() {
//     inquiry();
// })
document.getElementById('signOut').addEventListener("click", function() {
    signOut();
})

// 查詢按鈕 function
function inquiry() {
    // console.log( 'select-value : ' ,$('#custom-select')[0].value);
    var selectValue = document.getElementById("custom-select").value
    sendInquiry(selectValue);
    clearTable();
 
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
            dataBox = doc.data();
            console.log('doc.data():', doc.data())
            drawTable();
            setAllValue()
        } else {
            // doc.data() will be undefined in this case
            showToast("No such document!", false)
        }
    }).catch(function(error) {
        // showToast(error, false)
        console.log("Error getting document:", error);
    });
}

// 送出修改
function sendEditing(param) {
    var selectValue = document.getElementById("custom-select").value;
    console.log('selectValue:', selectValue)
    console.log('param:', param)
    // firebase.firestore().collection("card").doc(selectValue).set(param).then(function() {
    //     console.log("Document successfully written!");
    //     console.log('param:', param)
    // });
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
    if (readonly == true) {
        showToast("閱讀模式不能修改資料", false);
        alert("閱讀模式不能修改資料");
        return ;
    } else {
        showToast("修改資料已送出", true);
        // alert("修改資料已送出");
        console.log('dataBox',dataBox);
        // alert(dataBox);
        var allTextarea = document.querySelectorAll("textarea");
        var dataBa = {
            // 有更新了 請重新檢查
            id: allTextarea[0].value,
            name: allTextarea[1].value,
            分期: allTextarea[2].value,
            icon: allTextarea[3].value,
            活動詳情: allTextarea[4].value,
            刷卡滿額禮: JSON.parse(allTextarea[5].value),
            活動時間: JSON.parse(allTextarea[6].value),
            卡友優惠專案: JSON.parse(allTextarea[7].value),
            紅利折扣: allTextarea[8].value,
            詳細說明: JSON.parse(allTextarea[9].value),
        };
        sendEditing(dataBa);
    }

}


function signOut() {
    detect = true;
    firebase.auth().signOut().then(function() {
        localStorage.setItem("authStorage", `Sign out !`);
        console.error('Log out');
        // window.location = "/";
        // var user = firebase.auth().currentUser;
        // console.log(user)
      })
    // alert("hello");
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
            // console.log('userInfo', userInfo);
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