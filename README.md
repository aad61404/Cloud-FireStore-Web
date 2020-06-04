# Cloud-FireStore-Web

## 使用前請先讀我
此處有兩個專案 ＋ 一個介紹 請選擇你需要的觀看

* [Firebase Cloud Messaging (FCM)](##FCM)
* [Firestore 範例 friendlyeats-web](#範例2friendlyeats-web)
* [firestore collection && doc 介紹](#firestore__collection__doc__介紹)

<br />

-----------------------------------------

## FCM
## 資料夾結構
```
--Cloud-FireStore-Web-- 
    |
    |_____  firebase                           --- firebase init || deploy 後產出
    |
    |_____  firebase-push-notification-demo-master (網路文章下載，來源附在參考資料)
    |
    |_____  friendlyeats-web                   --- (官方提供的範例，來源附在範例二的參考資料 )
    |
    |_____  functions                          --- (cloud functions)
    |
    |_____  images                             --- (存放圖檔）
    |
    |_____  .firebaserc                        --- (projects檔案 存放 project id)
    |
    |_____  backup                             --- 個人測試備份用 (可不用理會)
        |
        |_____  index                          --- ( Hot dog) https://www.youtube.com/watch?v=2Vf1D-rUMwE   
        |_____  index_local                    --- 只有 js script 引入的 網址不同
        |_____  index_FCM                      --- ( CM ) https://www.itwonders-web.com/blog/push-notification-using-firebase-demo-tutorial
                                                                              
```
  
# 使用 :
```
firebase serve
```

會啟用根目錄底下的index.html 
FCM 會搜尋專案的 firebase-messaging-sw.js

![Alt text](/images/02.png)

### 創建過程 firebase init (此處只是紀錄過程 沒有一定要按照此處規則  請依需求調整 )
#### 請依需求調整
#### 請依需求調整
![Alt text](/images/03.png)

<br />

![Alt text](/images/04.png)

<br />

![Alt text](/images/05.png)

#### FCM參考資源
* 目前根目錄index.html 測試 Firebase Cloud Messaging (FCM)
* https://www.itwonders-web.com/blog/push-notification-using-firebase-demo-tutorial
* 上方文章中提供 github 
* https://github.com/kenng/firebase-push-notification-demo

* FCM 官方文檔 https://firebase.google.com/docs/cloud-messaging  

<br />
<br />
<br />
<br />
-----------------------------------------

# 範例2friendlyeats-web
## 來源 ：
https://codelabs.developers.google.com/codelabs/firestore-web/#0

![Alt text](/images/01.png)
# 使用 :
```
cd friendlyeats-web/
firebase serve
```
<br />
<br />
<br /><br />
<br />
<br />
-----------------------------------------


# firestore__collection__doc__介紹

<!-- firestore collection && doc 介紹、寫入、讀取 -->
### 把資料寫入 collection (範例)  

(左側選單切換) 
(get stared)
https://firebase.google.com/docs/firestore/quickstart#web_5

(write data)
https://firebase.google.com/docs/firestore/manage-data/add-data

<br />

## 同上文章範例（影片版）

commit 01 . code 顯示
到影片 5:09  https://youtu.be/2Vf1D-rUMwE?t=309

commit 02 . 寫入firestore
到影片 8:28  https://youtu.be/2Vf1D-rUMwE?t=508

commit 03 . load firestore data
到影片 09:50 https://youtu.be/2Vf1D-rUMwE?t=590

<!-- 關聯至aad61404-blog firestore-web 2020-05-25 -->
關聯github 
https://github.com/aad61404/aad61404-blog/blob/master/aad-hexo/source/_posts/firestore-web/01.md


