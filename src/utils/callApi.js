import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import forEach from 'lodash/collection/forEach'
import merge from 'lodash/object/merge'
import omit from 'lodash/object/omit'
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
  api: '/api/',
  cape: 'https://api6.cape.io/api/',
  github: 'https://api.github.com/',
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export function callApi({ endpoint, schema, api, method, body, entityInfo }) {
  const apiRoot = APIS[api] || ''
  const fullUrl = apiRoot + endpoint

  return fetch(fullUrl, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': body ? 'application/json' : undefined,
    },
    credentials: 'same-origin',
    method: method || 'get',
    body: body ? JSON.stringify(body) : undefined,
  })
  .then( response =>
    response.json()
    .then( json => ({ json, response }))
  )
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json)
    }
    if (schema) {
      // Make sure the response is in camelCase.
      const camelizedJson = camelizeKeys(json)
      const nextPageUrl = getNextPageUrl(response) || undefined
      // console.log(camelizedJson)
      const urlIndex = camelizedJson.urls && camelizedJson.urls.length ? {} : undefined
      if (camelizedJson.id && urlIndex) {
        forEach(camelizedJson.urls, (url) => {
          urlIndex[url] = camelizedJson.id
        })
      }
      return Object.assign({},
        normalize(camelizedJson, schema),
        { nextPageUrl, urlIndex }
      )
    } else if (entityInfo) {
      const { id, entityId } = entityInfo
      const entities = json._refs || {}
      if (!entities[id]) {
        entities[id] = {}
      }
      entities[id][entityId] = omit(json, '_refs')
      return {
        entities,
      }
    } else {
      return json
    }
  })
}
