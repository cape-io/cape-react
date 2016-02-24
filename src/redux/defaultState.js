
function createNavLink(id, args = {}) {
  const { text, to, authenticated, rest } = args
  return {
    authenticated,
    id,
    text: text || id.charAt(0).toUpperCase() + id.slice(1),
    to: to || `/${id}`,
    ...rest,
  }
}
// Think about the story. Think about how to tell one example of the larger story.
export default {
  db: {
    support: {
      chat: 'https://www.hipchat.com/gv1XLjgaV',
      bugs: 'https://github.com/cape-io/cape-editor/issues',
    },
    title: 'CAPE Editor',
    description: 'Editor',
    image: 'https://pbs.twimg.com/profile_images/568082657292976128/SNZjMW8N.png',
    tagline: 'Create Anywhere Publish Everywhere',
    'login-join': {
      headerMsg: 'Login or Join',
      leadMsg: 'Enter your email to start the login process.',
      login: {
        headerMsg: 'Login',
        leadMsg: 'Select a login method',
      },
    },
    // @TODO The server needs filter based on permissions besides auth.
    navLinks: [
      createNavLink('about', { text: 'About Us' }),
      createNavLink('mixer', { authenticated: true }),
      createNavLink('login-join', { authenticated: false, text: 'Login or Join' }),
      createNavLink('logout', { authenticated: true, className: 'logout-link' }),
    ],
  },
  entity: {
    cape: {},
    form: {},
  },
}
