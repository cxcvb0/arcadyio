import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer.jsx'
import Wave from '../components/Wave.jsx'

import '../styles/index.css'

export default function Home() {
  return (
    <div id='home'>
      <Head>
        <title>ArcadyIO</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div id='containerOne' className='fx section'>
        <Link href='/join'>
          <a className='play brdButton'>Play now</a>
        </Link>
      </div>
      <Wave />
      <div id='containerTwo' className='fx section'>
        <div id='twoA' className='featureSection'>
          <div className='sideContent fx' id='gmVanish'>
            <div className='fx featureInteractiveContainer'>
              <div className='fx2 foregroundFeatureInfo'>
                <img src='/icons/gaming.png' alt='Gaming' className='featureIcon' />
                <span className='headerSpan'>Various Gamemodes</span>
              </div>
              <div className='fx2 roundedIconsDiv'>
                <img
                  src='/icons/competitive.png'
                  alt='Competitive'
                  title='Competitive'
                  className='gamemodeIcon'
                />
                <img src='/icons/casual.png' alt='Casual' title='Casual' className='gamemodeIcon' />
                <img src='/icons/bots.png' alt='Bots' title='Bots' className='gamemodeIcon' />
                <img
                  src='/icons/tournament.png'
                  alt='Tournament'
                  title='Tournament'
                  className='gamemodeIcon'
                />
              </div>
            </div>
          </div>
          <div className='rightSideDesc sideContent fx' id='gmStretch'>
            <div className='topHelpive fx'>
              <h2 className='descHeader'>Challenge yourself</h2>
            </div>
            <div className='botHelpive fx'>
              <span className='descSpan'>
                Multiple excellent gamemodes are awaiting you. Match it to your needs and enjoy an infinite
                entertainment.
              </span>
            </div>
          </div>
        </div>
        <div id='twoB' className='featureSection'>
          <div className='rightSideDesc sideContent fx' id='marketStretch'>
            <div className='topHelpive fx'>
              <h2 className='descHeader'>Do some shopping</h2>
            </div>
            <div className='botHelpive fx'>
              <span className='descSpan'>
                Enrich your game experience by changing colors of a few pixels on your screen.
              </span>
            </div>
          </div>
          <div className='sideContent fx' id='marketVanish'>
            <div className='fx featureInteractiveContainer'>
              <div className='fx2 foregroundFeatureInfo'>
                <img src='/icons/store.png' alt='Gaming' className='featureIcon' />
                <span className='headerSpan'>Vast Market</span>
              </div>
              <div className='fx2 roundedIconsDiv'>
                <img src='/icons/variety.png' alt='Variety' className='gamemodeIcon' />
                <img src='/icons/coin.png' alt='Money' className='gamemodeIcon' />
                <img src='/icons/agreement.png' alt='Agreement' className='gamemodeIcon' />
                <img src='/icons/skins.png' alt='Skins' className='gamemodeIcon' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
