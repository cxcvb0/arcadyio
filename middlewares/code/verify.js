module.exports = (req, res, next) => {
  console.log('code.verify', 'verified', req.session.verified)
  if (req.session.verified) res.redirect('/home')
  else if (req.session.verified == false) next()
  else if (!req.session.verified) res.redirect('/join')
}
