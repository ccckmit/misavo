const Page = { }

Page.landing = Page[''] = function () { Landing.start() }

Page.pos = function () { Pos.start() }

Page.report = function () { Report.start() }

Page.setting = function () { Setting.start() }

Page.shopTable = function () { ShopTable.start() }

Page.storage = function () { Storage.start() }

Page.newShop = function () { Setting.start() }

Page.findShop = function () { Gmap.start() }

Page.map = function () { Gmap.start() }

Page.todayReport = function () {
  Report.start({range: Lib.dayRange(new Date())})
}

Page.shopMain = function () {
  Shared.shop = Db.load('Shop') || Shared.shop
  Ui.show(`
  <div>
    <button onclick="Page.goto('pos')">新增訂單</button>
    <button onclick="Page.goto('setting')">商店設定</button>
    <button onclick="Page.goto('todayReport')">本日報表</button>
    <button onclick="Page.goto('report')">全部報表</button>
    <button onclick="Page.goto('storage')">資料處理</button>
  </div>
  `)
  Ui.title(Shared.shop.name)
}

Page.myShop = function () { Page.shopMain() }

Page.login = function () {
  let msg = (User.isLogin()) ? '您已經登入了，身分是' + User.getName() + ' !' : '您尚未登入，請先登入！'
  Ui.show(`<h1>${msg}</h1><br/>
  <button id="googleLoginBtn" onclick="User.googleLogin()">Google 登入</button>`)
}

Page.logout = function () {
  Shared.user = null
  Local.remove('User')
  Ui.show(`<h1>您已經登出!</h1>`)
}

// =============================== Router ==============================
Page.init = function () {
  console.log('Page.init()')
  window.onhashchange = function () {
    let hash = window.location.hash.substring(1)
    console.log('hash=', hash)
    Page[hash]()
  }
  window.onhashchange()
}

Page.goto = function (hash) {
  console.log('goto:', hash)
  window.location.hash = hash
}