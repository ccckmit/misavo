const assert = require('assert')
const db = require('../lib/db')
const M = require('../lib/model')
// const someUsers = require('./someUsers.json')
const someShops = require('./someShops.json')
const ok = assert.ok

describe('DB', () => {
  before(async () => {
    await M.dbCreate()
    await M.dbClear()
  })
  after(async () => {
    await M.dbClose()
  })
  it('users.insert(someUsers)', async () => {
    for (user of someUsers) {
      let r = await M.db.insert('users', user)
      ok(r.result.ok === 1)
    }
  })
  it('shops.insert(someShops)', async () => {
    for (shop of someShops) {
      let r = await M.db.insert('shops', shop)
      ok(r.result.ok === 1)
    }
  })
  it('shops.select()', async () => {
    let shops = await M.db.select('shops', {})
    ok(shops.length === someShops.length)
  })
  /*
  it('selectNear(km=10)', async () => {
    let shops = await M.selectNear({km: 5, at: aUser.at})
    eq(shops.length, 5)
  })
  */
})
