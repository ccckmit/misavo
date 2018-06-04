Geo = {
  // myPos: {"lat": 24.431, "lng": 118.341}
}

Geo.getLocationPromise = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  })
}

Geo.getLocation = async function () {
  console.log('Geo.getLocation()')
  let pos = await Geo.getLocationPromise()
  let myPos = { lat: pos.coords.latitude, lng: pos.coords.longitude }
  return myPos
}

// 地球一周約 4萬公里，相當於 360度，所以每度約 100 公里。
// 一公里 = 1/100 度 = 0.01 度
// export function km2dist (km) {
Geo.km2dist = function km2dist (km) {
  return km * 0.01
}
  
// export function dist2km (dist) {
Geo.dist2km = function dist2km (dist) {
  return dist * 100
}

Geo.range = function range (at, km) {
  var dx, dy
  dx = dy = Geo.km2dist(km)
  return {begin: {x: at.lat - dx, y: at.lng - dy}, end: {x: at.lat + dx, y: at.lng + dy}}
}
