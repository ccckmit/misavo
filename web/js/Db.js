const Db = Local

// const Db = {}
console.log('Db=', Db)

Db.query = async function (tableName, q) {
  // let r = await fetch(`http://localhost:3000/${tableName}?filter=${JSON.stringify(q.filter)}&sort=${JSON.stringify(q.sort)}&limit=${q.limit}&skip=${q.limit}`)
  console.log('Db.query: q=', q)
  let filter = JSON.stringify(q.filter)
  let sort = JSON.stringify(q.sort)
  let r = await fetch(`http://localhost:3000/${tableName}?q=${JSON.stringify(q)}`)
  // let r = await fetch(`http://localhost:3000/${tableName}?filter={"_id":"7e2ef5df6119eda68b6a47c633fcbc"}`)
  let json = await r.json()
  console.log('Db.query: return ', json)
  return json
}

/*
  if (q.filter.domain === 'all') q.filter.domain = undefined
  let at = JSON.stringify(q.at)
  let filter = JSON.stringify(q.filter)
  let sort = JSON.stringify(q.sort)
  return axios.get(`http://localhost:3000/misavo/message?km=${q.km}&at=${at}&filter=${filter}&sort=${sort}&skip=${q.skip}&limit=${q.limit}`)
  */
