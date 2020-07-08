const { serverErrors } = require('./../errors')

module.exports = async (req, res, next) => {
  console.log(req.session.verified)
  if (req.session.verified == false) return next()
  if (req.session.verified) return res.redirect('/play')
  if (!req.session.verified) return res.json({ error: serverErrors[824] })
}
