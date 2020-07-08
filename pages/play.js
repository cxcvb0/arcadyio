import useSWR from 'swr'

import Head from 'next/head'
import Router from 'next/router'

import { useState } from 'react'

import MenuPanel from '../components/MenuPanel.jsx'
import Loading from '../components/Loading.jsx'
import Error from '../components/Error.jsx'
import routesHandler from '../scripts/routesHandler'
import { gamemodes } from '../src/gamemodes'

import '../styles/play.css'

const fetcha = async (path) => {
  const res = await fetch(path)
  return await res.json()
}

export default function Play() {
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

  const shouldRedirect = routesHandler('play', data)

  if (!shouldRedirect) return <Loading />

  const handleGamemodeSelection = (event) => {
    event.preventDefault()

    console.log(event.target)
    console.log(event.target.textContent)

    fetch('/lobby/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gamemode: event.target.textContent }),
    })
      .then((response) => response.json())
      .then(({ success, error, redirect }) => {
        console.log(success, error, redirect)
        if (redirect) Router.push(redirect)
        if (success) setNotification(['Success', `Your account has been created!`])
        if (error) setNotification([`Error`, error.message, error.code])
      })
      .catch((error) => {
        console.error('An unexpected error happened occurred:', error)
        setNotification(['Error', 'Unexpected error!'])
      })
  }

  const eventToHTML = (gamemodes) => {
    const defaults = gamemodes.filter((x) => !x.event && !x.disabled)
    const events = gamemodes.filter((x) => x.event && !x.disabled)

    const defaultGamemodes =
      defaults.length > 0 ? (
        defaults.map((gamemode, index) => {
          return (
            <form className='actualGamemode' key={index} onSubmit={handleGamemodeSelection}>
              <button className='button' type='submit'>
                <img
                  src={gamemode.icon}
                  alt={gamemode.name}
                  className='gamemodeImage'
                  width='200px'
                  height='200px'
                />
                <span>{gamemode.name}</span>
              </button>
            </form>
          )
        })
      ) : (
        <span className='noEventsAvailable'>No gamemodes available... :(</span>
      )

    const eventGamemodes =
      events.length > 0 ? (
        events.map((event, index) => {
          return (
            <form className='actualGamemode' key={index} onSubmit={handleGamemodeSelection}>
              <button className='button' type='submit'>
                <img
                  src={event.icon}
                  alt={event.name}
                  className='gamemodeImage'
                  width='200px'
                  height='200px'
                />
                <span className='tournamentSpan'>{event.name}</span>
              </button>
            </form>
          )
        })
      ) : (
        <span className='noEventsAvailable'>No events available... :(</span>
      )

    return [defaultGamemodes, eventGamemodes]
  }

  const [defaultGamemodes, eventGamemodes] = eventToHTML(gamemodes)

  return (
    <div id='play' onClick={handleBodyClick}>
      <Head>
        <title>Play</title>
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
        <div id='defaultGamemodes'>
          <div id='defaultGMTop' className='fx'>
            <span className='gamemodeTypeText'>DEFAULT</span>
          </div>
          <div id='defaultGMBot' className='fx2'>
            <div className='jamnikDiv fx5'>{defaultGamemodes}</div>
          </div>
        </div>
        <div id='gamemodesSeparation' className='fx5'>
          <div id='allpageLongBar'></div>
          <div id='allpageLongBar1'></div>
          <span>or</span>
          <div id='allpageLongBar2'></div>
        </div>
        <div id='eventsGamemodes'>
          <div id='eventGMTop' className='fx'>
            <span className='gamemodeTypeText'>OTHER</span>
          </div>
          <div id='eventGMBot' className='fx2'>
            <div className='jamnikDiv fx5'>{eventGamemodes}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
