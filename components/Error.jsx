import { serverErrors } from '../errors'

import '../styles/error.css'

export default function Error({ error, content }) {
  console.log('error.jsx', 'error', error, content)
  return (
    <div id='error'>
      <div id='containerOne' className='fx section'>
        <div className='errorBox fx'>
          <div className='errorTopBox fx4'>
            <h1>Error {error}</h1>
            <span>{error == 989 ? content : serverErrors[error]}</span>
          </div>
          <div className='errorBotBox fx'>
            <div className='errorRedirects fx6'>
              <form action='/play' method='post' className='backForm fx'>
                <button className='button' type='submit'>
                  Play
                </button>
              </form>
              <form action='/' method='post' className='backForm fx'>
                <button className='button' type='submit'>
                  Home
                </button>
              </form>
              <form action='/back' method='post' className='backForm fx'>
                <button className='button' type='submit'>
                  Go Back
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
