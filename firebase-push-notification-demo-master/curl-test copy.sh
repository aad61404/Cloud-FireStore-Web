curl -X POST -H "Authorization: key=AAAASkwJ7tA:APA91bGzn9qgNUD2i6ggsEoQai9No-mfPxcP7MHTtRoGthWCoKEqYPrUlsKqX1w8e0OrBIPUpHxiy8P-7pr_nEXdREL50RqFtZ8r2YN7xRVQ-l7KVkKxLq6aN9cq0nuHPMVX4NeIAVnG" -H "Content-Type: application/json" \
   -d '{
  "data": {
    "notification": {
        "title": "FCM Message",
        "body": "This is an FCM Message",
        "icon": "/itwonders-web-logo.png",
    }
  },
  "to": "cHMTFKiM_lVyD1rElh9YBc:APA91bGmwwtHUKUwOYNtCbfk-CtDFmB5Pkklk6P58nTA0-nWifh6SOUKihbPVmhZG_7Q9hKqq_2-OMnwdr4oQQ17oz43wv9BF59Lre0cHtZJ35I_yBGWmIx6x8j5x1Kbtzch9rAx39bu"
}' https://fcm.googleapis.com/fcm/send
