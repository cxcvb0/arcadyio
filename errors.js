const DiscordSupport = (txt) => `<a href="https://discord.com/arcadyio" id="supportHyperlink">${txt}</a>`
const defaultDS = `Please contact our ${DiscordSupport('support on Discord')}`

module.exports.signupErrors = [
  'Password must contain from 8 to 32 characters',
  'Password must contain at least one uppercase letter',
  'Password must contain at least one lowercase letter',
  'Password must contain at least one special character',
  'Password must contain at least one digit',
]

module.exports.serverErrors = {
  799: `Unknown error`,
  800: `This account is already verified`,
  801: `Invalid password was provided`,
  802: `Invalid email was provided`,
  803: `No account with this email was found`,
  804: `You cannot access your account since it's not verified`,
  805: `You cannot log out since you're not logged in`,
  806: `Passwords don't match`,
  807: `Provided email is already in use`,
  808: `Provided email is already in use on an unverified account`,
  809: `Provided verification code is invalid`,
  810: `Unexpected error. ${defaultDS}`,
  811: `Unexpected error while creating your account. ${defaultDS}`,
  812: `Unexpected error. Couldn't verify your email. ${defaultDS}`,
  813: `You cannot login since you are already logged in`,
  814: `You cannot signup since you are already logged in`,
  815: `Your account has already been verified`,
  816: `You are not logged in`,
  817: `Unexpected error. ${defaultDS}`,
  818: `You shall not pass. Your account is not verified`,
  819: `You shall not pass. Your account is not verified`,
  820: `You've sent too many code verification requests. Try again later`,
  821: `Provided code is invalid`,
  822: `No email `,
  823: `No account with this email was found`,
  824: `Unverified request`,
  825: `Unexpected error. Try refreshing`,
  989: ``,
}

/*

! 800: Verified user trying to get to /code/verify
! 801: Invalid login/signup password attempt
! 802: Invalid login/signup email attempt
! 803: Login with nonexisting email
! 804: Unverified account login attemp
! 805: # Not logged user sent a post logout request
! 806: # Sign up attempt with different passwords
! 807: Account creation on one email twice attempt 
! 808: Same as above but the first account is unverified
! 809: Verification code a user provided does not match with one in the db

! 810: * Not verified, not unverified user
! 811: * Couldn't set the verification code in the db
! 812: Verification email not delivered
! 813: # Logged user trying to send a login post request
! 814: # Logged user trying to send a signup post request 
! 815: Verified user trying to verify their code
! 816: Not logged user trying to access verified-accounts-only page
! 817: * Not verified, not unverified
! 818: Verified user trying to access nonverified-accounts-only page
! 819: * Code regeneration attempt, no session email was found
! 820: * Keeps requesting for verification codes

# - fishy request
* - serious problem

*/
