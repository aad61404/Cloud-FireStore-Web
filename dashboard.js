// 前面須引入 toast.js



document.addEventListener('DOMContentLoaded', function () {

    var detect = false;
    document.getElementById('signOut').addEventListener("click", function() {
        signOut();
    })

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


    // firebase
    // 確認是否登入
    firebase.auth().onAuthStateChanged(function (userInfo) {
        // User is signed in.
        if (userInfo) {
            var user = firebase.auth().currentUser;
            user.providerData.forEach(function (profile) {
                console.log("Provider-specific UID: " + profile.uid);
                showToast('Success signIn', true);
                // console.log("Sign-in provider: " + profile.providerId);
                // console.log("  Name: " + profile.displayName);
                // console.log("  Email: " + profile.email);
                // console.log("  Photo URL: " + profile.photoURL);
            });

            console.log('userInfo', userInfo);
            console.log('need to add toast notification');
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

    // 設 db 變數
    var db = firebase.firestore();
    var dataBox = [];
    var tbody = document.getElementById('tbody');
    // 讀取
    db.collection("card").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            dataBox.push(doc.data());         
        });

        for (let i = 0; i < dataBox.length; i++) {
            console.log(dataBox[i]);
            var tr = tbody.appendChild(document.createElement('tr'));
            tr.className = 'tr row';
            tr.innerHTML = `
            <div class="col-md-1">${dataBox[i].id}</div>
            <div class="col-md-1">${dataBox[i].name}</div>
            <div class="col-md-1">${dataBox[i].分期}</div>
            <textarea class="col-md-1">${dataBox[i].icon}</textarea>
            <textarea class="col-md-1">${JSON.stringify(dataBox[i].刷卡滿額禮)}</textarea>
            <textarea class="col-md-1">${dataBox[i].卡友優惠專案}</textarea>
            <textarea class="col-md-1">${dataBox[i].注意事項}</textarea>
            <textarea class="col-md-1">${JSON.stringify(dataBox[i].活動時間)}</textarea>
            <textarea class="col-md-1">${dataBox[i].活動詳情}</textarea>
            <textarea class="col-md-1">${dataBox[i].紅利折扣}</textarea>
            <textarea class="col-md-1">${dataBox[i].詳細說明}</textarea>
            <div class="col-md-1"> <p>編輯</p> <p>刪除</p></div>
            `;
            // const element = array[i];
            
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