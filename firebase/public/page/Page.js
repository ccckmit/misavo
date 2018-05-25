const Page = { }

Page.init = function () {
  window.onload = function () {
    window.onhashchange()
  }
  
  window.onhashchange = function () {
    let hash = window.location.hash.substring(1).toLowerCase()
    console.log('hash=', hash)
    Page[hash]()
  }
}

Page.goto = function (hash) {
  window.location.hash = hash
}

Page.landing = Page[''] = function () { Landing.start() }

Page.pos = function () { Pos.start() }

Page.report = function () { Report.start() }

Page.setting = function () { Setting.start() }

Page.shopTable = function () { ShopTable.start() }

Page.storage = function () { Storage.start() }

Page.shopMain = function () {
  Shared.shop = Db.load('Shop') || Shared.shop
  Ui.show(`
  <div>
    <button onclick="Pos.start()">新增訂單</button>
    <button onclick="Setting.start()">商店設定</button>
    <button onclick="Shop.todayReport()">本日報表</button>
    <button onclick="Report.start()">全部報表</button>
    <button onclick="Storage.start()">資料處理</button>
  </div>
  `)
  Ui.title(Shared.shop.name)
}

Page.login = function () {
  let msg = (User.isLogin()) ? '您已經登入了，身分是' + User.getName() + ' !' : '您尚未登入，請先登入！'
  Ui.show(`<h1>${msg}</h1><br/>
  <button id="googleLoginBtn" onclick="User.googleLogin()">Google 登入</button>`)
}

Page.logout = function () {
  Ui.show(`<h1>您已經登出!</h1>`)
}
