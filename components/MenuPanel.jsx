import Link from 'next/link'
import '../styles/menupanel.css'

export default function MenuPanel({ session }) {
  console.log('MenuPanel', session.email, session.id, session.username, session.points, session.avatar)

  console.log('isShown', session.isShown)

  const profileMenu = session.isShown ? (
    <div className='profileMenu fx'>
      <Link href='/profile/me'>
        <a className='profileMenuLink'>{session.username}</a>
      </Link>
      <Link href='/profile/me'>
        <a className='profileMenuLink'>Referral Program</a>
      </Link>
      <Link href='/referral'>
        <a className='red profileMenuLink'>Logout</a>
      </Link>
    </div>
  ) : null

  return (
    <div className='menuPanel fx2'>
      <div className='menuRedirects fx5'>
        <Link href='/play'>
          <a className='menuHyperlink'>PLAY</a>
        </Link>

        <Link href='/profile/me'>
          <a className='menuHyperlink'>PROFILE</a>
        </Link>

        <Link href='/profile/me/inventory'>
          <a className='menuHyperlink'>INVENTORY</a>
        </Link>

        <Link href='/store'>
          <a className='menuHyperlink'>STORE</a>
        </Link>
      </div>
      <div className='pointsCount fx2'>
        <p>{session.points} 🧊</p>
      </div>
      <button
        className='profileContainer fx dontHide'
        onClick={() => session.showProfileMenu(!session.isShown)}
      >
        <img
          src='/api/random/defavatar'
          alt='avatar'
          className='avatarImage dontHide'
          width='32px'
          height='32px'
        />
      </button>
      {profileMenu}
    </div>
  )
}

/*



<div className='pCTLogout fx'>
  <Link href='/auth/logout'>
    <a className='PCLogoutLink'>Logout</a>
  </Link>
</div>

*/
