    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyA5AdaG4X4sxWhSkvCiJFDWeItMjxBIrAY",
        authDomain: "cloud-firestore-18cc4.firebaseapp.com",
        databaseURL: "https://cloud-firestore-18cc4.firebaseio.com",
        projectId: "cloud-firestore-18cc4",
        storageBucket: "cloud-firestore-18cc4.appspot.com",
        messagingSenderId: "319103299280",
        appId: "1:319103299280:web:3d630273a7c359573938d5",
        measurementId: "G-G9R3S9WQV6"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var firestore = firebase.firestore();

    // const docRef = firestore.collection("samples").doc("sandwitchData").collection("condiments").doc("relish").collection("opinions").doc("...");
    const docRef = firestore.collection("samples").doc("sandwitchData");
    const outputHeader = document.querySelector("#hotDogOutPut");
    const inputTextField = document.querySelector("#latestHotDogStatus");
    const saveButton = document.querySelector("#saveButton");
    const loadButton = document.querySelector("#loadButton");

    saveButton.addEventListener("click", function () {
        const textToSave = inputTextField.value;
        console.log("I am going to save " + textToSave + "to FireStore");
        docRef.set({
            hotDogStatus: textToSave
        }).then(function () {
            console.log('Status saved!');
        }).catch(function (err) {
            console.log('Got an err', err)
        })
    })

    loadButton.addEventListener("click", function(){
        docRef.get().then(function(doc){
            if (doc && doc.exists) {
                console.log('doc:', doc)
                const myData = doc.data();
                console.log('myData:', myData)
                outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus;
            }
        }).catch(function(err) {
            console.log("Got an err", err);
        })
    })

    getRealtimeUpdates = function() {
        docRef.onSnapshot(function(doc) {
            // 跟上面一樣
            if (doc && doc.exists) {
                console.log('doc:', doc)
                const myData = doc.data();
                console.log('myData:', myData)
                outputHeader.innerText = "Hot dog status: " + myData.hotDogStatus;
            }
        })
    }
    getRealtimeUpdates()