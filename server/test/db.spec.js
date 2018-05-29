const assert = require('assert')
const db = require('../lib/db')
const M = require('../lib/model')
// const someUsers = require('./someUsers.json')
const someshop = require('./someShops.json')
const ok = assert.ok

describe('DB', () => {
  before(async function () {
    this.timeout(10000)
    console.log('before start')
    await M.dbCreate()
    return await M.dbClear()
    console.log('before end')
  })
  after(async function () {
    return await M.dbClose()
  })
  /*
  it('users.insert(someUsers)', async () => {
    for (user of someUsers) {
      let r = await M.db.insert('users', user)
      ok(r.result.ok === 1)
    }
  })
  */
  it('shop.insert(someshop)', async () => {
    for (shop of someshop) {
      let r = await M.db.insert('shop', shop)
      ok(r.result.ok === 1)
    }
  })
  it('shop.select()', async () => {
    let shop = await M.db.select('shop', {})
    console.log('shop=%j', shop)
    ok(shop.length === someshop.length)
  })
  /*
  it('selectNear(km=10)', async () => {
    let shop = await M.selectNear({km: 5, at: aUser.at})
    eq(shop.length, 5)
  })
  */
})
