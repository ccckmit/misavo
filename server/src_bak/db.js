const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const db = module.exports = {}

db.open = async function (dbName, url='mongodb://localhost:27017') {
  db.url = url
  db.dbName = dbName
  db.client = await MongoClient.connect(url)
  db.db = await db.client.db(dbName)
}

db.table = function (tableName) {
  return db.db.collection(tableName)
}

db.close = async function () {
  return db.client.close()
}

db.insert = async function (tableName, record) {
  const table = db.table(tableName)
  if (record.time == null) record.time = new Date()
  let result = await table.insert(record)
  return result
}

db.select = async function (tableName, q={}) {
  let filter = q.filter || {}
  let sort = q.sort || {}
  let skip = q.skip || 0
  let limit = q.limit || 9999
  const table = db.table(tableName)
  let result = await table.find(filter).sort(sort).skip(skip).limit(limit)
  // let result = await table.find(query)
  return result.toArray()
}

db.delete = async function (tableName, filter) {
  const table = db.table(tableName)
  return await table.remove(filter)
}

db.deleteById = async function (tableName, id) {
  let oId = new mongodb.ObjectID(id);
  const table = db.table(tableName)
  let results = await table.remove({_id: oId})
  console.log('results = ', results)
  return (results.result.ok === 1)
}

db.clear = async function (tableName) {
  const table = db.table(tableName)
  return table.remove({})
}
