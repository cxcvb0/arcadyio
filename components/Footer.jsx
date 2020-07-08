export default function Footer() {
  return (
    <div id='footer' className='fx'>
      <div id='footerHelpive'>
        <div id='footerLinks' className='fx2'>
          <div id='footerLegal' className='footerContentContainer'>
            <div className='footerTopHelpive'>
              <span className='footerHeader'>Legal</span>
            </div>
            <div className='footerBotHelpive'>
              <a href='#'>Terms of Service</a>
              <a href='#'>Privacy Policy</a>
              <a href='#'>Cookie Policy</a>
              <a href='#'>GDPR</a>
              <a href='#'>CCPA</a>
            </div>
          </div>
          <div id='footerResources' className='footerContentContainer'>
            <div className='footerTopHelpive'>
              <span className='footerHeader'>Resources</span>
            </div>
            <div className='footerBotHelpive'>
              <a href='#'>FAQ</a>
              <a href='#'>Server Status</a>
              <a href='#'>Referral Program</a>
              <a href='#'>API</a>
              <a href='#'>Report a bug</a>
            </div>
          </div>
          <div id='footerCompany' className='footerContentContainer'>
            <div className='footerTopHelpive'>
              <span className='footerHeader'>Company</span>
            </div>
            <div className='footerBotHelpive'>
              <a href='#'>About us</a>
              <a href='#'>Partnership</a>
              <a href='#'>Assets</a>
              <a href='#'>Contact</a>
            </div>
          </div>
        </div>
      </div>
      <div id='copyrightText' className='fx'>
        <span>© 2020 PiP Company</span>
      </div>
      <style jsx>{`
        #footer {
          width: 100%;
          height: 260px;
          background: #111;
          font-family: 'Sen', Helvetica, Arial, sans-serif;
          color: white;
          justify-content: space-between;
        }

        #copyrightText {
          width: 100%;
          height: 20%;
        }

        #footerHelpive {
          width: 100%;
          height: 80%;
          display: flex;
          justify-content: flex-end;
          flex-direction: column;
        }

        #footerLinks {
          width: 100%;
          height: 80%;
          justify-content: space-evenly;
        }

        .footerHeader {
          font-size: 27px;
        }

        .footerContentContainer {
          width: 150px;
          height: 100%;
        }

        .footerTopHelpive {
          width: 100%;
          height: 30px;
        }

        .footerBotHelpive > a {
          display: block;
          color: rgb(165, 165, 165);
          margin: 2px 0;
        }

        .footerBotHelpive > a:hover {
          color: rgb(150, 109, 109);
        }

        .footerBotHelpive {
          width: 100%;
          height: calc(100% - 30px);
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
      `}</style>
    </div>
  )
}
