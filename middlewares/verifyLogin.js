module.exports = async (req, res, next) => {
  console.log(req.session.verified)
  if (req.session.verified == false) return res.redirect('/code/verify')
  if (req.session.verified) return res.redirect('/play')
  if (!req.session.verified) return next()
}
