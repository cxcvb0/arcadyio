const fs = require('fs')

module.exports = (data, path) => {
  let HTML = fs.readFileSync(path, 'utf8').toString()

  for (let [key, value] of Object.entries(data)) {
    HTML = HTML.replace(new RegExp(`{${key}}`, 'gi'), value)
  }

  return HTML
}
