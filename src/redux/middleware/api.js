import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'

// Extracts the next page URL from Github API response.
function getNextPageUrl(response) {
  const link = response.headers.get('link')
  if (!link) {
    return null
  }

  const nextLink = link.split(',').find(str => str.indexOf('rel="next"') > -1)
  if (!nextLink) {
    return null
  }

  return nextLink.split('')[0].slice(1, -1)
}

const APIS = {
  cape: 'http://v5.api.cape.io/api/',
  github: 'https://api.github.com/',
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi({ endpoint, schema, api }) {
  const apiRoot = APIS[api] || ''
  const fullUrl = apiRoot + endpoint

  return fetch(fullUrl)
    .then( response =>
      response.json()
      .then( json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      // Make sure the response is in camelCase.
      const camelizedJson = camelizeKeys(json)
      const nextPageUrl = getNextPageUrl(response) || undefined
      // console.log(camelizedJson)
      return Object.assign({},
        normalize(camelizedJson, schema),
        { nextPageUrl }
      )
    })
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr

const userSchema = new Schema('users', {
  idAttribute: 'login',
})

const repoSchema = new Schema('repos', {
  idAttribute: 'fullName',
})

const formSchema = new Schema('forms')

repoSchema.define({
  owner: userSchema,
})

// Schemas for Github API responses.
export const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  REPO: repoSchema,
  REPO_ARRAY: arrayOf(repoSchema),
  FORM: formSchema,
  FORM_ARRAY: arrayOf(formSchema),
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types, api } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (typeof api !== 'string') {
    throw new Error('Specify a string api.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi({ endpoint, schema, api }).then(
    response => next(actionWith({
      response,
      type: successType,
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened connecting to the server.',
    }))
  )
}
