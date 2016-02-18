import { SUBMIT } from 'redux-field'
import {
  ERROR, LOGIN, PROVIDERS, TOKEN_SEND, TOKEN_SENT, TOKEN_VALIDATE, USER_ID,
} from './actions'

const initialState = {
  authenticated: false,
  email: null,
  errorMsg: null,
  // emailVerified: false,
  key: null,
  userId: undefined,
  provider: {
    email: true,
  },
  tokenSent: false,
  tokenSending: false,
  tokenValidating: false,
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
    case ERROR:
      return {
        ...state,
        errorMsg: action.payload,
      }
    case LOGIN:
      return {
        ...state,
        errorMsg: null,
        tokenSending: false,
        tokenValidating: false,
      }
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
        errorMsg: null,
        tokenSending: false,
        tokenSent: action.payload,
      }
    case TOKEN_VALIDATE:
      return {
        ...state,
        tokenValidating: true,
      }
    case USER_ID:
      return {
        ...state,
        // emailVerified: true,
        userId: action.payload,
      }
    default:
      return state
  }
}
