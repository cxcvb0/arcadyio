const codeGenerator = require('../../scripts/codeGenerator.js')
const { hash } = require('../../scripts/bcryptWrapper.js')
const { hmsetASync, hmgetASync, incrbyAsync, getAsync, setAsync } = require('../../redis.js')
const { sendVerificationEmail } = require('../../scripts/emailHandler.js')
const { serverErrors } = require('../../errors')
const { password_salts, baseid, increase_id_by } = require('../../config')

const returnError = (res, code) => {
  return res.json({
    error: {
      code: code,
      message: serverErrors[code],
    },
  })
}

module.exports = async (req, res) => {
  const joined = Date.now()
  const lastDigit = joined.toString().charAt(joined.toString().length - 2)
  const {
    email,
    password: [password, password1],
  } = req.body

  if (password !== password1) return returnError(res, 806)
  if (!password || password.length < 8 || password.length > 32) return returnError(res, 801)
  if (!email || email.indexOf('@') <= 0 || email.indexOf('.') <= 0) return returnError(res, 802)

  try {
    const [verified] = await hmgetASync(`user:${email}`, 'verified')

    if (verified == 1) return returnError(res, 807)
    else if (verified == 0) return returnError(res, 808)

    const currentUserID = await getAsync('usersid')

    let currentID = lastDigit + currentUserID
    if (!currentUserID) {
      await setAsync('usersid', baseid)
      currentID = lastDigit + baseid
    }

    const username = email.slice(0, email.indexOf('@'))
    const code = codeGenerator()
    const hPassword = await hash(password, password_salts)
    const callback = await hmsetASync(`user:${email}`, {
      userid: currentID,
      password: hPassword,
      verified: 0,
      attempt: 1,
      points: 0,
      email,
      code,
      username,
      joined,
    })

    console.log(username, 'joined at', joined)

    req.session.userid = currentID
    req.session.username = username
    req.session.points = 0
    req.session.verified = false
    req.session.email = email
    req.session.loggedIn = false
    req.session.avatar = null

    if (callback.toLowerCase() != 'ok') return returnError(res, 811)
    const user = email.slice(0, email.indexOf('@'))
    const success = await sendVerificationEmail(email, { user, code })

    if (!success) return returnError(res, 812)
    console.log('Successful signup!')

    res.json({ redirect: '/code/verify' })
    await incrbyAsync('usersid', increase_id_by)
  } catch (error) {
    console.error(error)
  }
}
