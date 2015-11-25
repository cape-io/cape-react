const LOAD = 'auth/auth/LOAD'
const LOAD_SUCCESS = 'auth/auth/LOAD_SUCCESS'
const LOAD_FAIL = 'auth/auth/LOAD_FAIL'
const JOIN = 'auth/auth/LOGIN'
const JOIN_SUCCESS = 'auth/auth/LOGIN_SUCCESS'
const JOIN_FAIL = 'auth/auth/LOGIN_FAIL'
const LOGIN = 'auth/auth/LOGIN'
const LOGIN_SUCCESS = 'auth/auth/LOGIN_SUCCESS'
const LOGIN_FAIL = 'auth/auth/LOGIN_FAIL'
const LOGOUT = 'auth/auth/LOGOUT'
const LOGOUT_SUCCESS = 'auth/auth/LOGOUT_SUCCESS'
const LOGOUT_FAIL = 'auth/auth/LOGOUT_FAIL'

const initialState = {
  isAuthenticated: false,
  loaded: false,
  loading: false,
  loggingIn: false,
  providerId: false,
  status: 0,
  user: {
    userId: null, // NOTE: Can be authenticated without userId.
  },
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        ...action.result,
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
  return globalState.auth && globalState.auth.loaded
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/user/me'),
  }
}
export function join({displayName, email}) {
  // I want to trigger the redirect on success here.
  return {
    types: [JOIN, JOIN_SUCCESS, JOIN_FAIL],
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
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/user/login', {
      data: {
        name: name,
      },
    }),
  }
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/user/logout'),
  }
}
