const Gmap = {
  center: {lat: 24.43, lng: 118.33},
  zoom: 13,
  myMarker: null,
  myPos: null,
}

Gmap.html = `
<!--<button onclick="loadMap()">loadMap</button>-->
<div id="map" class="gmap">map</div>
`

var initMap = function () {
  Gmap.init()
}

/*
Gmap.myPosition = function () {
  let pos = Gmap.myMarker.getPosition()
  return {lat: pos.lat(), lng: pos.lng()}
}
*/

Gmap.init = function () {
  Gmap.map = new google.maps.Map(Ui.id('map'), {
    zoom: Gmap.zoom,
    center: Gmap.center
  })
  for (let shop of Shared.shops) {
    let marker = new google.maps.Marker({
      title: shop.name,
      position: shop.at,
      label: '店',
      map: Gmap.map
    })
  }
  Gmap.getLocation()
}

Gmap.start = function (arg={}) {
  Gmap.arg = arg
  Ui.show(Gmap.html)
  Ui.loadJs('https://maps.googleapis.com/maps/api/js?key=AIzaSyC7q1j5qhyIKSzRs_86eNfKH-_HsGiRPH8').finally(initMap)
}

Gmap.getLocation = function () {
  console.log('Gmap.getLocation()')
  if (Gmap.myPos != null) return 
  navigator.geolocation.getCurrentPosition(function (pos) {
    let gpsPos = { lat: pos.coords.latitude, lng: pos.coords.longitude }
    Gmap.myPos = gpsPos
    Gmap.myMarker = new google.maps.Marker({
      // iconUrl: 'https://use.fontawesome.com/releases/v5.0.8/svgs/solid/male.svg', 
      position: gpsPos, 
      title: '我的位置',
      label: '我',
      // icon:'https://use.fontawesome.com/releases/v5.0.8/svgs/solid/male.svg',
      draggable: true, // 可拖曳，定位自己的位置。用 marker.getPosition() 取得位置。
      map: Gmap.map,
    })
    console.log('gpsLocated', gpsPos)
    Gmap.myMarker.setPosition(gpsPos)
  })
}

// 地球一周約 4萬公里，相當於 360度，所以每度約 100 公里。
// 一公里 = 1/100 度 = 0.01 度
// export function km2dist (km) {
Gmap.km2dist = function km2dist (km) {
  return km * 0.01
}
  
// export function dist2km (dist) {
Gmap.dist2km = function dist2km (dist) {
  return dist * 100
}

Gmap.range = function range (at, km) {
  var dx, dy
  dx = dy = Gmap.km2dist(km)
  return {begin: {x: at.lat - dx, y: at.lng - dy}, end: {x: at.lat + dx, y: at.lng + dy}}
}
