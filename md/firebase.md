# Firebase

```
  13 npm install -g firebase-tools
  14 cd firebase
  15 ls
  16 firebase init // 此時須回答一大堆問題 ....
  17 firebase serve
  18 firebase serve

$ history

  Id CommandLine
  -- -----------
   1 cd firebase
   2 firebase deploy
   3 firebase serve
   4 firebase deploy
```

Deploy 的訊息：

```
PS D:\Dropbox\misavo\firebase> firebase deploy

=== Deploying to 'misavo-com'...

i  deploying firestore, hosting
i  firestore: checking firestore.rules for compilation errors...
+  firestore: rules file firestore.rules compiled successfully
i  firestore: uploading rules firestore.rules...
i  hosting: preparing public directory for upload...
+  hosting: 17 files uploaded successfully
+  firestore: released rules firestore.rules to cloud.firestore

+  Deploy complete!

Project Console: https://console.firebase.google.com/project/misavo-com/overview
Hosting URL: https://misavo-com.firebaseapp.com
```

## Domain 配合

加個 A 紀錄

A 名稱：@IPv4: 151.101.1.195 <= firebase 給的

加個 TXT 紀錄

TXT 名稱：@ 文字參數： "google-site-verification=1PyqR61TKlNsZAhNBnAF5Bdq4PqJlsA1a5iodAWz1Gw"

