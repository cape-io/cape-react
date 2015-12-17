const LOAD = 'mixer/LOAD'
const LOAD_FAIL = 'mixer/LOAD_FAIL'
const UPDATE = 'mixer/UPDATE'

const initialState = {
  loading: false,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      }
    case UPDATE:
      let groupState = state[action.meta.groupId] || {}
      groupState = {
        ...groupState,
        [action.meta.typeId]: action.payload || action.result,
      }
      return {
        ...state,
        [action.meta.groupId]: groupState,
      }
    default:
      return state
  }
}

function handleUpdateMe({ data, groupId, typeId }) {
  return {
    type: UPDATE,
    payload: data,
    meta: { groupId, typeId },
  }
}

export function updateMe(groupId, typeId, data) {
  return (dispatch, getState) => {
    // Dispatch route update?
    // dispatch({type: SEND_TOKEN})
    const record = {
      ...data,
      userId: getState().auth.user.name,
    }
    // Run async call.
    const options = {
      method: 'put',
      body: JSON.stringify(record),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
    function handleResponse(resp) {
      return dispatch(handleUpdateMe({ record, groupId, typeId, resp }))
    }
    fetch(`/content/${groupId}/${typeId}`, options)
      .then((response) => response.json())
      .then(handleResponse)
      .catch(handleResponse)
  }
}

export function formInfo({ auth: { user }, mixer, router: { params } }) {
  // Pull group and type from router params.
  const { groupId, typeId } = params
  // Check to see if we have data for this form already.
  return {
    loaded: mixer && mixer[groupId] && mixer[groupId][typeId],
    groupId,
    typeId,
    userId: user.name,
  }
}

export function load({ groupId, typeId, userId }) {
  const url = `/content/me/${groupId}/${typeId}/${userId}`
  return {
    types: [ LOAD, UPDATE, LOAD_FAIL ],
    promise: (client) => client.get(url),
    meta: { groupId, typeId },
  }
}
