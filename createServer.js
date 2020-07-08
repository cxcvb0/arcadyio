const fs = require('fs')
const { port, host } = require('./config')

const options = {
  key: fs.readFileSync('./security/localhost.key'),
  cert: fs.readFileSync('./security/localhost.crt'),
  passphrase: 'fajnyciul',
}

module.exports = (server, secure) => {
  if (secure)
    require('https')
      .createServer(options, server)
      .listen(port, (err) => {
        if (err) throw err
        console.log('>', '\x1b[32m', `Secure Server Ready on https://${host}:${port}`)
      })
  else {
    require('http')
      .createServer(server)
      .listen(port, (err) => {
        if (err) throw err
        console.log('>', '\x1b[32m', `Ready on http://${host}:${port}`)
      })
  }
}
