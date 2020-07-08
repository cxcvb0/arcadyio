import { useRouter } from 'next/router'

import useSWR from 'swr'

import Head from 'next/head'
import Router from 'next/router'

import { useState } from 'react'

import MenuPanel from '../components/MenuPanel.jsx'
import Loading from '../components/Loading.jsx'
import Error from '../components/Error.jsx'
import routesHandler from '../scripts/routesHandler'

import '../styles/lobby.css'

const fetcha = async (path) => {
  const res = await fetch(path)
  return await res.json()
}

export default function Lobby() {
  const { data, error } = useSWR('../api/get/me', fetcha)

  const [isShown, showProfileMenu] = useState(false)
  const [notificationData, setNotification] = useState(['none', ''])
  const [status, message, code] = notificationData

  let backgroundClass

  if (status == 'Success') backgroundClass = 'bg_success block'
  else if (status == 'Error') backgroundClass = 'bg_error block'
  else if (status == 'Info') backgroundClass = 'bg_info block'
  else if (status == 'Warning') backgroundClass = 'bg_warning block'
  else if (status == 'none') backgroundClass = 'invisible'

  const notificationClassList = `${backgroundClass} notification fx`

  const handleBodyClick = ({ target }) => {
    if (target.className.split(' ').includes('dontHide')) return
    showProfileMenu(false)
  }

  if (!data) return <Loading />
  if (error) return <Error error={898} content={error} />

  const shouldRedirect = routesHandler('lobby', data)

  if (!shouldRedirect) return <Loading />

  const destroyLobby = (event) => {
    event.preventDefault()

    console.log(event.target.textContent)

    fetch('/lobby/leave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then(({ error, redirect }) => {
        console.log(error, redirect)
        if (redirect) Router.push(redirect)
        if (error) setNotification([`Error`, error.message, error.code])
      })
      .catch((error) => {
        console.error('An unexpected error happened occurred:', error)
        setNotification(['Error', 'Unexpected error!'])
      })
  }

  return (
    <div id='lobby' onClick={handleBodyClick}>
      <Head>
        <title>Lobby</title>
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
      <MenuPanel session={{ ...data, isShown, showProfileMenu }} />
      <div id='containerOne' className='fx section2'>
        <div className='lobbyTop'></div>
        <div className='lobbyPanel'>
          <form onSubmit={destroyLobby}>
            <button type='submit'></button>
          </form>
        </div>
      </div>
    </div>
  )
}

Lobby.getInitialProps = ({ query }) => {
  console.log('query', query)
  return { lobby: query.lobby }
}
