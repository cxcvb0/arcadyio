import Head from 'next/head'
import { useState } from 'react'
import Footer from '../../components/Footer.jsx'
import Router from 'next/router'

import { hostname, host, port } from '../../config'
import '../../styles/verifycode.css'

const url = hostname || `https://${host}:${port}/`

export default function VerifyCode() {
  const [wait, setWait] = useState(false)
  const [timeLeft, setTimeLeft] = useState(false)

  const [notificationData, setNotification] = useState(['none', ''])

  const [status, message, code] = notificationData

  let backgroundClass

  if (status == 'Success') backgroundClass = 'bg_success block'
  else if (status == 'Error') backgroundClass = 'bg_error block'
  else if (status == 'Info') backgroundClass = 'bg_info block'
  else if (status == 'Warning') backgroundClass = 'bg_warning block'
  else if (status == 'none') backgroundClass = 'invisible'

  const notificationClassList = `${backgroundClass} notification fx`

  const wait30Seconds = () => {
    let tF = 30
    setWait(true)
    setTimeLeft(tF)
    tF--
    const interval = setInterval(() => {
      if (tF == 0) {
        clearInterval(interval)
        setWait(false)
      }
      setTimeLeft(tF)
      tF--
    }, 1000)
  }

  const regenCode = (event) => {
    event.preventDefault()

    setNotification(['Info', 'Request sent...'])

    fetch(`${url}code/regen`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(({ success, error, redirect }) => {
        if (redirect) return Router.push(redirect)
        if (success) setNotification(['Success', success])
        if (error) setNotification([`Error`, error.message, error.code])
      })
      .catch((error) => {
        setNotification(['Error', `Unexpected error...`])
        console.error(error)
      })
      .finally(wait30Seconds())
  }

  const verifyCode = (event) => {
    event.preventDefault()

    const { target } = event
    console.log(target[0].value)
    setNotification(['Info', `Sending code verification request...`])
    fetch(`${url}code/verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: target[0].value }),
    })
      .then((response) => response.json())
      .then(({ error, redirect }) => {
        if (redirect) Router.push(redirect)
        if (error) setNotification([`Error`, error.message, error.code])
      })
      .catch(console.error)
  }

  return (
    <div id='verifyCode'>
      <Head>
        <title>Verification</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className={notificationClassList} onClick={() => setNotification(['none', ''])}>
        <div className='topNotification fx'>
          <span className='notificationHeader'>
            {status} {code}
          </span>
        </div>
        <div className='bottomNotification fx'>
          <span className='notificationMessage'>{message}</span>
        </div>
      </div>
      <div id='containerOne' className='fx section'>
        <div id='verifyCodeContainer'>
          <form id='verifyForm' className='fx' onSubmit={verifyCode}>
            <div className='fx4' id='fillerContainer'>
              <input type='text' name='code' id='codeInput' placeholder='Code' maxLength='6' minLength='6' />
              <button type='submit' className='button codeButton verifyButton'>
                Verify
              </button>
            </div>
          </form>
          <form id='resendForm' className='fx max' onSubmit={regenCode}>
            {wait ? (
              <button
                type='button'
                className='button resendButton codeButton'
                disabled
                style={{ cursor: 'not-allowed', background: '#A0A0A0' }}
              >
                {timeLeft}
              </button>
            ) : (
              <button type='submit' className='button codeButton resendButton'>
                Resend
              </button>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
