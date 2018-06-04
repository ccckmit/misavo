const ShopView = {
  shops: null,
  myPos: {"lat": 24.44, "lng": 118.35},
  markers: [],
  zoom: 13,
  mapLoaded: false,
}

ShopView.html = `
<div id="ShopView">
  <div id="ShopQuery">
    <label id="myPos" style="display:none"></label> <input id="distance" type="number" value="5">公里內
    <button onclick="ShopView.doQuery()">查詢</button>
    <input id="query" type="text" value="" class="short" placeholder="關鍵字"/>
    <button onclick="Ui.showPanel('tablePanel')">表格</button>
    <button onclick="Ui.showPanel('mapPanel')">地圖</button>
  </div>
  <br/>
  <div id="tablePanel" class="panel">
    <table id="ShopTable">
      <thead>
        <tr><th>排序</th><th>店名</th><th>產品</th><th>區域</th><th>購買</th></tr>
      </thead>
      <tbody id="ShopTableBody"></tbody>
    </table>
  </div>
  <div id="mapPanel" class="panel">
    <div id="map" class="gmap">map</div>
    </div>
  </div>
</div>
`


ShopView.start = async function (q={}) {
  console.log('ShopView.start()')
  Ui.show(ShopView.html)
  // ShopView.myPos = await Geo.getLocation()
  // Ui.id('myPos').innerHTML = JSON.stringify(ShopView.myPos)
  await Ui.loadJs('https://maps.googleapis.com/maps/api/js?key=AIzaSyC7q1j5qhyIKSzRs_86eNfKH-_HsGiRPH8') // .finally(initMap)
  console.log('ShopView.start:initMap()')
  initMap()
  console.log('ShopView.start:doQuery()')
  await ShopView.doQuery()
  // await ShopView.query(q)
  Ui.showPanel('tablePanel')
}

ShopView.query = async function (q = {}) {
  for (let marker of ShopView.markers) marker.setMap(null)
  ShopView.markers = []
  let shops = ShopView.shops = await Db.server.query('shop', q)
  console.log('shops=', shops)
  ShopView.showReport(shops)
  for (let shop of ShopView.shops) {
    console.log('shop=', shop)
    ShopView.markers.push(new google.maps.Marker({
      title: shop.name,
      position: shop.at,
      label: '店',
      map: ShopView.map
    }))
  }
}

ShopView.doQuery = async function () {
  console.log('ShopView.doQuery()')
  let q = { km: parseFloat(Ui.id('distance').value), at: ShopView.myPos, query: Ui.id('query').value }
  console.log('1:q=', q)
  if (q.km && q.at) {
    let d = Geo.km2dist(q.km), dx = d, dy = d
    if (q.filter == null) q.filter = {}
    q.filter['at.lat'] = {$gte: q.at.lat - dx, $lte: q.at.lat + dx}
    q.filter['at.lng'] = {$gte: q.at.lng - dy, $lte: q.at.lng + dy}
    q.filter['fulltext'] = {$regex: q.query}
    console.log('2:q=', q)
    await ShopView.query(q)
  }
}

ShopView.showReport = function (shops) {
  Ui.id('ShopTableBody').innerHTML = Ui.tbodyHtml(ShopView.shops, ShopView.rowHtml)
}

ShopView.rowHtml = function (i, shop) {
  return `<tr>
  <td>${i}</td>
  <td>${shop.name}</td>
  <td>${JSON.stringify(shop.items).substring(0,20)}...</td>
  <td>${shop.area}</td>
  <td><button onclick="Page.goto('#pos?id=${shop._id}')">網路下單</button></td>
  </tr>`
}

var initMap = function () {
  // ShopView.showMap()
  ShopView.map = new google.maps.Map(Ui.id('map'), {
    zoom: ShopView.zoom,
    center: ShopView.myPos
  })
  ShopView.myMarker = new google.maps.Marker({
    title: '我的位置',
    position: ShopView.myPos,
    label: '我',
    map: ShopView.map
  })
  ShopView.mapLoaded = true
  // ShopView.getLocation()
}

/*

  ShopView.markMap = function () {
    for (let shop of ShopView.shops) {
      console.log('shop=', shop)
      let marker = new google.maps.Marker({
        title: shop.name,
        position: shop.at,
        label: '店',
        map: ShopView.map
      })
    }
  }

ShopView.showMap = async function () {
  if (!ShopView.mapLoaded) {
    Ui.loadJs('https://maps.googleapis.com/maps/api/js?key=AIzaSyC7q1j5qhyIKSzRs_86eNfKH-_HsGiRPH8').finally(initMap)
  }
  Ui.showPanel('mapPanel')
}

ShopView.showTable = async function () {
  Ui.showPanel('tablePanel')
}
*/

