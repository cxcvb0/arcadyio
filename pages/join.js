import useSWR from 'swr'
import Head from 'next/head'
import Router from 'next/router'

import { useState, useEffect } from 'react'

import routesHandler from '../scripts/routesHandler'

import Loading from '../components/Loading.jsx'
import Error from '../components/Error.jsx'
import Footer from '../components/Footer.jsx'

import { signupErrors as errorsList } from '../errors'

const fetcha = async (path) => {
  const res = await fetch(path)
  return await res.json()
}

export default function Join() {
  const { data, error } = useSWR('api/get/me', fetcha)

  const [logIn, switchLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [rPassword, setPassword] = useState('')
  const [rPassword2, setPassword2] = useState('')
  const [passCorrect, setPassCorrect] = useState(false)
  const [pass2Correct, setPass2Correct] = useState(false)
  const [rErrors, addErrors] = useState([])
  const [emailCorrect, setEmailCorrect] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [showLPassword, setShowLPassword] = useState(false)
  const [notificationData, setNotification] = useState(['none', ''])

  const [status, message, code] = notificationData

  let backgroundClass

  console.log('status', status)

  if (status == 'Success') backgroundClass = 'bg_success block'
  else if (status == 'Error') backgroundClass = 'bg_error block'
  else if (status == 'Info') backgroundClass = 'bg_info block'
  else if (status == 'Warning') backgroundClass = 'bg_warning block'
  else if (status == 'none') backgroundClass = 'invisible'

  const notificationClassList = `${backgroundClass} notification fx`

  const handleSignup = (event) => {
    event.preventDefault()

    const body = {
      email,
      password: [rPassword, rPassword2],
    }

    fetch('/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then(({ error, redirect }) => {
        if (redirect) Router.push(redirect)
        if (error) setNotification([`Error`, error.message, error.code])
      })
      .catch((error) => {
        console.error('An unexpected error happened occurred:', error)
        setNotification(['Error', 'Unexpected error!'])
      })
  }

  const handleLogin = (event) => {
    event.preventDefault()

    const body = {
      email: loginEmail,
      password: loginPassword,
    }

    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => {
        const { error, redirect } = response
        if (redirect) Router.push('/play')
        if (error) setNotification([`Error`, error.message, error.code])
      })
      .catch((error) => {
        console.error('An unexpected error happened occurred:', error)
        setNotification(['Error', 'Unexpected error!'])
      })
  }

  const handleChange = ({ target: { value } }, change) => {
    if (change == 0) setEmail(value)
    else if (change == 1) setPassword(value)
    else if (change == 2) setPassword2(value)
    else if (change == 3) setLoginEmail(value)
    else if (change == 4) setLoginPassword(value)
  }

  const onEmailChange = (email) => {
      if (email.length == 0 || email.indexOf('@') <= 0 || email.indexOf('.') <= 0 || email.endsWith('.'))
        setEmailCorrect(false)
      else setEmailCorrect(true)
    },
    onPasswordChange = (password) => {
      const [good, errors] = passwordValidator(password)
      if (good) setPassCorrect(true)
      else setPassCorrect(false)
      addErrors(errors)
    },
    onPassword2Change = (password) => {
      const good = password2Validator(password)
      if (good) setPass2Correct(true)
      else setPass2Correct(false)
    },
    passwordValidator = (password) => {
      const errors = []
      if (password.length < 8 || password.length > 32) errors.push(errorsList[0])
      if (!password || password.toLowerCase() == password) errors.push(errorsList[1])
      if (!password || password.toUpperCase() == password) errors.push(errorsList[2])
      if (!password || /^[a-zA-Z\d\-_.,\s]+$/.test(password) == true) errors.push(errorsList[3])
      if (!password || /[0-9]/g.test(password) == false) errors.push(errorsList[4])
      return [errors.length == 0, errors]
    },
    password2Validator = (password) => {
      if (password && password === rPassword) return true
      return false
    },
    errs = rErrors.map((err, index) => (
      <span className='errTxt' key={index + 1}>
        • {err}
      </span>
    ))

  useEffect(() => onEmailChange(email), [email])
  useEffect(() => onPassword2Change(rPassword2), [rPassword2])
  useEffect(() => onPasswordChange(rPassword), [rPassword])

  const mailBorder = emailCorrect ? '2px solid green' : '2px solid red',
    passBorder = passCorrect ? '2px solid green' : '2px solid red',
    pass2Border = pass2Correct ? '2px solid green' : '2px solid red'

  if (!data) return <Loading />
  if (error) return <Error error={898} content={error} />

  const shouldRedirect = routesHandler('join', data)

  if (!shouldRedirect) return <Loading />

  return (
    <div id='join'>
      <Head>
        <title>Join</title>
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
        <div id='errorsList' className={passCorrect || logIn == true ? 'invisible' : 'fx'}>
          <span className='errTxt' key={0}></span>
          {errs}
        </div>
        {logIn ? (
          <div id='logIn' className='fx'>
            <form className='fx joinForm' onSubmit={handleLogin}>
              <input
                type='email'
                name='loginEmail'
                id='loginEmail'
                placeholder='Email'
                onChange={(e) => handleChange(e, 3)}
                value={loginEmail}
              />
              <div className='passwordDiv fx'>
                <input
                  type={showLPassword ? 'text' : 'password'}
                  name='logPassword'
                  id='logPassword'
                  placeholder='Password'
                  onChange={(e) => handleChange(e, 4)}
                  value={loginPassword}
                />
                <button
                  className='passCheckButton'
                  type='button'
                  onClick={() => setShowLPassword(!showLPassword)}
                >
                  👁️
                </button>
              </div>
              <div className='joinChoice fx3'>
                <button type='submit' className='button joinButton'>
                  Log In
                </button>
                <button className='button joinButton' onClick={() => switchLogin(!logIn)} type='button'>
                  ↩ Sign Up ↩
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div id='signUp' className='fx'>
            <form className='fx joinForm' autoComplete='off' onSubmit={handleSignup}>
              <input
                type='email'
                name='signupEmail'
                id='signupEmail'
                placeholder='Email'
                onChange={(e) => handleChange(e, 0)}
                style={{ border: mailBorder }}
                value={email || ''}
              />

              <div className='passwordDiv fx'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='rPassword'
                  placeholder='Password'
                  onChange={(e) => handleChange(e, 1)}
                  style={{ border: passBorder }}
                  value={rPassword || ''}
                />

                <button
                  className='passCheckButton'
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  👁️
                </button>
              </div>

              <div className='passwordDiv fx'>
                <input
                  type={showPassword2 ? 'text' : 'password'}
                  name='password'
                  id='rPassword2'
                  placeholder='Confirm Password'
                  onChange={(e) => handleChange(e, 2)}
                  style={{ border: pass2Border }}
                  value={rPassword2 || ''}
                />
                <button
                  className='passCheckButton'
                  type='button'
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  👁️
                </button>
              </div>

              <div className='joinChoice fx3'>
                {emailCorrect && passCorrect && pass2Correct ? (
                  <button type='submit' className='button joinButton'>
                    Sign Up
                  </button>
                ) : (
                  <button
                    type='button'
                    disabled
                    className='button joinButton'
                    style={{ background: '#808080', cursor: 'not-allowed' }}
                  >
                    Sign Up
                  </button>
                )}
                <button className='button joinButton' onClick={() => switchLogin(!logIn)} type='button'>
                  ↩ Log in ↩
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <Footer />
      <style jsx>{`
        #errorsList {
          width: 500px;
          height: 160px;
          text-align: center;
          position: absolute;
          top: calc((50vh - 250px) / 2);
        }

        .joinForm {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          flex-direction: column;
        }

        #signUp {
          width: 500px;
          height: 230px;
        }

        #logIn {
          width: 500px;
          height: 180px;
        }

        input[type='text'],
        input[type='email'],
        input[type='password'] {
          width: calc(100% - 4px);
          height: 40px;
          font-family: 'Sen', Helvetica, Arial, sans-serif;
          font-size: 24px;
          text-indent: 6px;
          padding: 0;
          border: none;
          border-radius: 6px;
          margin: 4px 0;
          background: white;
        }

        .joinButton {
          width: calc(49% - 2px);
          height: 40px;
          background: rgb(253, 74, 74);
          font-family: 'Sen', Helvetica, Arial, sans-serif;
          font-size: 28px;
          color: white;

          transition: background 0.1s ease-in-out;
        }

        .joinButton:hover {
          background: rgb(230, 82, 82);
          color: rgb(197, 197, 197);
        }

        .joinChoice {
          margin: 6px 0;
          width: 100%;
          height: 40px;
          justify-content: space-between;
        }

        form {
          width: 100%;
          height: 100%;
        }

        .passwordDiv {
          position: relative;
          width: 100%;
        }

        .passCheckButton {
          position: absolute;
          right: 2px;
          cursor: pointer;
          padding: 11.5px;
          background: transparent;
          border: none;
          border-radius: 6px;
        }

        .passCheckButton:hover {
          background: #bebebe;
        }
      `}</style>
    </div>
  )
}
