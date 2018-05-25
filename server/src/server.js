// const fs = require('mz/fs')
const logger = require('koa-logger')
// https://github.com/m4nuC/async-busboy
// const asyncBusboy = require('async-busboy') // https://github.com/mscdex/busboy/issues/125 -- busboy doesn't support application/json requests, only multipart/form-data and application/x-www-form-urlencoded requests.
const coBody = require('co-body')
const path = require('path')
const session = require('koa-session')
const M = require('./lib/model')
const Koa = require('koa')
const Router = require('koa-router')
const json = require('koa-json')
const cors = require('@koa/cors');

const app = new Koa()
const router = new Router()

app.keys = ['#*$*#$)_)*&&^^']

const CONFIG = {
  key: 'koa:sess', // (string) cookie key (default is koa:sess)
  maxAge: 86400000, // (number) maxAge in ms (default is 1 days)
  overwrite: true, // (boolean) can overwrite or not (default true)
  httpOnly: true, // (boolean) httpOnly or not (default true)
  signed: true // (boolean) signed or not (default true)
}

app.use(logger())
app.use(session(CONFIG, app))
app.use(json())
app.use(cors()) // https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue

async function parse (ctx) {
  var json = await coBody(ctx)
  console.log('parse: json = %j', json)
  return (typeof json === 'string') ? JSON.parse(json) : json
}

async function shopGet (ctx, next) {
  try {
    var shops = M.db
    var q = ctx.query
    console.log('shop.get:q=%j', q)
    var q0 = {
      km: JSON.parse(q.km || 'null'),
      at: JSON.parse(q.at || 'null'),
      filter: JSON.parse(q.filter || '{}'),
      sort: JSON.parse(q.sort || '{}'),
      skip: JSON.parse(q.skip || 'null'),
      limit: JSON.parse(q.limit || 'null'),
    }
    // q.skip = parseInt(q.skip)
    // q.limit = parseInt(q.limit)
    console.log('shop.get:q0=%j', q0)
    var r = await M.selectShops(q0)
    ctx.body = r
    // response(ctx, 200, JSON.stringify(results, null, 2))
  } catch (error) {
    console.log('shopGet:error=', error)
  }
}

async function shopDelete (ctx, next) {
  try {
    // var r = await M.deleteShop(ctx.query.id)
    var r = await M.deleteShop(ctx.params.id)
    console.log('shopDelete:r=' , r)
    ctx.body = r
  } catch (error) {
    console.log('shopDelete:error=', error)
  }
}

async function shopPost (ctx, next) {
  try {
    // let shop = ctx.query.shop
    let post = await parse(ctx)
    console.log('post=%j', post)
    let shop = post.shop
    console.log('shop=%j', shop)
    var r = await M.insertShop(shop)
    console.log('shopPost:r=' , r)
    ctx.body = r
  } catch (error) {
    console.log('shopPost:error=', error)
  }
}

async function userGet (ctx, next) {
  try {
    var uid = ctx.params.uid
    var r = await M.getUser(uid)
    ctx.body = r
  } catch (error) {
    console.log('userGet:error=', error)
  }
}

async function userPost (ctx, next) {
  try {
    let post = await parse(ctx)
    let user = post.user
    console.log('userPost:user=%j', user)
    var r = await M.insertUser(user)
    ctx.body = r
  } catch (error) {
    console.log('userPost:error=', error)
  }
}

function isPass (ctx) {
  return typeof ctx.session.user !== 'undefined'
}

async function login (ctx, next) {
  try {
    let post = await parse(ctx)
    let pUser = post.user
    var user = await M.getUser(pUser.uid)
    if (user.password === pUser.password) {
      ctx.body = user
    }
  } catch (error) {
    console.log('login:error=', error)
  }
}

var logout = async function (ctx, next) {
  delete ctx.session.user
  ctx.body = ''
}

router
.post('/login', login)
.post('/logout', logout)
.get('/shop', shopGet)
.delete('/shop/:id', shopDelete)
.post('/shop', shopPost)
.get('/user/:uid', userGet)
.post('/user', userPost)

async function main() {
  await M.init()
  // V.init(__dirname)
  var port = 3000
  app.use(router.routes()).listen(port)
  console.log('http server started: http://localhost:' + port)
}

main()



  /*
  .get('/', function (ctx, next) {
    console.log('ctx=%j', ctx)
    ctx.redirect('/misavo/shops')
  })
  .post('/sms/post', smsPost) // post CURD
  .patch('/sms/post', smsUpdatePost)
  .delete('/sms/post', smsDeletePost)
  .get('/sms/list', smsList)
  .post('/sms/reply', smsReply) // reply CURD
  .patch('/sms/reply', smsReply)
  .delete('/sms/reply', smsDeleteReply)
  */
/*
var isPass = function (self) {
  return typeof self.session.user !== 'undefined'
}

var save = async function (ctx, next) {
  console.log('save()')
  var book = ctx.params.book
  var file = ctx.params.file
  console.log('=> book=%s file=%s', book, file)
  if (!isPass(ctx)) {
    console.log('=> !pass')
    return
  }
  var bookObj = await M.getBook(book)
  if (bookObj.editor !== ctx.session.user) {
    console.log('=> editor != user')
    return
  }
  try {
    var post = await parse(ctx)
    console.log('=> post != %j', post)
    await M.saveBookFile(book, file, post.text)
    console.log('=> save success')
    response(ctx, 200, 'Save Success!')
  } catch (e) {
  }
}

var signup = async function (ctx, next) {
  if (!M.setting.signup) {
    return
  }
  var post = await parse(ctx)
  var user = post.user
  var password = post.password
  var isSuccess = await M.addUser(user, password)
  if (isSuccess) {
    response(ctx, 200, 'Signup success!')
  } else {
  }
}

var search = async function (ctx, next) {
  try {
    console.log('search:ctx.query=%j', ctx.query)
    var key = ctx.query.key || ''
    var q = JSON.parse(ctx.query.q || '{"type":"md"}')
    console.log('search:key=%s q=%j', key, q)
    var results = await M.search(key, q)
    response(ctx, 200, JSON.stringify(results))
  } catch (e) {
  }
}

var login = async function (ctx, next) {
  console.log('login()')
  var post = await parse(ctx) // console.log('login:user=%s', post.user)
  console.log('  post=%j', post)
  var user = M.users[post.user] // console.log('ctx.session=%j', ctx.session)
  if (user.password === post.password) {
    response(ctx, 200, 'Login Success!')
    ctx.session.user = post.user
  } else {
  }
}

var logout = async function (ctx, next) {
  delete ctx.session.user
  response(ctx, 200, 'Logout Success!')
}

var createBook = async function (ctx, next) {
  if (!isPass(ctx)) {
  } else {
    try {
      await M.createBook(ctx.params.book, ctx.session.user)
      response(ctx, 200, 'Create Book Success!')
    } catch (err) {
    }
  }
}

// koa1 更方便的使用方式 https://www.tutorialspoint.com/koajs/koajs_file_uploading.htm
// koa2 要試試！ 結果，下面還是用 koa-busboy, 這樣還是和 koa-bodyparser 不能相容。
// 參考： https://chenshenhai.github.io/koa2-note/note/upload/pic-async.html
// 另一個可能性是 https://github.com/dlau/koa-body/tree/koa2
// 原始碼看來並沒有支援 multipart : https://github.com/koajs/bodyparser/blob/master/index.js
var upload = async function (ctx, next) {
  var book = ctx.params.book
  console.log('upload: book=%s', book)
//  var body = ctx.request.body
//  console.log('upload: book=%s body=%j', book, body)
  const {files} = await asyncBusboy(ctx.req)
  console.log('files=%j', files)
  for (var i in files) {
    var file = files[i].filename
    console.log('upload file=%s', file)
    var stream = fs.createWriteStream(path.join(M.bookRoot, book, file))
    files[i].pipe(stream)
  }
  ctx.body = JSON.stringify(files, null, 2)
}
*/

/*
// const koaStatic = require('koa-static')
// const cobody = require('co-body')
// import asyncBusboy from 'async-busboy';
// const M = require('./lib/model')
// const V = require('./lib/view')
const response = function (self, code, msg) {
  self.body = JSON.stringify(msg)
}
const parse = async function (self) {
  var json = await cobody(self)
  return (typeof json === 'string') ? JSON.parse(json) : json
}
*/