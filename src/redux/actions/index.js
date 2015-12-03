import { CALL_API, Schemas } from '../middleware/api'

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchUser(login) {
  return {
    [CALL_API]: {
      types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
      api: 'api',
      endpoint: `user/email/${login}`,
      schema: Schemas.USER,
    },
  }
}

// Fetches a single login user by email from CAPE.
// Relies on Redux Thunk middleware.
export function loadUser(login) {
  return (dispatch, getState) => {
    const user = getState().entities.users[login]
    if (user) {
      return null
    }

    return dispatch(fetchUser(login))
  }
}

export const REPO_REQUEST = 'REPO_REQUEST'
export const REPO_SUCCESS = 'REPO_SUCCESS'
export const REPO_FAILURE = 'REPO_FAILURE'

// Fetches a single repository from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchRepo(fullName) {
  return {
    [CALL_API]: {
      types: [ REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE ],
      api: 'github',
      endpoint: `repos/${fullName}`,
      schema: Schemas.REPO,
    },
  }
}

// Fetches a single repository from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadRepo(fullName, requiredFields = []) {
  return (dispatch, getState) => {
    const repo = getState().entities.repos[fullName]
    if (repo && requiredFields.every(key => repo.hasOwnProperty(key))) {
      return null
    }

    return dispatch(fetchRepo(fullName))
  }
}

export const STARRED_REQUEST = 'STARRED_REQUEST'
export const STARRED_SUCCESS = 'STARRED_SUCCESS'
export const STARRED_FAILURE = 'STARRED_FAILURE'

// Fetches a page of starred repos by a particular user.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchStarred(login, nextPageUrl) {
  return {
    login,
    [CALL_API]: {
      types: [ STARRED_REQUEST, STARRED_SUCCESS, STARRED_FAILURE ],
      api: 'github',
      endpoint: nextPageUrl,
      schema: Schemas.REPO_ARRAY,
    },
  }
}

// Fetches a page of starred repos by a particular user.
// Bails out if page is cached and user didn’t specifically request next page.
// Relies on Redux Thunk middleware.
export function loadStarred(login, nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = `users/${login}/starred`,
      pageCount = 0,
    } = getState().pagination.starredByUser[login] || {}

    if (pageCount > 0 && !nextPage) {
      return null
    }

    return dispatch(fetchStarred(login, nextPageUrl))
  }
}

export const STARGAZERS_REQUEST = 'STARGAZERS_REQUEST'
export const STARGAZERS_SUCCESS = 'STARGAZERS_SUCCESS'
export const STARGAZERS_FAILURE = 'STARGAZERS_FAILURE'

// Fetches a page of stargazers for a particular repo.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchStargazers(fullName, nextPageUrl) {
  return {
    fullName,
    [CALL_API]: {
      types: [ STARGAZERS_REQUEST, STARGAZERS_SUCCESS, STARGAZERS_FAILURE ],
      api: 'github',
      endpoint: nextPageUrl,
      schema: Schemas.USER_ARRAY,
    },
  }
}

// Fetches a page of stargazers for a particular repo.
// Bails out if page is cached and user didn’t specifically request next page.
// Relies on Redux Thunk middleware.
export function loadStargazers(fullName, nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = `repos/${fullName}/stargazers`,
      pageCount = 0,
    } = getState().pagination.stargazersByRepo[fullName] || {}

    if (pageCount > 0 && !nextPage) {
      return null
    }

    return dispatch(fetchStargazers(fullName, nextPageUrl))
  }
}

export const FORM_REQUEST = 'FORM_REQUEST'
export const FORM_SUCCESS = 'FORM_SUCCESS'
export const FORM_FAILURE = 'FORM_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchForm(formId) {
  return {
    [CALL_API]: {
      types: [ FORM_REQUEST, FORM_SUCCESS, FORM_FAILURE ],
      api: 'api',
      endpoint: `content/type/${formId}`,
      schema: Schemas.FORM,
    },
  }
}

// Fetches a single form from CAPE API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadForm(formId) {
  return (dispatch, getState) => {
    const form = getState().entities.forms[formId]
    if (form) {
      return null
    }
    return dispatch(fetchForm(formId))
  }
}

export const SESS_REQUEST = 'SESS_REQUEST'
export const SESS_SUCCESS = 'SESS_SUCCESS'
export const SESS_FAILURE = 'SESS_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export function fetchSession() {
  return {
    [CALL_API]: {
      types: [ SESS_REQUEST, SESS_SUCCESS, SESS_FAILURE ],
      api: 'api',
      endpoint: 'user/me',
      schema: Schemas.SESSION,
    },
  }
}

export function loadSession() {
  return (dispatch, getState) => {
    const session = getState().entities.session || {}
    // if (session) {
    //   return null
    // }
    return dispatch(fetchSession(session))
  }
}

export const CONTENT_SAVE = 'CONTENT_SAVE'
export const CONTENT_SAVED = 'CONTENT_SAVED'
export const CONTENT_SAVE_ERR = 'CONTENT_SAVE_ERR'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export function saveContent(entityInfo) {
  const { id, entityId, body } = entityInfo
  const endpoint = `content/${id}/${entityId}`
  return {
    [CALL_API]: {
      types: [ CONTENT_SAVE, CONTENT_SAVED, CONTENT_SAVE_ERR ],
      api: 'api',
      body,
      endpoint,
      entityInfo,
      method: 'put',
    },
  }
}

export const CONTENT_REQUEST = 'CONTENT_REQUEST'
export const CONTENT_SUCCESS = 'CONTENT_SUCCESS'
export const CONTENT_FAILURE = 'CONTENT_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export function loadContent(entityInfo) {
  // id is the content type id.
  const { id, entityId } = entityInfo
  const endpoint = `content/${id}/${entityId}`
  return {
    [CALL_API]: {
      types: [ CONTENT_REQUEST, CONTENT_SUCCESS, CONTENT_FAILURE ],
      api: 'api',
      endpoint,
      entityInfo,
    },
  }
}

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE,
  }
}
