curl -X POST -H "Authorization: key=AAAAHcqmPqw:APA91bEDMi6ES7vWRdOP-FDJbCokiBeNMg37DOCsP4r-zdLUKss3c5Bw4RLm8O5dHuc7HRlxLyF30fuFUwSrUjf014cWByqJU66amGkBzmCMKfn_cGM5F1Bvw2D_t1RQE3wQN4U_nFym" -H "Content-Type: application/json" -d '{
  "notification": {
    "title": "Portugal vs. Denmark",
    "body": "5 to 1",
    "icon": "firebase-logo.png",
    "click_action": "http://localhost:8081"
  },
  "to": "fM2hOhrO0wXqL4rATpd6ET:APA91bGUJaVFxvhzU24zTlPfPZ5EeNRQMffoOH2ExQ-7lBPQs1kEbAkb80dZNDDl0Nu1cdwiGK6PoXkS_mz4tx4fwXZzyssKJ4bhT_GfiGxABcE4JY4uiSPWSF9o5CDH3PMk2uFHm2Pb"
}' "https://fcm.googleapis.com/fcm/send"