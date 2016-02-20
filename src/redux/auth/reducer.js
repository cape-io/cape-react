import { SUBMIT } from 'redux-field'
import get from 'lodash/get'
import {
  LOGIN, LOGOUT, PROVIDERS, TOKEN_SEND, TOKEN_SENT, TOKEN_VALIDATE, USER_ID,
} from './actions'

const initialState = {
  auth: null,
  authenticated: false,
  // groupId: null,
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
function setUserId(state, { error, payload }) {
  if (error) return state
  return {
    ...state,
    user: {
      ...state.user,
      userId: payload,
    },
  }
}
function setUser(state, { error, payload: { auth, data, user } }) {
  const { authenticated, tokenSending, tokenValidating } = initialState
  const email = error ?
    get(data, 'email', state.user.email) :
    get(user, 'email', state.user.email)
  return {
    ...state,
    auth,
    authenticated: error ? authenticated : true,
    tokenSending,
    tokenValid: error ? false : true,
    tokenValidating,
    user: {
      ...state.user,
      ...user,
      email,
    },
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
      return action.error ? state : {
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
