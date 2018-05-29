// const fs = require('mz/fs')
const logger = require('koa-logger')
// https://github.com/m4nuC/async-busboy
// const asyncBusboy = require('async-busboy') // https://github.com/mscdex/busboy/issues/125 -- busboy doesn't support application/json requests, only multipart/form-data and application/x-www-form-urlencoded requests.
const coBody = require('co-body')
const path = require('path')
const session = require('koa-session')
const M = require('./model')
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
    var q = ctx.query.q || '{}'
    console.log('shop.get:q=%j', q)
    q0 = JSON.parse(q)
    console.log('shop.get:q0=%j', q0)
    var r = await M.db.select('shop', q0)
    ctx.body = r
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
  await M.dbOpen()
  // V.init(__dirname)
  var port = 3000
  app.use(router.routes()).listen(port)
  console.log('http server started: http://localhost:' + port)
}

main()

