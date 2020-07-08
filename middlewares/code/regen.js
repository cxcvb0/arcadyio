module.exports = async (req, res, next) => {
  console.log('Regen Middleware', 'verified', req.session.verified)
  if (req.session.verified == false) return next()
  if (req.session.verified) return res.redirect('/play')
  if (!req.session.verified) return res.json({ redirect: '/join' })
  res.redirect('/join')
}
