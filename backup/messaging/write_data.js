/* ========================
      Initialize Firebase
    ======================== */

// console.log('firebase.firestore:', firebase.firestore)
const db = firebase.firestore();
/* ========================
      Variables
    ======================== */
// Initialize Cloud Firestore through Firebas

const writeDataButton = document.getElementById('write');
const writeTitleButton = document.getElementById('push_title');
const writeBodyButton = document.getElementById('push_body');
const writeIconButton = document.getElementById('push_icon');

let titleValue;
let bodyValue;
let iconValue;

/* ========================
      Event Listeners
    ======================== */

function writeData(title, body, icon) {
  var createUser = db.collection('Users').doc();

  db.collection('cities')
    .doc()
    .set({
      name: 'CA',
      state: 'BB',
      country: 'EE',
    })
    .then(function () {
      console.log('Document successfully written!');
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
  return;
}
