function askForNotificationPermission() {
    Notification.requestPermission(function(result) {
        console.log('result:', result);
        if(result !== 'granted') {
            console.log('No notification permission granted!');
        } else {
            displayComfirmNotification();
        }
    })
}

function displayComfirmNotification() {
    var options = { 
        body : 'You successfully subscribed to our Notification service!'
    }
    new Notification('Successfully subscribed!', options);
}
