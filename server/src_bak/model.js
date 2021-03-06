const db = require('./db')
const M = module.exports = {
  dbName: 'misavo'
}

M.dbOpen = async function (url='mongodb://localhost:27017') {
  db.open(url, M.dbName)
}

M.dbCreate = async function (url) {
  await M.dbOpen()
  await M.db.table('shop').ensureIndex({ uid: 1, 'at.lat': 1, 'at.lng': 1 })
  // await db.table('shops').createIndex({ '$**': 'text'})
  await M.db.table('user').ensureIndex({ uid: 1 })
}

M.dbClear = async function () {
  await M.db.clear('shop')
  await M.db.clear('user')
}
