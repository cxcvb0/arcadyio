import useSWR from 'swr'

import Head from 'next/head'
import Router from 'next/router'

import { useState } from 'react'

import MenuPanel from '../components/MenuPanel.jsx'
import Loading from '../components/Loading.jsx'
import Error from '../components/Error.jsx'
import routesHandler from '../scripts/routesHandler'

import '../styles/play.css'

const fetcha = async (path) => {
  const res = await fetch(path)
  return await res.json()
}

export default function Play() {
  const { data, error } = useSWR('api/get/me', fetcha)

  const [playHover, setPlayHover] = useState(false)
  const [lobbiesHover, setLobbiesHover] = useState(false)
  const [tournamentHover, setTournamentHover] = useState(false)
  const [gamemodesMenuHidden, showGamemodesMenu] = useState(false)

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

  const playClasses = playHover
    ? 'button playPlayButton playButton fx2 playHover rainbowGradient'
    : 'button playPlayButton playButton fx2'

  const lobbiesClasses = lobbiesHover
    ? 'button lobbiesPlayButton playButton fx2 lobbiesHover rainbowGradient'
    : 'button lobbiesPlayButton playButton fx2'

  const tournamentClasses = tournamentHover
    ? 'button tournamentPlayButton playButton fx2 tournamentHover rainbowGradient'
    : 'button tournamentPlayButton playButton fx2'

  const gamemodesMenuClasses = gamemodesMenuHidden ? 'fx7 gmMenuShown' : 'fx7 gmMenuHidden'
  const gamemodesTxtBoxClasses = gamemodesMenuHidden ? 'playButtonTxtBox fx' : 'invisible fx'
  const newLabelClasses = gamemodesMenuHidden ? 'newLabel' : 'invisible'

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
      <div id='containerOne' className='fx2 section2'>
        <div
          id='leftSideContainer'
          className={gamemodesMenuClasses}
          onMouseEnter={() => showGamemodesMenu(true)}
          onMouseLeave={() => showGamemodesMenu(false)}
        >
          <div id='gameModesSelection' className='fx4'>
            <div id='playBox' className='playBoxes'>
              <button
                className={playClasses}
                onMouseEnter={() => setPlayHover(true)}
                onMouseLeave={() => setPlayHover(false)}
              >
                <div className='playButtonImgBox fx'>
                  <img
                    className='playButtonImage'
                    src='/icons/ball.png'
                    alt='Play'
                    title='Play'
                    width='64px'
                    height='64px'
                  ></img>{' '}
                </div>
                <div className={gamemodesTxtBoxClasses}>
                  <p>PLAY</p>
                </div>
              </button>
            </div>
            <div id='lobbiesBox' className='playBoxes'>
              <button
                className={lobbiesClasses}
                onMouseEnter={() => setLobbiesHover(true)}
                onMouseLeave={() => setLobbiesHover(false)}
              >
                <div className='playButtonImgBox fx'>
                  <img
                    className='playButtonImage'
                    src='/icons/lobbies.png'
                    alt='Lobbies'
                    title='Lobbies'
                    width='64px'
                    height='64px'
                  ></img>
                </div>
                <div className={gamemodesTxtBoxClasses}>
                  <p>LOBBIES</p>
                </div>
              </button>
            </div>
            <div id='tournamentBox' className='playBoxes'>
              <button
                className={tournamentClasses}
                onMouseEnter={() => setTournamentHover(true)}
                onMouseLeave={() => setTournamentHover(false)}
              >
                <div className='playButtonImgBox fx'>
                  <img
                    className='playButtonImage'
                    src='/icons/play_tournament.png'
                    alt='Tournament'
                    title='Tournament'
                    width='64px'
                    height='64px'
                  ></img>{' '}
                </div>
                <div className={gamemodesTxtBoxClasses}>
                  <p>TOURNAMENT</p>
                </div>
              </button>
            </div>
            <div id='playgroundBox' className='playBoxes'>
              <div className={newLabelClasses}>
                <span>🔥 NEW</span>
              </div>
              <button className='button playgroundPlayButton playButton fx2'>
                <div className='playButtonImgBox fx'>
                  <img
                    className='playButtonImage'
                    src='/icons/football_field.png'
                    alt='Playground'
                    title='Playground'
                    width='64px'
                    height='64px'
                  ></img>
                </div>
                <div className={gamemodesTxtBoxClasses}>
                  <p>PLAYGROUND</p>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className='lobby'></div>
      </div>
    </div>
  )
}
