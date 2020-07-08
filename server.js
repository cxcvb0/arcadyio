const express = require('express')
const compression = require('compression')
const next = require('next')

const { dev } = require('./config')

const GETrandomDefaultAvatar = require('./pages/api/random/defavatar')
const GETapiGetMe = require('./pages/api/get/me')
const GETapiGetGamemodes = require('./pages/api/get/gamemodes')

const POSTlobbyCreate = require('./pages/lobby/create')
const POSTback = require('./pages/back')
const POSTauthLogin = require('./pages/auth/login')
const POSTauthSignup = require('./pages/auth/signup')
const POSTcodeRegen = require('./pages/code/regen')
const POSTcodeVerification = require('./pages/code/verification')

const ALLverifyLogout = require('./pages/logout')

const MWverifyLogin = require('./middlewares/verifyLogin')
const MWcodeRegen = require('./middlewares/code/regen')
const MWverification = require('./middlewares/verification')
const MWverify = require('./middlewares/verifyDefault')
const MWcodeVerify = require('./middlewares/code/verify')

const app = next({ dev })
const handle = app.getRequestHandler()

const { session } = require('./redis')

const server = express()

app.prepare().then(() => {
  const expressWs = require('express-ws')(server, require('./createServer')(server, true))

  server.use(compression())
  server.use(session)
  server.set('trust proxy', 1)
  server.use(express.json())
  server.use(express.urlencoded({ extended: true }))
  server.use(require('cors')('*'))

  server.get('/api/get/me', GETapiGetMe)
  server.get('/api/get/gamemodes', GETapiGetGamemodes)
  server.get('/code/verify', MWcodeVerify, (req, res) => app.render(req, res, '/code/verify', req.query))
  server.get('/join', MWverifyLogin)
  server.get('/api/random/defavatar', GETrandomDefaultAvatar)
  server.get('/lobby/:id', MWverify, (req, res) => app.render(req, res, `/lobby`, { id: req.params.id }))
  server.get('/play', MWverify, (req, res) => app.render(req, res, '/play', req.query))
  server.get('/error/:error', (req, res) => app.render(req, res, '/error', req.query))

  server.post('/back', POSTback)
  server.post('/code/regen', MWcodeRegen, POSTcodeRegen)
  server.post('/auth/signup', MWverifyLogin, POSTauthSignup)
  server.post('/auth/login', MWverifyLogin, POSTauthLogin)
  server.post('/code/verification', MWverification, POSTcodeVerification)
  server.post('/lobby/create', MWverify, POSTlobbyCreate)

  server.all('/logout', ALLverifyLogout)

  server.all('*', (req, res) => handle(req, res))
})
