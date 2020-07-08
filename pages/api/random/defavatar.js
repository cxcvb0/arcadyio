const { join } = require('path')

const colors = ['cyan', 'green', 'orange', 'purple', 'yellow']

const randomNumber = (max) => Math.floor(Math.random() * max)

const randomColor = () => colors[randomNumber(colors.length)]

module.exports = (req, res) => {
  const randomColor = colors[randomNumber(colors.length)]
  return res.sendFile(join(__dirname, '..', '..', '..', 'public', 'default_avatars', randomColor + '32.png'))
}
