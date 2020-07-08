const { hash, compare } = require('bcrypt')

module.exports.hash = async (password, salts) => {
  return await hash(password, salts)
}

module.exports.compare = async (password1, password2) => {
  return await compare(password1, password2)
}
