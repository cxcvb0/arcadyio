const { hmsetASync, hmgetASync } = require('./../../redis.js')
const { sendVerificationEmail } = require('./../../scripts/emailHandler.js')
const codeGenerator = require('./../../scripts/codeGenerator.js')
const { serverErrors } = require('../../errors')

module.exports = async (req, res) => {
  console.log('CODE REGEN POST')
  const { email } = req.session
  if (!email) return res.json({ error: serverErrors[819] })

  const [attempt, nextTry] = await hmgetASync(`user:${email}`, 'attempt', 'nextTry')
  if (!attempt && !nextTry) return res.json({ error: serverErrors[823] })
  if (nextTry && nextTry != 'ok')
    if (parseInt(nextTry) > Date.now()) return res.json({ error: serverErrors[820] })

  const code = codeGenerator()

  let nextTryTS = 'ok'
  if (attempt % 4 == 0) nextTryTS = Date.now() + 1.5 * 1000 * 60 * 60 // 1.5h

  try {
    const callback = await hmsetASync(`user:${email}`, {
      code,
      nextTry: nextTryTS,
      attempt: parseInt(attempt) + 1,
    })

    console.log('callback', callback)

    if (callback.toLowerCase() != 'ok') return res.json({ error: serverErrors[811] })

    const user = email.slice(0, email.indexOf('@'))
    const success = await sendVerificationEmail(email, { user, code })
    if (!success) res.json({ error: serverErrors[812] })
    else res.json({ success: 'Successfully sent the verification code...' })
  } catch (error) {
    console.error(error)
    res.json({ error })
  }
}
