// const LOAD = 'auth/LOAD'
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS'
const LOAD_FAIL = 'auth/LOAD_FAIL'
const JOIN = 'auth/LOGIN'
const JOIN_SUCCESS = 'auth/LOGIN_SUCCESS'
const JOIN_FAIL = 'auth/LOGIN_FAIL'
const LOGIN = 'auth/LOGIN'
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
const LOGIN_FAIL = 'auth/LOGIN_FAIL'
const LOGOUT = 'auth/LOGOUT'
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS'
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL'
const PROVIDERS = 'auth/PROVIDERS'
const USER_ID = 'auth/USER_ID'
import { SUBMIT } from 'redux-field'

const initialState = {
  key: null,
  email: null,
  // emailVerified: false,
  userId: undefined,
  provider: {},
}
function setEmail(state, { payload, meta }) {
  if (meta.prefix[0] === 'cape/login' && meta.prefix[1] === 'email') {
    return {
      ...state,
      email: payload,
    }
  }
  return state
}
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_ID:
      return {
        ...state,
        // emailVerified: true,
        userId: action.payload,
      }
    case PROVIDERS:
      return {
        ...state,
        provider: action.payload,
      }
    case SUBMIT:
      return setEmail(state, action)
    case LOAD_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        loaded: true,
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      }
    case JOIN:
    case LOGIN:
      return {
        ...state,
        loggingIn: true,
      }
    case JOIN_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        ...action.result,
      }
    case JOIN_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error,
      }
    case LOGOUT:
      return {
        ...state,
        loggingOut: true,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        ...initialState,
        ...action.result,
      }
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error,
      }
    default:
      return state
  }
}

export function isLoaded(globalState) {
  const { session: { me } } = globalState.entity
  return me && me.isAuthenticated !== null
}

export function isAuthenticated(globalState) {
  const { session: { me } } = globalState.entity
  return me && me.isAuthenticated === true
}

// export function load() {
//   return dispatch => {
//     dispatch(requestPosts(reddit))
//     return fetch(`http://www.reddit.com/r/${reddit}.json`)
//       .then(req => req.json())
//       .then(json => dispatch(receivePosts(reddit, json)))
//   }
// }

export function join({ displayName, email }) {
  // I want to trigger the redirect on success here.
  return {
    types: [ JOIN, JOIN_SUCCESS, JOIN_FAIL ],
    promise: (client) => client.post('/user/join', {
      data: {
        displayName,
        email,
      },
    }),
  }
}

export function login(name) {
  // I want to trigger the redirect on success here.
  return {
    types: [ LOGIN, LOGIN_SUCCESS, LOGIN_FAIL ],
    promise: (client) => client.post('/user/login', {
      data: {
        name,
      },
    }),
  }
}

export function logout() {
  return {
    types: [ LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL ],
    promise: (client) => client.get('/user/logout'),
  }
}
