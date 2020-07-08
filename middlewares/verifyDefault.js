module.exports = async (req, res, next) => {
  console.log('verified', req.session.verified)
  if (req.session.verified == false) return res.redirect('/code/verify')
  if (req.session.verified) return next()
  if (!req.session.verified) return res.redirect('/join')
}
