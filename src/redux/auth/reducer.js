import { SUBMIT } from 'redux-field'
import {
  LOGIN, LOGOUT, PROVIDERS, TOKEN_SEND, TOKEN_SENT, TOKEN_VALIDATE, USER_ID,
} from './actions'

const initialState = {
  authenticated: false,
  // emailVerified: false,
  // key: null,
  tokenSent: false,
  tokenSending: false,
  tokenValid: null,
  tokenValidating: false,
  user: {
    email: null,
    provider: {
      email: true,
    },
    userId: undefined,
  },
}
function setEmail({ user, ...state }, { payload, meta }) {
  if (meta.prefix[0] === 'cape/login' && meta.prefix[1] === 'email') {
    return {
      ...state,
      user: {
        ...user,
        email: payload,
      },
    }
  }
  return state
}
function setUserId({ user, ...state }, { payload }) {
  return {
    ...state,
    user: {
      ...user,
      userId: payload,
    },
  }
}
function setUser(state, { payload, error }) {
  const { authenticated, tokenSending, tokenValidating } = initialState
  return {
    ...state,
    authenticated: error ? authenticated : true,
    tokenSending,
    tokenValid: error ? false : true,
    tokenValidating,
    user: payload,
  }
}
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return setUser(state, action)
    case LOGOUT:
      return initialState
    case PROVIDERS:
      return {
        ...state,
        provider: action.payload,
      }
    case SUBMIT:
      return setEmail(state, action)
    case TOKEN_SEND:
      return {
        ...state,
        tokenSent: false,
        tokenSending: action.payload,
      }
    case TOKEN_SENT:
      return {
        ...state,
        tokenSending: false,
        tokenSent: action.payload,
      }
    case TOKEN_VALIDATE:
      return {
        ...state,
        tokenValidating: true,
      }
    case USER_ID:
      return setUserId(state, action)
    default:
      return state
  }
}
