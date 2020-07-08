module.exports = (req, res, next) => {
  console.log(req.session.verified)
  if (![true, false].includes(req.session.verified)) return res.redirect('/')
  req.session.destroy((err) => {
    console.error("Couldn't destroy the session", err)
  })
  res.redirect('/join')
}
