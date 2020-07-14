curl -X POST -H "Authorization: key=AAAASkwJ7tA:APA91bGzn9qgNUD2i6ggsEoQai9No-mfPxcP7MHTtRoGthWCoKEqYPrUlsKqX1w8e0OrBIPUpHxiy8P-7pr_nEXdREL50RqFtZ8r2YN7xRVQ-l7KVkKxLq6aN9cq0nuHPMVX4NeIAVnG" -H "Content-Type: application/json" \
   -d '{
  "data": {
    "notification": {
        "title": "FCM Message",
        "body": "This is an FCM Message",
        "icon": "/itwonders-web-logo.png",
    }
  },
  "to": "czdujbh-6cBtsyFDEyYIPi:APA91bHwcaAioe7VSwzDHJ5VD2VH7ntbkLrNWjZr9qDEdK9YZRWwR0Og2PN1rAp8tTZT8Qk4hrGRNaAVlGjXpfZizS-xwHKJGdCf2mrWqMrOX_rsDaTo92iKVvUJgW7D0sY4HuDvOO8c"
}' https://fcm.googleapis.com/fcm/send
