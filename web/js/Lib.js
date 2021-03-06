const Lib = {}

Lib.dateToString = function (date) {
  return date.getFullYear()+'/'+(date.getMonth()+1).toString().padStart(2, '0')+'/'+date.getDate().toString().padStart(2, '0')
}

Lib.timeToString = function (date) {
  return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0') + ':' + date.getSeconds().toString().padStart(2, '0')
}

Lib.dayRange = function (date) {
  let from = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  let to = new Date(from)
  to.setDate(from.getDate()+1)
  return { from: from, to: to }
}

Lib.uuid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

Lib.guid = function () {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function(c) {
    var r = Math.floor(Math.random() * 16)
    return r.toString(16)
  })
}

Lib.query2json = function (query) {
  var hash
  var myJson = {}
  query = query || ''
  var hashes = query.split('&')
  for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=')
      myJson[hash[0]] = hash[1]
  }
  return myJson
}

  /*
  let q = new URLSearchParams(query)
  console.log('query=', query, 'q=', q, 'q.keys=', q.keys())
  let json = {}
  for (let key in q.keys()) {
    let value = q.get(key)
    json[key] = value
  }
  return json
  */

Lib.sortBy = function (list, arg) {
  return list.sort((o1, o2) => o1[arg.sortBy] < o2[arg.sortBy])
}
