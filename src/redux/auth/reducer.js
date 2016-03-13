import {
  LOGIN, LOGOUT, PROVIDERS, TOKEN_SEND, TOKEN_SENT, TOKEN_VALIDATE, USER_ID,
} from './actions'

const initialState = {
  auth: null,
  authenticated: false,
  // groupId: null,
  // emailVerified: false,
  // key: null,
  sid: null,
  tokenSent: false,
  tokenSending: false,
  tokenValid: null,
  tokenValidating: false,
  user: {
  },
}
function setUserId(state, { error, payload }) {
  if (error) return state
  return {
    ...state,
    user: {
      ...state.user,
      id: payload,
    },
  }
}
function setUser(state, { error, payload }) {
  const { authenticated, tokenSending, tokenValidating } = initialState
  return {
    ...state,
    // auth,
    authenticated: error ? authenticated : true,
    tokenSending,
    tokenValid: !error,
    tokenValidating,
    user: {
      id: payload.id,
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
