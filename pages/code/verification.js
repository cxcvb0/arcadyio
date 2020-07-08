const { hmsetASync, hmgetASync, hdelMutli } = require('../../redis.js')
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
  const { email } = req.session
  const { code } = req.body
  console.log(email, code)
  if (!code) return returnError(res, 821)
  if (!email) return res.json({ redirect: '/join' })

  const [verified, realCode] = await hmgetASync(`user:${email}`, 'verified', 'code')

  console.log('verified', verified, 'realCode', realCode, verified == 1 || verified == 0)

  if (verified == 1) return returnError(res, 800)
  else if (verified != 0) return returnError(res, 810)

  if (code != realCode) return returnError(res, 821)
  const callback = await hmsetASync(`user:${email}`, {
    verified: 1,
  })

  if (callback.toLowerCase() != 'ok') return res.json({ redirect: '/join' })

  req.session.verified = true
  req.session.clientID = req.session.id
  req.session.loggedIn = true

  res.json({ redirect: '/play' })
  return hdelMutli(`user:${email}`, ['attempt', 'code', 'nextTry'])
}
