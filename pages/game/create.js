import useSWR from 'swr'

import Head from 'next/head'
import Router from 'next/router'

import { useState } from 'react'

import MenuPanel from '../../components/MenuPanel.jsx'
import Loading from '../../components/Loading.jsx'
import Error from '../../components/Error.jsx'
import routesHandler from '../../scripts/routesHandler'

import '../../styles/gamecreate.css'

const fetcha = async (path) => {
  const res = await fetch(path)
  return await res.json()
}

const eventToHTML = (gamemodes) => {
  const defaults = gamemodes.filter((x) => !x.event)
  const events = gamemodes.filter((x) => x.event)

  const defaultGamemodes = defaults.map((gamemode) => {
    return (
      <div className='actualGamemode'>
        <button></button>
      </div>
    )
  })

  const eventGamemodes = events.forEach((event) => {
    return (
      <div className='actualGamemode'>
        <button></button>
      </div>
    )
  })

  return [defaultGamemodes, eventGamemodes]
}

export default function GameCreate() {
  const { data, error } = useSWR('../api/get/me', fetcha)
  const gamemodes = useSWR('../api/gamemodes', fetcha)

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

  const shouldRedirect = routesHandler('create', data)

  if (!shouldRedirect) return <Loading />

  const [defaultGamemodes, eventGamemodes] = gamemodes.data
    ? gamemodes.data.gamemodes.map(eventToHTML)
    : [<Loading />, <Loading />]

  return (
    <div id='create' onClick={handleBodyClick}>
      <Head>
        <title>Create a game</title>
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
            <span className='gamemodeTypeText'>DEFAULT GAMEMODES</span>
          </div>
          <div id='defaultGMBot'>{defaultGamemodes}</div>
        </div>
        <div id='gamemodesSeparation' className='fx5'>
          <div id='allpageLongBar1'></div>
          <span>or</span>
          <div id='allpageLongBar2'></div>
        </div>
        <div id='eventsGamemodes'>
          <div id='eventGMTop' className='fx'>
            <span className='gamemodeTypeText'>EVENTS</span>
          </div>
          <div id='eventGMBot'>{eventGamemodes}</div>
        </div>
      </div>
    </div>
  )
}
