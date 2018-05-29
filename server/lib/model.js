const db = require('./db')
const M = module.exports = {
  dbName: 'misavo',
  db: db
}

M.dbOpen = async function (url='mongodb://localhost:27017') {
  return await db.open(M.dbName, url)
}

M.dbCreate = async function (url) {
  await M.dbOpen()
  // await db.db.createCollection('shop', { autoIndexId: false })
  // await db.db.createCollection('user', { autoIndexId: false })
  await db.table('shop').ensureIndex({ uid: 1, 'at.lat': 1, 'at.lng': 1 })
  // await db.table('shops').createIndex({ '$**': 'text'})
  return await db.table('user').ensureIndex({ uid: 1 })
}


M.dbClear = async function () {
  await db.clear('shop')
  return await db.clear('user')
}

M.dbClose = async function () {
  return await db.close()
}
