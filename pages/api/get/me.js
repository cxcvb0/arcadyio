module.exports = (req, res) => {
  const { userid, email, username, points, verified, loggedIn } = req.session
  return res.json({ success: true, email, username, points, verified, loggedIn })
}
