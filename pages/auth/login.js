const { compare } = require('../../scripts/bcryptWrapper.js')
const { hmgetASync } = require('../../redis.js')
const { serverErrors } = require('../../errors')

const returnError = (res, code) => {
  return res.json({
    error: {
      code: code,
      message: serverErrors[code],
    },
  })
}

module.exports = async (req, res) => {
  console.log('auth/login', req.session.sessionId)
  if (req.session.clientID) return returnError(res, 813)
  console.log(req.body)
  const email = req.body.email || req.body.loginEmail
  const password = req.body.password || req.body.logPassword

  console.log('login.js', 'email', email, 'password', password)

  if (!password || password.length < 8 || password.length > 32) return returnError(res, 801)
  if (!email || email.indexOf('@') <= 0 || email.indexOf('.') <= 0) return returnError(res, 802)

  try {
    const [verified, hPassword, points, avatar, username] = await hmgetASync(
      `user:${email}`,
      'verified',
      'password',
      'points',
      'avatar',
      'username',
    )

    console.log('login', verified, hPassword, points, avatar, username)

    if (!verified) return returnError(res, 803)
    if (verified == 0) {
      req.session.username = username
      req.session.loggedIn = false
      req.session.email = email
      req.session.verified = false
      req.session.points = points
      return res.redirect('/code/verify')
    } else if (verified != 1) return returnError(res, 810)

    console.log('comparing', password, hPassword)

    if (!(await compare(password, hPassword))) return returnError(res, 801)
    console.log('Logged in successfully!')
    req.session.username = username
    req.session.clientID = req.session.id
    req.session.loggedIn = true
    req.session.verified = true
    req.session.points = points
    req.session.avatar = avatar
    return res.json({ redirect: '/play' })
  } catch (error) {
    console.error(error)
  }
}
