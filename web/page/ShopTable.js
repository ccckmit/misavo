const ShopTable = {
  shops: null,
}

ShopTable.html = `
<div id="ShopTable" class="panel">
<table>
  <thead><tr><th>排序</th><th>店名</th><th>產品</th><th>交易</th></tr></thead>
  <tbody id="ShopTableBody"></tbody>
</table>
</div>
`

ShopTable.start = async function (arg={}) {
  ShopTable.arg = arg
  let shops = ShopTable.shops = await Db.query('shop', {})
  /*
  let r = await fetch('http://localhost:3000/shop')
  let json = await r.json()
  let shops = json // JSON.parse(json)
  */
  console.log('shops=', shops)
  Ui.show(ShopTable.html)
  ShopTable.showReport(shops)

/*
  ShopTable.shops = fetch('http://localhost:3000/shop').then(function(r) {
    console.log('r=', r)
    let json = r.json().then(function (json) {
      console.log('json=', json)
      let shops = json // JSON.parse(json)
      console.log('shops=', shops)
      Ui.show(ShopTable.html)
      ShopTable.showReport(shops)
    })
  })
*/
}

ShopTable.showReport = function (shops) {
  Ui.id('ShopTableBody').innerHTML = Ui.tbodyHtml(ShopTable.shops, ShopTable.rowHtml)
}

ShopTable.rowHtml = function (i, shop) {
  return `<tr>
  <td>${i}</td>
  <td>${shop.name}</td>
  <td>${JSON.stringify(shop.items)}</td>
  <td><button onclick="Page.goto('#pos?id=${shop._id}')">網路下單</button></td>
  </tr>`
}