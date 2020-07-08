import Router from 'next/router'

const usersOnly = ['play', 'create', 'lobby']

const shouldRedirect = (path) => {
  Router.push(path)
  return false
}

export default (page, { success, verified, loggedIn }) => {
  if (verified == false && page != 'home') return shouldRedirect('/code/verify')
  if (!verified && page != 'join') return shouldRedirect('/join')
  if (verified == true && loggedIn == true && page == 'join') return shouldRedirect('/play')
  if (usersOnly.includes(page) && (loggedIn == false || verified == false)) return shouldRedirect('/join')
  return true
}
