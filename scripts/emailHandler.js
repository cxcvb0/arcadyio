const { createTransport } = require('nodemailer')
const HTMLCustomizer = require('./HTMLCustomizer.js')
const { join } = require('path')

const from = 'arcadyioverify@gmail.com'

const transport = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: from,
    pass: 'Polak12345%',
  },
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
})

module.exports.sendVerificationEmail = async (email, data) => {
  const parsedHTML = HTMLCustomizer(data, join(__dirname, '..', 'emails', 'verification.html'))

  return new Promise((resolve, reject) => {
    transport
      .sendMail({
        to: email,
        subject: 'Email Verification',
        html: parsedHTML,
      })
      .then(resolve(true))
      .catch((x) => {
        console.error(x)
        reject(false)
      })
  })
}
