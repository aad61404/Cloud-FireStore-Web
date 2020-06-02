#!/bin/bash
curl -X POST -H "Authorization: key=AAAASkwJ7tA:APA91bGzn9qgNUD2i6ggsEoQai9No-mfPxcP7MHTtRoGthWCoKEqYPrUlsKqX1w8e0OrBIPUpHxiy8P-7pr_nEXdREL50RqFtZ8r2YN7xRVQ-l7KVkKxLq6aN9cq0nuHPMVX4NeIAVnG" -H "Content-Type: application/json" \
   -d '{
  "data": {
    "notification": {
        "title": "FCM Message",
        "body": "This is an FCM Message",
        "icon": "/itwonders-web-logo.png",
    }
  },
  "to": "6cBtsyFDEyYIPi:APA91bFTo_4ETtvzxF8_b8KldYaJqQeh2_3UxwJKXBM7CUl_AbnkLq8GjVOoaTY7_EYaTtYiFOOb3fWoiyCLgNOTdxjGXMTV42dgU-zVir1ZRgC0ZeLUAdhAhgw1JLpxdP2MUUZR5uWD"
}' https://fcm.googleapis.com/fcm/send
