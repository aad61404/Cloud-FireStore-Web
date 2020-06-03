curl -X POST -H "Authorization: key=AAAASkwJ7tA:APA91bGzn9qgNUD2i6ggsEoQai9No-mfPxcP7MHTtRoGthWCoKEqYPrUlsKqX1w8e0OrBIPUpHxiy8P-7pr_nEXdREL50RqFtZ8r2YN7xRVQ-l7KVkKxLq6aN9cq0nuHPMVX4NeIAVnG" -H "Content-Type: application/json" \
   -d '{
  "data": {
    "notification": {
        "title": "FCM Message",
        "body": "This is an FCM Message",
        "icon": "/itwonders-web-logo.png",
    }
  },
  "to": "czdujbh-6cBtsyFDEyYIPi:APA91bHkQjAC91tzhvOVoP5t_OTR69ZBhZZZZDc62GOki9y6thlAEmHa2zYfECTy5ZwoPpkf3Mlp0EXp1wB1h8Qj6dD6iO4D7oH_Wo1ppfBZGWKH9neiw86uVbT1YZgOMU1PVvv62YEF"
}' https://fcm.googleapis.com/fcm/send
