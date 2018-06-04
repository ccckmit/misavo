# MisavoServer

```
$ npm run start
```

然後觀看下列網址：

* http://localhost:3000/shop?q={%22filter%22:{%22_id%22:%22fa84e5673446e40db55d8711f551cb%22}}
* http://localhost:3000/shop?q={%22sort%22:{%22_id%22:1},%20%22limit%22:2}
* http://localhost:3000/shop?q={%22filter%22:{%22$text%22:{%22$search%22:%22%E9%87%91%E9%96%80%E7%B8%A3%E9%87%91%E5%AF%A7%E9%84%89%22}}}
* http://localhost:3000/shop?q={%22filter%22:{%22fulltext%22:{%22$regex%22:%22%E7%8F%8D%E7%8F%A0%22}}}
* http://localhost:3000/shop?q={%22filter%22:{%22fulltext%22:{%22$regex%22:%22%E7%8B%97%22}}}



## 前端用 axios + Vue.js

