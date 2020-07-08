const { gamemodes } = require('../../../src/gamemodes')

module.exports = (req, res) => {
  const gamemodesFixed = gamemodes.filter((gamemode) => !gamemode.disabled)
  console.log('request')
  res.json({ gamemodes: gamemodesFixed })
}
