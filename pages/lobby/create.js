const lobbyIDGenerator = require('../../scripts/lobbyIDGen')

module.exports = (req, res) => {
  const lobbyID = lobbyIDGenerator()
  console.log('lobby/create', lobbyID)
  req.session.lobby = { id: lobbyID, owner: true }
  res.json({ redirect: `/lobby/${lobbyID}` })
}
